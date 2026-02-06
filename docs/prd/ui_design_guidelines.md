# CEX Global UI Design Guidelines (Binance Inspired)

> **Role:** Global Fintech UX/UI Designer
> **Concept:** Pro-grade, Trustworthy, High-Density Exchange Interface
> **Tech Stack:** Tailwind CSS, Mobile-Responsive PC Web

---

## 1. Visual Identity & Color System

### 1.1 Brand Colors (Mongolia Blue Sky Theme)
- **Primary (Action):** `#593FFF` (Mongolian Blue) - Symbolizing the "Eternal Blue Sky," used for primary actions.
- **Success (Up):** `#00C087` (Emerald Green) - Positive price movement.
- **Danger (Down):** `#FF4D4F` (Cinnabar Red) - Negative price movement, Error, Delete. (Standard Trading Colors)
- **Backgrounds:**
    - **Dark Mode (Default):** `#0B0E11` (Main), `#1E2329` (Surface/Cards).
    - **Light Mode:** `#FFFFFF` (Main), `#F5F5F5` (Surface).


## 2. Unified Border Radius System

A consistent border radius system ensures visual harmony across all UI components. This system maps semantic names to pixel values in `tailwind.config.cjs`.

### 2.1 Radius Tokens

| Token | Pixel Value | Use Case | Examples |
|-------|-------------|----------|----------|
| `rounded-none` | 0px | Sharp corners | Borders, dividers |
| `rounded-sm` | 6px | Small elements | Tags, tiny badges |
| `rounded` / `rounded-md` | 8px | Base radius | Small buttons, tabs |
| `rounded-lg` | 12px | Standard interactive | Buttons, inputs, dropdowns |
| `rounded-xl` | 16px | Container elements | Cards, panels, list items |
| `rounded-2xl` | 20px | Large containers | Large cards, modals |
| `rounded-3xl` | 24px | Hero elements | Feature cards, onboarding screens |
| `rounded-full` | 9999px | Circular only | Avatars, status dots, icon buttons |

### 2.2 Usage Guidelines

**Buttons & Inputs:**
- Primary/Standard buttons: `rounded-lg`
- Small buttons: `rounded-md`
- Input fields: `rounded-lg`
- Dropdown menus: `rounded-lg`

**Cards & Containers:**
- Standard cards: `rounded-xl`
- Modal dialogs: `rounded-xl` to `rounded-2xl`
- Feature/Hero cards: `rounded-2xl` to `rounded-3xl`

**Small Elements:**
- Tags/Badges: `rounded-sm` to `rounded-md`
- Status indicators: `rounded-full`
- Avatars: `rounded-full`

### 2.3 Implementation in Tailwind

```javascript
// tailwind.config.cjs
borderRadius: {
    'none': '0',
    'sm': '6px',
    'DEFAULT': '8px',
    'md': '8px',
    'lg': '12px',
    'xl': '16px',
    '2xl': '20px',
    '3xl': '24px',
    'full': '9999px',
}
```

---

## 3. Component Design Principles

### 3.1 High-Density Data
- Trade pages should prioritize information density.
- Tabular data should use consistent row heights (e.g., 32px or 40px).

### 3.2 Responsive Layout (PC First, Mobile Friendly)
- **Desktop:** Multi-column grid for Trade (Market | Chart | Orderbook | Panel).
- **Mobile:** Single-column stacked or tab-based navigation.
- **Container:** Max-width 1440px for wide screens.

---

## 4. Module Specific UX Rules

### 4.1 Onboarding Flow
- **Layout:** Centered card (max-width: 480px).
- **Visuals:** Step indicators, clear CTA, live password strength validation.

### 4.2 Trade Interface
- **Layout:** "Dashboard" style.
- **Panels:** Draggable or collapsible panels to maximize screen real estate.
- **Interactions:** One-click price entry from Orderbook to Order Panel.

### 4.3 Wallet & Assets
- **Visuals:** Doughnut charts for asset distribution.
- **Security:** Blurring balance option (Privacy mode).

---

## 5. Typography System

### 5.1 Font Families

| Role | Font | Use Case |
|------|------|----------|
| **Primary (Body/Data)** | Inter | Body text, trading data, tables, forms |
| **Display (Headlines)** | Poppins | Hero sections, headings, brand elements |
| **Monospace** | JetBrains Mono, Fira Code | Price data, code blocks |

### 5.2 Font Loading (Google Fonts)

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 5.3 Tailwind Configuration

```javascript
fontFamily: {
  sans: ['Inter', 'system-ui', ...], // Body text
  display: ['Poppins', 'system-ui', 'sans-serif'], // Headlines
  mono: ['JetBrains Mono', 'Fira Code', ...], // Trading data
}
```

### 5.4 Usage Guidelines

- **Body Text**: Use `font-sans` (Inter) for all general content
- **Headlines**: Use `font-display` (Poppins) for hero sections and major headings
- **Trading Data**: Use `font-mono` with `tabular-nums` for price and numerical data

---

## 6. Implementation Roadmap

- [x] Define global Tailwind config (Colors, Fonts).
- [ ] Build Onboarding Shell & Screens (Login/Signup/KYC).
- [ ] Build Trade Dashboard (Responsive Grid Layout).
- [ ] Build Wallet & Assets list.
- [ ] Integrate Logic & Restrictions from `detailed_compliance_matrix.md`.
