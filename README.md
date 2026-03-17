# Agus Vet

Bienvenido al repositorio de **Agus Vet**, una clínica veterinaria con más de 15 años de experiencia brindando atención médica, quirúrgica y preventiva para mascotas.

Este es un sitio web moderno, rápido y estático desarrollado con **Astro 5**, diseñado como una *landing page* (single-page) compuesta por secciones modulares.

## Características Principales
- **Desempeño Extremo:** Sitios estáticos generados por Astro (cero JavaScript por defecto).
- **Data-Driven:** Todo el contenido (servicios, testimonios, contacto) se gestiona desde archivos TypeScript (`src/data/*.ts`) separados de la UI.
- **Estilos Puros:** Uso de Vanilla CSS (`src/styles/global.css`) sin dependencias de frameworks externos.
- **Interactividad Limpia:** Scripts en Vanilla JS centralizados en `src/scripts/main.js`.
- **SEO Optimizado:** Etiquetas Meta y Open Graph implementadas en `src/layouts/Layout.astro` para máxima visibilidad.

## Stack Tecnológico
- **Framework:** Astro 5
- **Lenguajes:** TypeScript, HTML, Vanilla CSS, Vanilla JS
- **Estrategia de Renderizado:** Generación Estática (output: 'static')

## Estructura del Proyecto

```text
/
├── public/                 # Archivos estáticos como favicons
├── src/
│   ├── components/         # Componentes modulares .astro (UI)
│   ├── data/               # Contenido estructurado en .ts (Editar datos aquí)
│   ├── layouts/            # Plantilla base y metadatos SEO
│   ├── pages/              # Páginas del sitio (index.astro)
│   ├── scripts/            # Lógica y animaciones del cliente (main.js)
│   └── styles/             # Estilos globales (global.css)
```

## Desarrollo Local

### Requisitos Previos
- Node.js (versión compatible con Astro 5)
- npm (u otro gestor de paquetes de Node)

### Comandos de Desarrollo

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo (con Hot Reload)
npm run dev

# 3. Verificar tipos y construir el sitio para producción
npm run build

# 4. Previsualizar la construcción estática localmente
npm run preview
```

## Directrices para Colaboradores
1. **Idioma:** Todo el contenido, código de interfaz y comentarios nuevos deben redactarse en **español (es)**.
2. **Modificación de Contenido:** **NO** modificar textos o datos directamente en los componentes `.astro`. Toda la información reside y se edita en los archivos de `src/data/*.ts`.
3. **Sencillez:** Priorizar el uso de soluciones web nativas (HTML, CSS y JS puro) sobre la inclusión de dependencias o frameworks externos (por ejemplo, evitar Tailwind a menos que se solicite).
4. **Validación:** Siempre ejecutar `npm run build` antes de finalizar una tarea o hacer un commit, para asegurar la integridad estructural y de tipado (TypeScript).