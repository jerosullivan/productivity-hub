# CLAUDE.md — Productivity Hub

This file provides context for AI assistants working on this codebase.

## Project Overview

**Productivity Hub** is a client-side Next.js dashboard application providing four productivity widgets:
- **TodoList** — task management with add/complete/delete
- **FocusTimer** — Pomodoro-style countdown timer with focus and break modes
- **QuickNotes** — free-form textarea with localStorage persistence and Ctrl+S shortcut
- **DarkModeToggle** — system-preference-aware dark/light theme switcher

There is no backend, no database, and no external API calls. All state lives in React (`useState`) or the browser (`localStorage`).

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI library | React 19 |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v4 |
| CSS processing | PostCSS + `@tailwindcss/postcss` |
| Linting | ESLint 9 (flat config, `eslint-config-next`) |
| Package manager | npm |

---

## Directory Structure

```
productivity-hub/
├── app/
│   ├── layout.tsx        # Root layout — wraps app in DarkModeProvider, loads Geist fonts
│   ├── page.tsx          # Main dashboard page — composes all widgets
│   └── globals.css       # Tailwind import, CSS custom properties, dark-mode variant
├── components/
│   ├── DarkModeProvider.tsx  # Context + hook for dark mode (localStorage, system pref)
│   ├── DarkModeToggle.tsx    # Fixed-position sun/moon toggle button
│   ├── FocusTimer.tsx        # Pomodoro timer with presets and auto-session switching
│   ├── QuickNotes.tsx        # Textarea with save/clear, Ctrl+S, character counter
│   └── TodoList.tsx          # Task list (in-memory; no persistence)
├── public/               # Static SVG assets
├── next.config.ts        # Minimal Next.js config (defaults only)
├── tsconfig.json         # TypeScript config — target ES2017, path alias @/* → ./
├── eslint.config.mjs     # ESLint flat config
├── postcss.config.mjs    # Tailwind v4 PostCSS plugin
└── package.json
```

---

## Development Workflow

### Commands

```bash
npm run dev     # Start dev server at http://localhost:3000
npm run build   # Production build
npm run start   # Serve production build
npm run lint    # Run ESLint across the project
```

### Typical workflow

1. Run `npm run dev` to start the dev server with hot reload.
2. Edit files in `app/` or `components/`.
3. Run `npm run lint` before committing to catch issues.
4. Run `npm run build` to verify the production build succeeds.

### No test suite

There are currently no tests. If adding tests, prefer **Vitest** with **React Testing Library** — both integrate cleanly with Next.js without requiring a custom Jest transform setup.

---

## Key Conventions

### Next.js App Router patterns

- All interactive components must have `'use client'` at the top — this project has no server components beyond the root layout.
- The root layout (`app/layout.tsx`) is a server component that wraps children in `DarkModeProvider`.

### TypeScript

- **Strict mode is on.** No `any`, no implicit `any`. All component props must have explicit interfaces.
- Path alias `@/*` resolves to the project root (e.g., `import { useDarkMode } from '@/components/DarkModeProvider'`).

### Styling

- Use **Tailwind utility classes exclusively** — no CSS modules, styled-components, or inline `style` props.
- Dark mode is applied via the `.dark` class on `<html>` (set by `DarkModeProvider`) and Tailwind's `dark:` variant.
- Responsive breakpoints follow mobile-first convention: `lg:` is the primary breakpoint for two-column grid layout.
- The global container uses `max-w-7xl mx-auto`.

### State and persistence

| Data | Storage |
|---|---|
| Dark mode preference | `localStorage` key `"darkMode"` |
| Notes content | `localStorage` key `"productivity-hub-notes"` |
| Todo items | React `useState` only (cleared on refresh) |
| Timer state | React `useState` + `useRef` only |

When adding new persistent data, follow the `QuickNotes` pattern: initialize from `localStorage` inside a `useEffect`, write back on change.

### Component structure

- Functional components only, using hooks (`useState`, `useEffect`, `useRef`, `useContext`).
- Export the component as the **default export**.
- Export shared types/hooks as **named exports** (see `DarkModeProvider` exporting both the provider and `useDarkMode`).
- SVG icons are inlined directly in JSX — do not add an icon library dependency for one-off icons.

---

## Architecture Notes

- **No API routes** — there is no `app/api/` directory. Do not add server-side endpoints unless the project scope explicitly requires them.
- **No environment variables** — no `.env` files are used. The `.gitignore` pattern `.env*` is already in place should they ever be needed.
- **No CI/CD** — there are no GitHub Actions workflows or other pipeline configs. Add them to `.github/workflows/` if needed.
- **No custom Tailwind config** — Tailwind v4 is configured exclusively via `postcss.config.mjs` and CSS `@import`. Do not create a `tailwind.config.js` unless v4 CSS-based configuration proves insufficient.

---

## Adding a New Widget

1. Create `components/MyWidget.tsx` with `'use client'` at the top.
2. Define a TypeScript interface for any props.
3. Use `useDarkMode()` from `@/components/DarkModeProvider` for theme support.
4. If persistence is needed, read from and write to `localStorage` inside `useEffect`.
5. Import and add the component to `app/page.tsx` inside the existing grid.
