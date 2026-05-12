-- =============================================
-- SCHEMA - Mundial 2026 Prode
-- Ejecutar en Supabase > SQL Editor
-- =============================================

-- Perfiles de usuario
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Grupos de prode
CREATE TABLE prode_groups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Miembros de grupos (máx 10 por grupo)
CREATE TABLE prode_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES prode_groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

-- Resultados reales de partidos (los carga el admin o se obtienen via API)
CREATE TABLE match_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  match_id INTEGER UNIQUE NOT NULL,
  home_code TEXT,
  away_code TEXT,
  home_goals INTEGER,
  away_goals INTEGER,
  scorers TEXT[], -- array de nombres de goleadores
  is_finished BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Predicciones de usuarios
CREATE TABLE predictions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  group_id UUID REFERENCES prode_groups(id) ON DELETE CASCADE,
  match_id INTEGER NOT NULL,
  home_goals INTEGER NOT NULL,
  away_goals INTEGER NOT NULL,
  scorer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, group_id, match_id)
);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE prode_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE prode_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;

-- Profiles: cada usuario ve y edita solo su perfil
CREATE POLICY "Profiles visibles para todos" ON profiles FOR SELECT USING (true);
CREATE POLICY "Usuario edita su propio perfil" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Usuario inserta su perfil" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Grupos: cualquier usuario autenticado puede ver y crear
CREATE POLICY "Grupos visibles" ON prode_groups FOR SELECT USING (true);
CREATE POLICY "Crear grupos" ON prode_groups FOR INSERT WITH CHECK (auth.uid() = created_by);

-- Miembros: visibles para todos, insertable por el usuario
CREATE POLICY "Miembros visibles" ON prode_members FOR SELECT USING (true);
CREATE POLICY "Unirse a grupos" ON prode_members FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Salir de grupos" ON prode_members FOR DELETE USING (auth.uid() = user_id);

-- Resultados: solo lectura para todos
CREATE POLICY "Resultados visibles" ON match_results FOR SELECT USING (true);

-- Predicciones: cada usuario ve las del grupo, inserta/actualiza las propias
CREATE POLICY "Predicciones visibles en grupo" ON predictions FOR SELECT USING (true);
CREATE POLICY "Insertar prediccion propia" ON predictions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Actualizar prediccion propia" ON predictions FOR UPDATE USING (auth.uid() = user_id);

-- =============================================
-- TRIGGER: crear perfil automáticamente al registrarse
-- =============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
