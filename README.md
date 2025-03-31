# PadelPals - frontend

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

## Para correr tests

#### Corre todos los test:

```
npx playwright test
```

#### En modo interactivo (útil para entender que hacen los tests)
```
npx playwright test --ui
```

#### Para correr los test en un solo navegador
Ejemplo: en Chrome
  
```
npx playwright test --project=chromium
```

#### Fix: Al Correr test fallan
En caso que haber instalado las dependencias del proyecto con `npm install` y no puedas correr los test, 
sugiero que se instalen las dependencias de testing con:

```
sudo npx playwright install
```

ó bien:

```
npx playwright install-deps
```

## Para salir del entorno virtual

Dentro de la raiz del proyecto:

```
nvm deactivate
```
