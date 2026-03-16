# AGENTS.md

Este archivo establece los estándares y directrices para cualquier agente de IA (Gemini CLI, Claude Code, Cursor, etc.) que trabaje en este repositorio.

## Descripción del Proyecto
Sitio estático desarrollado con Astro para la clínica veterinaria **Agus Vet**.
Es una landing page (single-page) compuesta por secciones modulares.

## Comandos Principales
```bash
npm run dev      # Iniciar servidor de desarrollo
npm run build    # Verificar tipos + Construir sitio estático
npm run preview  # Previsualizar la construcción localmente
```

## Arquitectura y Estándares
- **Framework**: Astro 5 (`output: 'static'`).
- **Idioma**: **Español (es)**. Todo el contenido y comentarios nuevos deben ser en español.
- **Componentes**: Ubicados en `src/components/*.astro`. Cada sección es un componente autocontenido.
- **Datos (Data-Driven)**: El contenido (servicios, contacto, etc.) reside en `src/data/*.ts`. **No modificar contenido directamente en los componentes .astro**, usar los archivos de datos.
- **Estilos**: Vanilla CSS en `src/styles/global.css`. Evitar añadir frameworks como Tailwind a menos que se solicite.
- **Scripts**: Interactividad cliente únicamente en `src/scripts/main.js` usando Vanilla JS.
- **Tipado**: TypeScript se utiliza estrictamente para los archivos de datos y configuración.

## Directrices de Desarrollo
1. **Validación**: Siempre ejecutar `npm run build` antes de finalizar una tarea para asegurar la integridad de los tipos y la estructura de Astro.
2. **Sencillez**: Priorizar soluciones nativas de la web (HTML/CSS/JS) sobre dependencias externas.
3. **SEO**: Mantener las etiquetas meta y Open Graph actualizadas en `src/layouts/Layout.astro`.
