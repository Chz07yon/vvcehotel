# 🏨 VVCE RESTAURANT - Premium POS Terminal & Owner Dashboard

Welcome to the **VVCE Restaurant Premium POS Terminal & Owner Dashboard**, an enterprise-grade, standalone cashier and administrative console designed for Vidyavardhaka College of Engineering campus dining.

Originally built as a single-outlet billing terminal, the application has been expanded into a multi-restaurant management portal. Owners can now manage multiple outlets, toggle terminal configurations dynamically, oversee employee salaries, log operations expenses, and review automated Profit & Loss statement diagrams.

---

## 🌟 Key Features

### 1. 🎫 Dual-View Architecture (View Switcher)
- **Terminal Console**: The classic Point-of-Sale cashier interface optimized for high-speed order creation, custom line editing, menu quick-adds, and receipt generation.
- **Owner Dashboard**: An administrative control center for restaurant managers to track financials, switch outlets, and manage personnel.

### 2. 🏢 Multi-Restaurant Switcher & Manager
- **Dynamic Selection**: Sidebar list displaying all managed outlets (preloaded with *VVCE Restaurant* and *VVCE Elite Bistro*).
- **Instant Synchronization**: Switching active restaurants updates:
  - Header brand titles and crest subtitles.
  - Live analytics banner metrics (Revenue, Orders, Top Sellers specific to that restaurant).
  - Transaction history drawer search and invoice logs.
  - Thermal receipt headers (Crest titles, address lines, phone numbers, and UPI handles).
  - active tax settings (Default discount, GST rate, Gas charge rate) used by the billing calculator.
- **Add New Outlets**: Sleek modal interface to register new restaurants, custom contact info, and tax rate presets.

### 3. 💼 Employee Salaries Ledger
- **Staff Records**: Interactive staff database linked directly to the selected restaurant.
- **Paid/Due Status Badges**: Tracks which employee salaries are **Paid** or **Due** with glowing, color-coded badges.
- **One-Click Toggles**: Quick action buttons to instantly toggle salary status, dynamically updating business expenses and Profit & Loss sheets.
- **Wage Liability**: Summary indicators calculating paid headcount, due headcount, and outstanding due liabilities.
- **Add Personnel**: Add custom employees with specific designations and salaries.

### 4. 📈 Financial Analytics & P&L Dashboard
- **Financial KPIs**: Automated metrics tracking **Gross Revenue**, **Total Expenses** (Paid salaries + miscellaneous costs), and **Net Profit/Loss**.
- **Interactive SVG Chart**: A beautiful, glowing, gradients-based double bar chart that scales dynamically to represent Income vs Expenses.
- **Operational Expense Logger**: Record and log miscellaneous costs (Rent, Electricity, Supplies, raw ingredients) directly into a ledger.

### 5. 🧾 Classic Point-of-Sale (POS) Features
- **Categorized Inventory**: Preloaded, searchable menu tabs (Breakfast, Starters, Mains, Beverages) with single-click row injection.
- **Order Builder Table**: Add custom lines, batch row generators, and live calculation updates.
- **Branded Thermal Receipt**: Autocompiles CGST/SGST splits, gas charges, scan-to-pay merchant UPI QR codes, and custom bar codes. Supports physical paper size margins on printing.
- **Invoice Recall Drawer**: Off-canvas transaction drawer allowing cashiers to search, view, and print historical orders.

---

## 🛠️ Technology Stack

1. **Structure**: Semantic HTML5 elements (`index.html`) using tabbed view layouts.
2. **Styling**: Modern, premium, glassmorphic CSS3 (`style.css`) featuring:
   - Harmonious Obsidian & Gold tailored color palette.
   - Dynamic animations (glowing indicators, card hovers, receipt slide-ups).
   - Responsive layouts utilizing Flexbox and Grid systems that adapt gracefully on mobile/tablet devices.
   - Print overrides for physical receipt formatting.
3. **Logic**: Vanilla ES6+ JavaScript (`script.js`) doing state binding, P&L mathematics, dynamic SVG canvas drawing, and event list handling.
4. **Storage**: Web LocalStorage API for local state persistence.
5. **Fonts**: Imported typography from Google Fonts:
   - *Inter* (general UI, tables, and settings panel)
   - *Share Tech Mono* (classic dot-matrix receipt values and financial numbers)

---

## 📂 File Architecture

* **`index.html`**: The structure declaring POS terminals, history drawers, settings, add modals, and the Owner Dashboard panel.
* **`style.css`**: Spans color themes, responsive columns, buttons, table borders, status badges, and print stylesheets.
* **`script.js`**: Oversees application state arrays, local storage serialization, calculation formulas, SVG charts, and interactive toggles.
* **`C_Base.c`**: The original command-line terminal billing prototype written in C.
* **`Screenshot_20260522_094545_Gallery.jpg`**: Default image loaded when compiling UPI QR Code payment receipts.

---

## 🛢️ Local Storage Schema

The application saves state locally under five keys:

| Key Name | Data Type | Purpose |
|---|---|---|
| `vvce_hotels` | JSON Array | Array of registered restaurants and their specific configurations. |
| `vvce_current_hotel_id` | String | Holds the ID of the currently selected restaurant. |
| `vvce_employees` | JSON Array | Directory of staff members mapped to their respective restaurant IDs. |
| `vvce_expenses` | JSON Array | Log of miscellaneous expenses categorized by restaurant ID. |
| `vvce_transactions` | JSON Array | All completed POS transaction invoices. |
| `vvce_last_invoice` | String / Integer | Sequential serial number incrementer for POS receipts. |

---

## 🚀 Running the Application

This is a serverless client-side web application. No installation, compilation, or web hosting is required:

1. **Clone/Download the repository** to your local drive.
2. **Double-click** on `index.html` or open it with any modern web browser (Chrome, Edge, Firefox, or Safari).
3. Alternatively, if you have IDE extensions like *Live Server*, right-click `index.html` and select **"Open with Live Server"**.
