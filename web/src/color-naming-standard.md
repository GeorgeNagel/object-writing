# Color Naming Standard

## Palette tokens

Raw color values. Named using a Tailwind-style scale.

```
--color-{name}-{scale}
```

Example: `--color-slate-900`

Palette tokens are defined globally and never used directly in component styles — always reference a semantic token instead.

## Semantic tokens

Map palette values to usage.

```
--{element}-{property}[-{state}]
```

- **element**: the UI element or context (e.g. `button`, `input`, `text`, `bg`)
- **property**: the CSS property being set (e.g. `color`, `bg`, `border`)
- **state**: optional interaction or variant state (e.g. `hover`, `disabled`, `focus`)

Examples:
- `--text-primary` — main body text color
- `--button-border-disabled` — button border when disabled
- `--input-border-focus` — input underline on focus

## Dark mode

Dark mode tokens use a `dark-` prefix on the semantic name:

```
--dark-{element}-{property}[-{state}]
```

Dark mode tokens are not yet in use. Add them when dark mode is implemented.

## TypeScript color constants

Colors used in inline styles follow the same palette naming scheme in SCREAMING_SNAKE_CASE:

```
COLOR_{NAME}_{SCALE}
```

Semantic maps (e.g. sense highlight colors) reference palette constants, not raw hex values.
