# Automatización de resultados — Mundial 2026

Estos pasos hacen que los resultados se carguen solos cada vez que termina un partido, sin que vos tengas que hacer nada.

---

## PASO 1 — Conseguir la API Key de football-data.org (gratis)

1. Entrá a **https://www.football-data.org/client/register**
2. Completá el formulario con tu email (no pide tarjeta de crédito)
3. Confirmá el email que te mandan
4. Volvé a la página, hacé clic en "My Account" → copiá el **API Token** (parece: `abc123def456...`)

El plan gratuito permite 100 consultas por día, más que suficiente.

---

## PASO 2 — Instalar Supabase CLI (una sola vez)

Abrí PowerShell y ejecutá:
```
npm install -g supabase
```

Luego iniciá sesión:
```
supabase login
```
(Se abre el navegador, autorizás con tu cuenta Supabase)

---

## PASO 3 — Vincular el proyecto

Dentro de la carpeta `mundial-2026-prode`, ejecutá:
```
supabase link --project-ref ujcllccshmosalwvqpxq
```

---

## PASO 4 — Cargar las variables secretas en Supabase

Reemplazá `TU_TOKEN_AQUI` con el token del Paso 1 y `UNA_CLAVE_SECRETA` con cualquier contraseña inventada (ej: `mundial2026abc`):

```
supabase secrets set FOOTBALL_DATA_TOKEN=TU_TOKEN_AQUI
supabase secrets set CRON_SECRET=UNA_CLAVE_SECRETA
```

Anotá la clave secreta que elegiste, la vas a necesitar en el Paso 6.

---

## PASO 5 — Publicar la función en Supabase

```
supabase functions deploy sync-results --no-verify-jwt
```

Cuando termine, la función queda disponible en:
```
https://ujcllccshmosalwvqpxq.supabase.co/functions/v1/sync-results
```

---

## PASO 6 — Configurar el cron automático en cron-job.org (gratis)

1. Entrá a **https://cron-job.org** y creá una cuenta gratuita
2. Hacé clic en **"Create cronjob"**
3. Completá el formulario:
   - **Title:** Sync Mundial 2026
   - **URL:** `https://ujcllccshmosalwvqpxq.supabase.co/functions/v1/sync-results`
   - **Schedule:** Cada 10 minutos → elegí "Every 10 minutes"
   - **Request method:** POST
   - **Headers:** Agregá uno nuevo:
     - Name: `Authorization`
     - Value: `Bearer UNA_CLAVE_SECRETA` (la misma que pusiste en el Paso 4)
4. Guardá

Listo. A partir de ahora, cada 10 minutos se consulta la API y si hay partidos terminados, los resultados se guardan automáticamente. Los puntos del prode se calculan al instante para todos los participantes.

---

## ¿Cómo verificar que funciona?

Podés ir a tu proyecto Supabase → **Edge Functions** → **sync-results** → **Logs** y ver si hay actividad.

O entrá al cron-job.org y fijate el historial de ejecuciones.

---

## Notas

- Durante el Mundial (11 Jun – 19 Jul), el API se consulta cada 10 minutos.
- Fuera del Mundial podés pausar el cron en cron-job.org para no gastar las 100 consultas diarias.
- Si un partido termina en empate o con penales, se guarda el resultado del tiempo reglamentario (90 min) para el prode.
