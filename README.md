# Secrets web app

## Propósito de la solución.

Aplicación mínima para practicar pipeline, despliegue y promoción entre entornos.

## Variables requeridas.

PORT
NODE_ENV
JWT_SECRET
FEATURE_X_ENABLED

## Diferencia entre configuración y secretos.

Los secretos son datos privados los cuales el público no debe tener acceso a. La configuración son datos de una naturaleza no sensible y nos podemos permitir exponerlos.

## Cómo crear el .env.

Crear un archivo en la raiz del proyecto llamado `.env` y copiar el contenido de `.env.example` a este, llenando los valores de las variables de entorno.

## Cómo ejecutar la aplicación.

`npm run dev` levanta un servidor local para probar la aplicación.

## Cómo validar que funciona.

Después de ejecutar la aplicación un mensaje de error claro aparecerá si ciertas variables de entorno no están presentes.

## Qué no debe subirse al repositorio

Los secretos contenidos en el `.env`, el build de la aplicación y los modulos instalados en `node_modules/`.
