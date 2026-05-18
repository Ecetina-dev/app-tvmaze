# TV Maze - Series y Películas

Proyecto Angular 17 que consume la API de TV Maze para mostrar series y películas con buscador, paginación y modal de detalle.

## API

[TV Maze API](https://www.tvmaze.com/api) - API gratuita, sin autenticación, con CORS habilitado.

## Funcionalidades

- **Buscador:** Consulta el endpoint `/search/shows?q=` de la API con debounce de 500ms
- **Paginación:** MatPaginator de Angular Material con paginación local (instantánea tras primera carga)
- **Modal de detalle:** MatDialog con información completa del show (horario, rating, géneros, cadena, IMDb, etc.)
- **Pipe personalizado:** `FilterShowsPipe` para filtrado local (referencia)
- **Cache en memoria:** Respuestas cacheadas por 5 minutos para mejorar rendimiento
- **Optimización de imágenes:** `loading="lazy"` para carga progresiva

## Requisitos

- Node.js 18+
- Angular CLI 17

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm start
```

Abre [http://localhost:4200](http://localhost:4200) en tu navegador.

## Build

```bash
npm run build
```

El output se genera en `dist/`.

## Tecnologías

- Angular 17 (standalone components, signals, new control flow)
- Angular Material 17
- RxJS (debounce, debounceTime)
- TypeScript strict mode
- TV Maze REST API

## Estructura del proyecto

```
src/app/
├── models/          → interfaces TypeScript
├── services/        → TvMazeService (HTTP + cache)
├── pipes/           → FilterShowsPipe (referencia)
└── components/
    ├── show-search/    → buscador con debounce
    ├── show-list/       → lista + paginación
    ├── show-card/       → tarjeta de serie
    └── show-detail/     → modal de detalle
```

## Cumplimiento de la actividad

- ✅ API gratuita, segura y sin clave
- ✅ Buscador usando endpoint de la API
- ✅ Pipe personalizado (investigado y documentado)
- ✅ Paginación con Angular Material
- ✅ Modal con información detallada
- ✅ Angular Material integrado
- ✅ Angular 17 standalone (no NgModule)