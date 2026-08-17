# Taiwan Air Quality Map

Real-time air quality index (AQI) map for Taiwan, powered by the Ministry of Environment open data API.

## Live Demo

**https://john8895.github.io/air-quality/**

## Features

- **GPS auto-locate** — finds the nearest monitoring station on load
- **Interactive map** — color-coded markers for all stations (Leaflet)
- **Search & filter** — type a station name or city to filter the list and map
- **6-level AQI scale** — color grading follows Taiwan EPA standards (Good → Hazardous)

## Tech Stack

| Tech | Purpose |
|------|---------|
| React 19 | UI framework |
| Vite | Build tool |
| Tailwind CSS 4 | Styling |
| Leaflet + React-Leaflet | Interactive map |
| MOENV Open Data API | AQI data source |

## Getting Started

```bash
git clone https://github.com/john8895/air-quality.git
cd air-quality
npm install
npm run dev
```

## License

MIT
