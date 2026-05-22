# 🏨 VVCE HOTEL - Premium Billing Terminal

Welcome to the **VVCE Hotel Premium Billing Terminal**, a modern, responsive, and feature-rich Point-of-Sale (POS) application designed specifically for the Vidyavardhaka College of Engineering campus dining.

This client-side web application operates as a standalone desktop/tablet-optimized cashier console that lets users build invoices, track real-time sales metrics, search menu inventories, generate thermal-style invoices with custom configurations (tax, discounts, gas charges), output print-ready receipts, and log transactions locally.

---

## 🌟 Key Features

### 1. 📊 Collapsible Live Analytics Dashboard
* **Real-time Metrics:** Displays **Total Revenue**, **Orders Completed**, **Top Selling Item** (with quantity count), and **Total Savings Given** (discounts).
* **Instant Synced Updates:** Analytics automatically refresh every time a new invoice is compiled and completed.
* **Collapsible UI:** A clean toggle button collapses the banner to maximize vertical space when needed.

### 2. 🧾 Billing Console
* **Customer Profiling:** Input customer name and validated 10-digit phone number with real-time field feedback.
* **Smart Order Routing:** Choose between **Dine-In** (prompts for Table Numbers 1–15), **Takeaway**, or **Delivery** (reveals platform dropdowns like Zomato, Swiggy, Zepto, Blinkit, etc.).
* **Flexible Payments:** Supports Cash, Card, and UPI methods. Selecting UPI auto-displays a merchant QR code directly on the receipt.

### 3. 🍱 Categorized Menu Inventory (Quick-Add)
* **Preloaded Menu:** Includes items categorized under Breakfast, Starters, Mains, and Beverages.
* **Fuzzy Live Search:** Input-triggered menu filter to find food items instantly.
* **Category Tabs:** Fast navigation tabs (All, Breakfast, Starters, Mains, Beverages).
* **One-Click Row Injection:** Clicking any menu item adds it to the order items list or increases its quantity if already added.

### 4. 🛒 Dynamic Order Builder (Table)
* **Custom Row Actions:** Add custom lines on-the-fly where you can define item names, prices, and quantities.
* **Batch Row Generator:** Input a count and generate multiple empty lines simultaneously.
* **Live Calculation Updates:** Row totals and grand total metrics recompute instantly on every keystroke.
* **Deletion Control:** Quickly remove unwanted item lines with single-click actions.

### 5. 🖨️ Live Thermal Receipt Preview & Printing
* **Authentic Styling:** Recreates a classic physical thermal receipt design complete with brand crest, dotted/double divider lines, and business metadata.
* **Taxes & Charges Engine:** Dynamically calculates configurable discounts, GST (CGST + SGST split), and Gas Charges.
* **Interactive Add-ons:** Generates a virtual scan-to-pay UPI QR code and a unique Pos-compiled alphanumeric barcode.
* **Print Optimization:** Customized CSS `@media print` style overrides hide everything on the screen and print *only* the thermal receipt card to physical printers or PDF.

### 6. 🗄️ Transaction History Drawer
* **Off-Canvas Drawer:** A sliding sidebar that lists all invoices processed during the session.
* **Search Filter:** Search through past invoices by customer name, phone number, or invoice ID.
* **Interactive Recall:** Click any past invoice card in the drawer to instantly reload the full invoice details back onto the receipt preview card.

### 7. ⚙️ Admin Settings Console
* **Configure Rates:** Modify GST %, Discount Base %, and Gas Charge % on-the-fly.
* **Merchant UPI Address:** Update the destination UPI handle for the QR code.
* **Local Persistence:** Configuration parameters persist across browser reloads.

---

## 🛠️ Technology Stack

