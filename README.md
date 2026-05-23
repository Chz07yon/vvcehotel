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

---

## 📖 Website Guide & Walkthrough

This guide details how to operate the different views, switch outlets, compile invoices, and analyze financials.

### Part 1: Cashier Terminal (POS Console)
1. **Accessing the Console**: Make sure the **Terminal Console** tab is selected in the top header.
2. **Customer & Order Placement**:
   - Enter the **Customer Name** and a validated **10-digit Phone Number** (letters and extra digits are automatically blocked).
   - Select the **Order Type**:
     - *Dine-In*: Prompts for table numbers (1 to 15).
     - *Delivery*: Reveals a platform dropdown (Zomato, Swiggy, Blinkit, etc.).
     - *Takeaway*: No extra configuration needed.
   - Choose the **Payment Method** (Cash, Card, or UPI). Selecting UPI automatically formats a digital QR scan card onto the receipt.
3. **Injecting Menu Items**:
   - **Method A (Category Tabs)**: Click on food tabs (e.g., *Breakfast*) and click any item card (e.g., *Masala Dosa*). It automatically appends to the invoice sheet. Click again to increment the quantity.
   - **Method B (Custom Entry)**: Click **Add Custom Item Line** at the bottom of the table to enter custom food items, base prices, and quantities manually.
   - **Method C (Batch Generator)**: Type a number in the **Quick-add rows** input (e.g., `4`) and click **Add Rows** to generate multiple blank lines.
4. **Invoice Compiling & Preview**:
   - Once items are added and fields are valid, the **Compile & Generate Bill** button unlocks.
   - Click it to view the styled thermal receipt preview which includes tax breakdowns (GST split, gas charges, discount savings, barcode, and scan-to-pay QR codes).
5. **Invoice Printing**:
   - Click **Print Customer Receipt** to trigger the browser's printer dialog. The print configuration isolates the receipt card and hides the rest of the web application.

### Part 2: Invoice History Recall
1. Click the **History Folder Icon** (🗄️) in the top header.
2. Type a customer name, phone number, or bill ID (e.g., `#VVCE-1002`) in the live search bar.
3. Click a transaction card to slide back the drawer and recall the historical receipt instantly.

### Part 3: Owner Dashboard (Administrative View)
1. Click **Owner Dashboard** in the top navigation header.
2. **Switching Outlets**:
   - The left sidebar displays your managed restaurants list. Click **VVCE Elite Bistro** or any other restaurant card.
   - Notice the header brand name and default configurations (discounts, GST taxes) dynamically update.
3. **Creating a New Outlet**:
   - Click **Add New Hotel** at the bottom of the sidebar.
   - Enter details (Name, Address, UPI ID, default taxes) and click **Create Hotel**. The active terminal switches to the new outlet instantly.
4. **Personnel Salary Management**:
   - Look at the **Employee Salaries Ledger** table.
   - Toggle status buttons: Click **Mark Paid** or **Mark Due** to toggle salary states. Glow badges indicate status.
   - Review salary summaries: Paid count, Due count, and outstanding Due Wage Liability.
   - Click **Add Employee** to register new staff members under the active outlet.
5. **Profit & Loss Analytics**:
   - Review KPIs: **Gross Revenue** (sales), **Total Expenses** (accrued paid wages + misc logs), and **Net Profit/Loss** (color-coded to glow green for profit, red for loss).
   - View the **SVG double bar chart** comparing incoming revenue against outgoing expenses.
   - Log other costs: Enter utility bills, rent, or ingredient costs in **Log Miscellaneous Expenses** (e.g., "Electricity Bill", `₹4,500`) and click **Add Expense** to update your P&L sheet instantly.
