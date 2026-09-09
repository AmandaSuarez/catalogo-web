# Catalogo de productos | Amanda Suarez

Catalogo web de cosmeticos y cuidado personal con filtros por marca, categoria y precio.

## Actualizacion automatica

El sitio se publica automaticamente en GitHub Pages mediante GitHub Actions.

1. Agrega un nuevo producto al archivo `productos.json`.
2. Guarda el archivo y verifica que mantenga formato JSON valido.
3. Ejecuta:

   ```powershell
   git add productos.json
   git commit -m "Agregar nuevos productos"
   git push origin main
   ```

4. El workflow `Publicar catalogo en GitHub Pages` se activa automaticamente al recibir el `push` en `main`.
5. GitHub Actions descarga el repositorio, prepara los archivos y publica el sitio.
6. Revisa el resultado en la pestaña **Actions** y luego abre el sitio publicado.

## Datos de cada producto

Cada objeto del catalogo incluye:

- `id`
- `nombre`
- `marca`
- `categoria`
- `precio`
- `imagen`

## Enlaces

- Sitio publicado: https://amandasuarez.github.io/catalogo-web/
- Repositorio: https://github.com/AmandaSuarez/catalogo-web
- Workflow: https://github.com/AmandaSuarez/catalogo-web/actions/workflows/deploy-pages.yml

El despliegue esta configurado en `.github/workflows/deploy-pages.yml` y se ejecuta con cada cambio enviado a la rama `main`.
