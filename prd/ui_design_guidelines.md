# CEX Global UI Design Guidelines (Binance Inspired)

> **Role:** Global Fintech UX/UI Designer
> **Concept:** Pro-grade, Trustworthy, High-Density Exchange Interface
> **Tech Stack:** Tailwind CSS, Mobile-Responsive PC Web

---

## 1. Visual Identity & Color System

### 1.1 Brand Colors (Mongolia Blue Sky Theme)
- **Primary (Action):** `#0066B3` (Mongolian Blue) - Symbolizing the "Eternal Blue Sky," used for primary actions.
- **Success (Up):** `#00C087` (Emerald Green) - Positive price movement.
- **Danger (Down):** `#FF4D4F` (Cinnabar Red) - Negative price movement, Error, Delete. (Standard Trading Colors)
- **Backgrounds:**
    - **Dark Mode (Default):** `#0B0E11` (Main), `#1E2329` (Surface/Cards).
    - **Light Mode:** `#FFFFFF` (Main), `#F5F5F5` (Surface).

### 1.2 Typography
- **Primary Font (Body/Data):** Roboto, Inter, sans-serif.
    - Optimized for high-density trading data and numerical legibility.
- **Display Font (Headlines/Brand):** Poppins, sans-serif.
    - Used for Hero sections, headings, and primary CTA buttons to provide a modern, geometric aesthetic.
- **Data Tables & Pricing:** 
    - Always use `font-variant-numeric: tabular-nums;` (Tailwind: `tabular-nums`) for price lists, orderbooks, and any vertical numerical alignment.
    - Letter spacing for Roboto should be slightly adjusted (`tracking-tight` or `tracking-tighter`) in dense tables if needed.

---

## 2. Component Design Principles

### 2.1 High-Density Data
- Trade pages should prioritize information density.
- Tabular data should use consistent row heights (e.g., 32px or 40px).

### 2.2 Responsive Layout (PC First, Mobile Friendly)
- **Desktop:** Multi-column grid for Trade (Market | Chart | Orderbook | Panel).
- **Mobile:** Single-column stacked or tab-based navigation.
- **Container:** Max-width 1440px for wide screens.

---

## 3. Module Specific UX Rules

### 3.1 Onboarding Flow
- **Layout:** Centered card (max-width: 480px).
- **Visuals:** Step indicators, clear CTA, live password strength validation.

### 3.2 Trade Interface
- **Layout:** "Dashboard" style.
- **Panels:** Draggable or collapsible panels to maximize screen real estate.
- **Interactions:** One-click price entry from Orderbook to Order Panel.

### 3.3 Wallet & Assets
- **Visuals:** Doughnut charts for asset distribution.
- **Security:** Blurring balance option (Privacy mode).

---

## 4. Implementation Roadmap

- [ ] Define global Tailwind config (Colors, Fonts).
- [ ] Build Onboarding Shell & Screens (Login/Signup/KYC).
- [ ] Build Trade Dashboard (Responsive Grid Layout).
- [ ] Build Wallet & Assets list.
- [ ] Integrate Logic & Restrictions from `detailed_compliance_matrix.md`.
