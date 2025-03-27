# frontend

template base:

```
https://code.daypilot.org/45330/next-js-weekly-calendar-open-source
```

## Instalacion

Instalar entorno virtual de node llamado [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating):

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
```

Luego, ingresar al entorno virtual presetado en el archivo .nvmrc haciendo uso del comando:

```
nvm use
```

Finalmente instalar todas las librerías con:

```
npm install
```

**Nota**: este último comando debe ejecutarse cada vez que se instala una librería nueva en el proyecto.

## Para levantar aplicación

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) con su navegador para ver el resultado.

Puede comenzar a editar la página modificando `app/page.tsx`. La página se actualiza automáticamente a medida que edita el archivo.

Este proyecto utiliza [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) para optimizar y cargar automáticamente Inter, una fuente personalizada de Google.

### Para salir del entorno virtual

Dentro de la raiz del proyecto:

```
nvm deactivate
```

### Más información

Para obtener más información sobre Next.js, consulte los siguientes recursos:

- [Documentación de Next.js](https://nextjs.org/docs): obtenga más información sobre las características y la API de Next.js.
- [Aprenda Next.js](https://nextjs.org/learn): un tutorial interactivo de Next.js.

Puede consultar el [repositorio de GitHub de Next.js](https://github.com/vercel/next.js/): ¡sus comentarios y contribuciones son bienvenidos!

### Implementar en Vercel

La forma más sencilla de implementar su aplicación Next.js es usar la [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) de los creadores de Next.js.

Consulte nuestra [documentación de implementación de Next.js](https://nextjs.org/docs/deployment) para obtener más detalles.