1. **Structure:** Semantic [HTML5](file:///c:/Extacuricular/Antigravity/CABA/index.html) with flexible container wrappers.
2. **Styling:** Custom [Vanilla CSS3](file:///c:/Extacuricular/Antigravity/CABA/style.css) featuring:
   * CSS Variables for color palette, spacing, and font sizes.
   * Glassmorphic cards with subtle backdrop-blur.
   * Responsive Flexbox and Grid layouts.
   * Smooth micro-animations (slide-in drawers, scaling button clicks, active tabs).
   * Print stylesheet overrides.
3. **Behavior:** [Vanilla ES6+ JavaScript](file:///c:/Extacuricular/Antigravity/CABA/script.js) doing DOM binding, live event handling, array mutations, and math calculations.
4. **Fonts:** Imported typography from Google Fonts:
   * *Inter* (UI controls, labels, layout dashboard)
   * *Share Tech Mono* (classic dot-matrix monospace style for the thermal receipt values)
5. **Storage:** Web LocalStorage API for local state persistence.

---

## 📂 File Architecture

* **[index.html](file:///c:/Extacuricular/Antigravity/CABA/index.html):** Declares layout grids, dashboard panels, settings modal, history drawer, and the receipt layout.
* **[style.css](file:///c:/Extacuricular/Antigravity/CABA/style.css):** Contains style system tokens, UI element rules, hover states, animations, and `@media print` configuration.
* **[script.js](file:///c:/Extacuricular/Antigravity/CABA/script.js):** Contains POS state, menu arrays, helper functions, and event listeners.
* **`Screenshot_20260522_094545_Gallery.jpg`:** Local image file loaded when UPI QR Code payment method is selected.

---

## 🚀 How to Run the Application

The terminal is entirely serverless and client-side. There are no build pipelines or package steps required to run it:

1. **Clone/Download the repository** to your local drive.
2. **Double-click** on [index.html](file:///c:/Extacuricular/Antigravity/CABA/index.html) or right-click and choose **"Open with Web Browser"** (Chrome, Edge, Firefox, or Safari).
3. Alternatively, if you have IDE extensions like *Live Server*, right-click [index.html](file:///c:/Extacuricular/Antigravity/CABA/index.html) and click **"Open with Live Server"**.

---

## 📖 User Guide & Walkthrough

### Step 1: Set Up Terminal Configurations (Optional)
1. Click the **Settings Gear Icon** ⚙️ in the top header.
2. Change the default values for **Discount (%)**, **GST Rate (%)**, **Gas Charge (%)**, or the **Hotel UPI Address**.
3. Click **Save Config**. All subsequent receipts will calculate charges using these values.

### Step 2: Input Customer & Order Details
1. Type the **Customer Name** (e.g., "John Doe").
2. Type the **Phone Number** (Must be a 10-digit number. Letters are automatically filtered out).
3. Select the **Order Type**:
   * If *Dine-In*, pick a table number.
   * If *Delivery*, select a delivery partner platform.
4. Select the **Payment Method**.

### Step 3: Add Items to the Order
* **Method A (Quick-Add):** Click the food category tabs (e.g., *Breakfast*) and click any food button (e.g., *Masala Dosa*). It adds a row in the order items table with a quantity of 1. Click again to increment the quantity.
* **Method B (Custom line):** Click **"Add Custom Item Line"** to append an empty row. Type in a custom item name, unit price, and quantity.
* **Method C (Batch Add):** Enter a quantity (e.g., `3`) in the "Quick-add rows" input and click **"Add Rows"**.

### Step 4: Compile & Generate
1. Check the billing details. The **"Compile & Generate Bill"** button activates once all required inputs (customer, phone, and at least one complete item line) are valid.
2. Click **Compile & Generate Bill**. 
3. The thermal receipt preview appears dynamically with a slide-up animation.

### Step 5: Print Receipt
1. Click **"Print Customer Receipt"** at the bottom of the page.
2. The browser's print dialog opens. The app formats the document so that only the thermal receipt is visible.

### Step 6: Drawer Search and Recall
1. Click the **History Icon** 📁 in the header to pull out the transaction logs drawer.
2. Search by Customer Name, Phone, or Invoice Number.
3. Click on any transaction card in the drawer. The invoice drawer slides back, and the receipt template instantly updates to display the historical invoice.

---

## 🛢️ Local Storage Schema

The terminal stores state using three key-value keys:

| Key Name | Data Type | Purpose |
|---|---|---|
| `vvce_config` | JSON Object | Stores user-configured GST %, Discount %, Gas Charge %, and UPI handle. |
| `vvce_transactions` | JSON Array | Array containing all compiled transaction records (customer, phone, totals, dates, items list). |
| `vvce_last_invoice` | String / Integer | Keeps track of the last serialized invoice number to generate increments (e.g., `1001`, `1002`). |

---

## 🎨 Theme & Typography Design Details

* **Layout Accent Color:** Elegant forest/neon green theme indicating active terminal status.
* **Glassmorphic Panels:** UI containers utilize translucent colors (`rgba(...)`) layered with thin border lines (`1px solid rgba(255,255,255,0.08)`) to fit high-fidelity modern dashboards.
* **Focus Ring Effects:** Interactive input fields glow softly with neon green outlines upon focusing, providing clean interactive visual guides.
