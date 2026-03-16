# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Astro static site for a veterinary clinic (Agus Vet). The site is a single-page layout with multiple sections: Header, Hero, Services, About, Contact, and Footer.

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Type check + build static site
npm run preview  # Preview built site locally
```

## Architecture

- **Framework**: Astro 5 with static output (`output: 'static'`)
- **Single page**: `src/pages/index.astro` composes all components
- **Components**: `src/components/*.astro` - each section is a self-contained Astro component
- **Layout**: `src/layouts/Layout.astro` - base HTML template with SEO meta tags, Open Graph, and Twitter cards
- **Data**: `src/data/*.ts` - TypeScript files exporting typed data (services, testimonials, contact info, social links)
- **Styles**: `src/styles/global.css` - global styles imported in layout
- **Scripts**: `src/scripts/main.js` - vanilla JavaScript for client-side interactivity
- **Language**: Spanish (es) - all content is in Spanish

## TypeScript

TypeScript is used for type safety in data files. Run `astro check` (included in build) to type-check.
