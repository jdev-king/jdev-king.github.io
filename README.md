# jdev-king.github.io // Engineering Systems Portfolio & RFC Studio

Repositorio del portafolio de ingeniería y estudio interactivo de arquitecturas (RFCs) de **Jesus Sebastian Diez Plasencia (`@jdev-king`)**, construido con **Angular 19**, **Tailwind CSS v4** y diagramas interactivos compilados con **Archify**.

> Para el archivo README diseñado específicamente para el perfil personal de GitHub (`github.com/jdev-king`), consulta [`GITHUB_PROFILE_README.md`](./GITHUB_PROFILE_README.md).

---

## Arquitectura del Proyecto

| Directorio / Archivo | Propósito |
| :--- | :--- |
| [`DESIGN.md`](./DESIGN.md) | Especificación del sistema visual (`Editorial Engineering Monograph`), paleta de alto contraste WCAG AA (Carbon Obsidian / Warm Archival Paper + Signal Orange / Deep Vermilion) y escala tipográfica (`Outfit` + `Plus Jakarta Sans` + `Fira Code`). |
| [`GITHUB_PROFILE_README.md`](./GITHUB_PROFILE_README.md) | Monografía técnica independiente lista para copiarse al repositorio de perfil `jdev-king/jdev-king`. |
| `public/architectures/*.html` | Seis artefactos interactivos autónomos generados con **Archify** (`sintad-ai-agent_diagram.html`, `nexusflow_diagram.html`, `nexusflow_sequenceOutbound.html`, `analytics-bridge_diagram.html`, `analytics-bridge_dataflow.html`, `analytics-bridge_repoflow.html`). |
| `src/app/features/home/` | Página principal con motor de arquitectura scroll-scrubbed (`ScrollScrubberComponent`), catálogo de productos corporativos e integraciones B2B (`EnterprisePipelineComponent`), trayectoria (`WorkComponent`), matriz de stack (`SkillsComponent`), repositorios Open Source (`ProjectsComponent`) y publicaciones (`ArticlesComponent`). |
| `src/app/features/architectures/` | Galería de especificaciones y páginas de detalle RFC (`RFC-AI-301`, `RFC-ERP-101`, `RFC-DATA-201`) con visor interactivo `ArchifyViewerComponent`. |

---

## Desarrollo y Compilación Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo (http://localhost:4200)
npm start

# Compilar bundle de producción en dist/
npm run build
```


