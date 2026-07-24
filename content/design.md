---
version: alpha
name: Nuxt
description: Дизайн-система Nuxt на Nuxt UI и Tailwind CSS v4. Тёмная тема по умолчанию.
brand:
  green: "#00DC82"
  navy: "#020420"
  white: "#FFFFFF"
theme:
  font-sans: "'Public Sans', sans-serif"
  color-green-50: "#EFFDF5"
  color-green-100: "#D9FBE8"
  color-green-200: "#B3F5D1"
  color-green-300: "#75EDAE"
  color-green-400: "#00DC82"
  color-green-500: "#00C16A"
  color-green-600: "#00A155"
  color-green-700: "#007F45"
  color-green-800: "#016538"
  color-green-900: "#0A5331"
  color-green-950: "#052E16"
semantic-colors:
  primary: green
  neutral: slate
  important: violet
  secondary: blue
  success: green
  info: blue
  warning: yellow
  error: red
css-variables:
  ui-container: 90rem
  ui-header-height: 112px
  ui-bg-dark: "var(--ui-color-neutral-950)"
  ui-bg-muted-dark: "var(--ui-color-neutral-900)"
  ui-bg-elevated-dark: "var(--ui-color-neutral-900)"
  ui-bg-accented-dark: "var(--ui-color-neutral-800)"
text:
  dimmed: "text-dimmed"
  muted: "text-muted"
  toned: "text-toned"
  default: "text-default"
  highlighted: "text-highlighted"
  inverted: "text-inverted"
background:
  default: "bg-default"
  muted: "bg-muted"
  elevated: "bg-elevated"
  accented: "bg-accented"
  inverted: "bg-inverted"
border:
  default: "border-default"
  muted: "border-muted"
  accented: "border-accented"
  inverted: "border-inverted"
radius:
  base: "var(--ui-radius)"
  utilities: [xs, sm, md, lg, xl, 2xl, 3xl]
components:
  button-primary: 'UButton color="primary"'
  button-secondary: 'UButton color="neutral" variant="subtle"'
  button-ghost: 'UButton variant="ghost"'
  button-error: 'UButton color="error"'
  input: 'UInput'
  container: 'UContainer'
  page-hero: 'UPageHero'
  prose: 'prose prose-primary dark:prose-invert'
---

# Nuxt

## Обзор

Дизайн-язык продуктов и коммуникаций Nuxt. Стиль для разработчиков: тёмно-синие поверхности, зелёный Nuxt как единственный акцент, много воздуха. Читаемость, доступность и ясность важнее декора. Цвет — для состояния и иерархии, не чтобы заполнить пустоту.

