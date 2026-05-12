# Mundial 2026 Prode - Instrucciones de instalación

## Paso 1: Crear cuenta en Supabase

1. Ir a https://supabase.com y crear cuenta gratuita
2. Crear un nuevo proyecto (elegir región: South America)
3. Guardar la contraseña del proyecto

## Paso 2: Configurar la base de datos

1. En Supabase, ir a **SQL Editor**
2. Copiar y pegar todo el contenido del archivo `supabase/schema.sql`
3. Ejecutar (botón Run)

## Paso 3: Obtener las credenciales

1. En Supabase ir a **Settings > API**
2. Copiar:
   - **Project URL** (algo como `https://xxxxx.supabase.co`)
   - **anon public key** (clave larga que empieza con `eyJ...`)

## Paso 4: Crear el archivo .env

1. En la carpeta del proyecto crear un archivo llamado `.env`
2. Pegá esto (reemplazando con tus credenciales reales):

```
VITE_SUPABASE_URL=https://TU_URL.supabase.co
VITE_SUPABASE_ANON_KEY=TU_CLAVE_ANONIMA
```

## Paso 5: Instalar dependencias y correr el proyecto

Abrir terminal en la carpeta del proyecto y ejecutar:

```bash
npm install
npm run dev
```

La app estará disponible en http://localhost:5173

## Paso 6: Subir a Vercel (hosting gratuito)

1. Crear cuenta en https://vercel.com
2. Instalar Vercel CLI: `npm i -g vercel`
3. Ejecutar: `vercel`
4. Seguir los pasos (enter en todo)
5. Agregar las variables de entorno en Vercel Dashboard > Settings > Environment Variables

## Cómo instalar en el celular

**Android (Chrome):**
1. Abrir la URL de la app en Chrome
2. Tocar los 3 puntos ⋮
3. "Añadir a pantalla de inicio"

**iPhone (Safari):**
1. Abrir la URL en Safari
2. Tocar el ícono de compartir
3. "Añadir a pantalla de inicio"

## Cómo cargar resultados

Por ahora los resultados se cargan manualmente en la tabla `match_results` de Supabase.
Próximamente: integración automática con API de resultados.