Система на [Nuxt UI](https://ui.nuxt.com) и **Tailwind CSS v4**, токены — **CSS-переменные**. В компонентах семантические цвета (`primary`, `neutral`, `error`…), не сырые hex. Тёмная тема по умолчанию.

Логотипы и файлы бренда: [/design-kit](/design-kit).

## Tailwind CSS

Токены темы задаются директивой `@theme`:

```css
@import "tailwindcss";
@import "@nuxt/ui";

@theme static {
  --font-sans: 'Public Sans', sans-serif;
  --color-green-50: #EFFDF5;
  /* … green-100 through green-950 … */
  --color-green-400: #00DC82;
}

:root {
  --ui-container: 90rem;
}

.dark {
  --ui-bg: var(--ui-color-neutral-950);
  --ui-bg-muted: var(--ui-color-neutral-900);
  --ui-bg-elevated: var(--ui-color-neutral-900);
  --ui-bg-accented: var(--ui-color-neutral-800);
}
```

Полные опции `@theme`: [документация Nuxt UI](https://ui.nuxt.com/docs/getting-started/theme/design-system).

## Брендовые цвета

Маркетинговые цвета Nuxt, отдельно от семантических токенов Nuxt UI:

| Имя | Hex | Назначение |
|-----|-----|------------|
| Green | `#00DC82` | Логотип, акцент бренда. В `@theme` — `green-400`. |
| Navy | `#020420` | Тёмные фоны, OG-изображения, meta `theme-color`. |
| White | `#FFFFFF` | Текст на тёмном, светлые варианты логотипа. |

Шкала green (`green-50`–`green-950`) в `@theme static` питает семантический `primary`.

## Семантические цвета

Nuxt UI мапит алиасы на шкалы Tailwind через runtime config:

| Семантика | Шкала | Назначение |
|-----------|-------|------------|
| `primary` | `green` | CTA, ссылки, активная навигация, бренд |
| `neutral` | `slate` | Текст, границы, фоны, disabled |
| `important` | `violet` | Акцентные бейджи |
| `secondary` | `blue` (default) | Вторичные действия |
| `success` | `green` (default) | Успех |
| `info` | `blue` (default) | Инфо, тултипы |
| `warning` | `yellow` (default) | Предупреждения, ожидание |
| `error` | `red` (default) | Ошибки, деструктивные действия |

Проп `color` на компонентах Nuxt UI:

```vue
<UButton color="primary">Get Started</UButton>
<UButton color="neutral" variant="subtle">Learn More</UButton>
<UButton color="error">Delete</UButton>
```

Цвета темы: `primary`, `secondary`, `info`, `success`, `warning`, `error`, `important`.

## CSS-переменные

Nuxt UI даёт utility-классы на `--ui-*`. Подробнее: [CSS variables](https://ui.nuxt.com/docs/getting-started/theme/css-variables).

### Цветовые utility

`text-primary`, `bg-success`, `border-error` и т.д. — оттенок шкалы mapped color. Light: `-500`, dark: `-400`.

### Иерархия текста

| Класс | Роль |
|-------|------|
| `text-dimmed` | Disabled, placeholder |
| `text-muted` | Вторичный текст, подписи |
| `text-toned` | Третичный текст |
| `text-default` | Основной текст |
| `text-highlighted` | Заголовки, акцент |
| `text-inverted` | Текст на инвертированном фоне |

### Иерархия фона

| Класс | Роль |
|-------|------|
| `bg-default` | Поверхность страницы |
| `bg-muted` | Лёгкая заливка, группы |
| `bg-elevated` | Карточки, popover |
| `bg-accented` | Hover, активные панели |
| `bg-inverted` | Инвертированная поверхность |

В тёмной теме `--ui-bg` = `neutral-950` (глубже дефолта `neutral-900`) — оттенок ближе к navy.

### Иерархия границ

| Класс | Роль |
|-------|------|
| `border-default` | Обычные границы |
| `border-muted` | Тонкие разделители |
| `border-accented` | Выделенные границы |
| `border-inverted` | Границы на инвертированном фоне |

Карточки и модули: `border border-default` на `bg-elevated` или `bg-muted`.

## Типографика

**Шрифт:** Public Sans (`--font-sans`), через `@nuxt/fonts`.

Фиксированной type scale в Nuxt UI нет. Tailwind utilities:

| Контекст | Типичные классы |
|----------|-----------------|
| Hero страницы | `text-5xl sm:text-7xl font-semibold` |
| Hero секции | `sm:text-5xl font-semibold` |
| Заголовки секций | `text-2xl`–`text-4xl font-semibold` |
| Body / prose | `prose prose-primary dark:prose-invert` |
| UI labels | `text-sm`, `text-xs` |
| Код | `font-mono`, блоки Shiki |

Предпочитайте семантические классы (`text-highlighted`, `text-muted`) вместо raw slate.

## Вёрстка

### Container

`--ui-container: 90rem` — для `UContainer`.

### Header

`--ui-header-height: 112px` на больших экранах (docs, marketing).

### Отступы

Шкала Tailwind, шаг 4px. Ритм:

- `gap-2` / `p-2` (8px) — внутри группы
- `gap-4` / `p-4` (16px) — между связанными элементами
- `py-10 sm:py-20` — padding секции
- `py-24 sm:py-32 lg:py-40` — hero

### Breakpoints

Tailwind defaults: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px, `2xl` 1536px.

## Скругления

Все `rounded-*` от `--ui-radius` (default `0.25rem`): `rounded-xs` … `rounded-3xl`.

Карточки и контролы: `rounded-lg` или `rounded-md`. Hero-панели: `rounded-2xl`.

## Компоненты

Примитивы Nuxt UI — не дублируйте:

| Паттерн | Компонент | Пример |
|---------|-----------|--------|
| Основное действие | `UButton` | `<UButton color="primary">Deploy</UButton>` |
| Вторичное | `UButton` | `<UButton color="neutral" variant="subtle">Cancel</UButton>` |
| Третичное / ссылка | `UButton` | `<UButton variant="ghost">Docs</UButton>` |
| Деструктивное | `UButton` | `<UButton color="error">Delete</UButton>` |
| Поле ввода | `UInput` | `<UInput placeholder="Search modules" />` |
| Страница | `UPage`, `UPageHero`, `UPageBody` | Marketing, docs |
| Контент | `ContentRenderer` + prose | Markdown/MDC |
| Навигация | `UHeader`, `UNavigationMenu` | Шапка |

Focus ring — у Nuxt UI (`outline-primary/25` на `:focus-visible`). Не убирайте outline без видимой замены.

## Анимация

Умеренно. Учитывайте `prefers-reduced-motion`. У модалок, popover и меню — дефолтные transitions Nuxt UI.

## Тон и тексты

- Title Case для labels, кнопок, заголовков и табов; sentence case для body и подсказок.
- Действия: глагол + существительное (`Deploy Project`, `Install Module`).
- Ошибки: что случилось и что делать дальше.
- Toast называет конкретное изменение — без точки в конце, без «successfully».
- Empty state ведёт к первому действию.
- Процесс: present participle + многоточие: `Deploying…`.

## Делать и не делать

- Семантические props (`color="primary"`) и utility (`text-muted`, `bg-elevated`) — не raw hex в компонентах.
- Зелёный `primary` — один главный CTA на экране.
- Текст: `text-highlighted` > `text-default` > `text-muted` > `text-dimmed`.
- Контраст WCAG AA (4.5:1 для body).
- Состояние не только цветом — добавьте иконку или label.
- Не хардкодьте `#00DC82` — `text-primary` или `color="primary"`.
- Wordmark без горы — см. [/design-kit](/design-kit).

## Ресурсы

- Ассеты бренда: [/design-kit](/design-kit)
- Figma: [Nuxt Brand Kit](https://www.figma.com/community/file/1296154408275753939/nuxt-brand-kit)
- Design system Nuxt UI: [ui.nuxt.com/docs/getting-started/theme/design-system](https://ui.nuxt.com/docs/getting-started/theme/design-system)
- CSS variables Nuxt UI: [ui.nuxt.com/docs/getting-started/theme/css-variables](https://ui.nuxt.com/docs/getting-started/theme/css-variables)
