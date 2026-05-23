document.addEventListener('DOMContentLoaded', () => {
  // --- DATABASE & STATE ---
  const MENU_ITEMS = [
    // Breakfast
    { name: "Masala Dosa", price: 60.00, category: "breakfast", icon: "🥞" },
    { name: "Idli (2 pcs)", price: 30.00, category: "breakfast", icon: "⚪" },
    { name: "Vada (1 pc)", price: 20.00, category: "breakfast", icon: "🍩" },
    { name: "Poori (2 pcs)", price: 45.00, category: "breakfast", icon: "🫓" },
    // Starters
    { name: "Paneer Tikka", price: 180.00, category: "starters", icon: "🍢" },
    { name: "Gobi Manchurian", price: 120.00, category: "starters", icon: "🥦" },
    { name: "Veg Spring Roll", price: 100.00, category: "starters", icon: "🌯" },
    { name: "French Fries", price: 80.00, category: "starters", icon: "🍟" },
    // Mains
    { name: "Veg Biryani", price: 150.00, category: "mains", icon: "🍛" },
    { name: "Roti (1 pc)", price: 25.00, category: "mains", icon: "🫓" },
    { name: "Paneer Butter Masala", price: 180.00, category: "mains", icon: "🥣" },
    { name: "Dal Tadka", price: 110.00, category: "mains", icon: "🍲" },
    { name: "Veg Fried Rice", price: 130.00, category: "mains", icon: "🍚" },
    // Beverages
    { name: "Coffee", price: 20.00, category: "beverages", icon: "☕" },
    { name: "Tea", price: 15.00, category: "beverages", icon: "🍵" },
    { name: "Fruit Juice", price: 50.00, category: "beverages", icon: "🥤" },
    { name: "Cold Milkshake", price: 70.00, category: "beverages", icon: "🥛" }
  ];

  // Default Terminal Configurations & Master Data
  const DEFAULT_HOTELS = [
    {
      id: "vvce-hotel",
      name: "VVCE Restaurant",
      tagline: "Vidyavardhaka College of Engineering Campus",
      address: "Gokulam 3rd Stage, Mysuru, Karnataka 570002",
      contact: "Ph: 0821-4276200 | info@vvce.ac.in",
      upi: "vvcehotel@upi",
      discount: 20,
      gst: 5,
      gas: 5
    },
    {
      id: "vvce-elite",
      name: "VVCE Elite Bistro",
      tagline: "Premium Dining & Lounge",
      address: "Jayalakshmipuram, Mysuru, Karnataka 570012",
      contact: "Ph: 0821-4276300 | elite@vvce.ac.in",
      upi: "vvceelite@upi",
      discount: 10,
      gst: 18,
      gas: 0
    }
  ];

  const DEFAULT_EMPLOYEES = [
    { id: "e1", hotelId: "vvce-hotel", name: "Ramesh Kumar", role: "Chef", salary: 35000, status: "Paid" },
    { id: "e2", hotelId: "vvce-hotel", name: "Suresh Patil", role: "Assistant Chef", salary: 22000, status: "Paid" },
    { id: "e3", hotelId: "vvce-hotel", name: "Anjali Rao", role: "Cashier", salary: 15000, status: "Due" },
    { id: "e4", hotelId: "vvce-hotel", name: "Vikram Singh", role: "Waiter", salary: 12000, status: "Paid" },
    { id: "e5", hotelId: "vvce-hotel", name: "Sunitha M.", role: "Cleaner", salary: 10000, status: "Due" },
    { id: "e6", hotelId: "vvce-elite", name: "Chef Ronald", role: "Head Chef", salary: 50000, status: "Paid" },
    { id: "e7", hotelId: "vvce-elite", name: "David Miller", role: "Barista", salary: 25000, status: "Due" },
    { id: "e8", hotelId: "vvce-elite", name: "Meera Nair", role: "Cashier", salary: 18000, status: "Paid" },
    { id: "e9", hotelId: "vvce-elite", name: "Karan Sharma", role: "Server", salary: 14000, status: "Due" }
  ];

  const DEFAULT_EXPENSES = [
    { id: "ex1", hotelId: "vvce-hotel", name: "Electricity Bill", amount: 4500, timestamp: Date.now() },
    { id: "ex2", hotelId: "vvce-hotel", name: "Water Supplies", amount: 1200, timestamp: Date.now() - 86400000 },
    { id: "ex3", hotelId: "vvce-elite", name: "Rent & Licensing", amount: 20000, timestamp: Date.now() }
  ];

  let config = {
    discount: 20,
    gst: 5,
    gas: 5,
    upi: "vvcehotel@upi"
  };

  let hotels = [];
  let currentHotelId = "vvce-hotel";
  let employees = [];
  let expenses = [];
  let transactions = [];
  let currentInvoiceNum = ""; // Holds compiled invoice number

  // --- ELEMENTS SELECTION ---
  const form = document.getElementById('billing-form');
  const btnGenerateFields = document.getElementById('btn-generate-fields');
  const itemsTbody = document.getElementById('items-tbody');
  const btnAddItemRow = document.getElementById('btn-add-item-row');
  const btnGenerateBill = document.getElementById('btn-generate-bill');
  const btnReset = document.getElementById('btn-reset');
  const billPanel = document.getElementById('bill-panel');
  const btnPrint = document.getElementById('btn-print');

  // Form Inputs
  const customerName = document.getElementById('customer-name');
  const phoneNumber = document.getElementById('phone-number');
  const numItemsInput = document.getElementById('num-items');
  const orderType = document.getElementById('order-type');
  const tableGroup = document.getElementById('table-group');
  const tableNum = document.getElementById('table-num');
  const deliveryGroup = document.getElementById('delivery-group');
  const deliveryApp = document.getElementById('delivery-app');
  const paymentMethod = document.getElementById('payment-method');

  // Error spans
  const nameError = document.getElementById('name-error');
  const phoneError = document.getElementById('phone-error');
  const itemsError = document.getElementById('items-error');

  // Header and Clock widgets
  const clockTime = document.getElementById('clock-time');
  const clockDate = document.getElementById('clock-date');

  // Analytics Widgets
  const analyticsBanner = document.getElementById('analytics-banner');
  const analyticsToggle = document.getElementById('analytics-toggle');
  const statRevenue = document.getElementById('stat-revenue');
  const statOrders = document.getElementById('stat-orders');
  const statTopItem = document.getElementById('stat-top-item');
  const statDiscounts = document.getElementById('stat-discounts');

  // Quick Menu & Search
  const quickMenuContainer = document.getElementById('quick-menu-container');
  const menuSearch = document.getElementById('menu-search');
  const categoryTabs = document.querySelectorAll('.category-tab');

  // Settings Modal Elements
  const settingsModal = document.getElementById('settings-modal');
  const btnOpenSettings = document.getElementById('btn-open-settings');
  const btnCloseSettings = document.getElementById('btn-close-settings');
  const btnCancelSettings = document.getElementById('btn-cancel-settings');
  const btnSaveSettings = document.getElementById('btn-save-settings');
  const setDiscountInput = document.getElementById('set-discount');
  const setGstInput = document.getElementById('set-gst');
  const setGasInput = document.getElementById('set-gas');
  const setUpiInput = document.getElementById('set-upi');

  // History Drawer Elements
  const historyDrawer = document.getElementById('history-drawer');
  const historyDrawerOverlay = document.getElementById('history-drawer-overlay');
  const btnOpenHistory = document.getElementById('btn-open-history');
  const btnCloseHistory = document.getElementById('btn-close-history');
  const historySearch = document.getElementById('history-search');
  const historyList = document.getElementById('history-list');

  // Receipt Preview Elements
  const rcptInvoiceNum = document.getElementById('rcpt-invoice-num');
  const rcptDateText = document.getElementById('rcpt-date-text');
  const rcptTimeText = document.getElementById('rcpt-time-text');
  const rcptOrderType = document.getElementById('rcpt-order-type');
  const rcptTableRow = document.getElementById('rcpt-table-row');
  const rcptTableNumSpan = document.getElementById('rcpt-table-num');
  const rcptDeliveryRow = document.getElementById('rcpt-delivery-row');
  const rcptDeliveryApp = document.getElementById('rcpt-delivery-app');
  const receiptItems = document.getElementById('receipt-items');
  const rcptDiscountLbl = document.getElementById('rcpt-discount-lbl');
  const rcptGstLbl = document.getElementById('rcpt-gst-lbl');
  const rcptCgstLbl = document.getElementById('rcpt-cgst-lbl');
  const rcptSgstLbl = document.getElementById('rcpt-sgst-lbl');
  const rcptGasLbl = document.getElementById('rcpt-gas-lbl');
  const rcptPayMethod = document.getElementById('rcpt-pay-method');
  const rcptQrWrapper = document.getElementById('receipt-qr-wrapper');
  const rcptQrImg = document.getElementById('receipt-qr-img');
  const rcptQrUpiId = document.getElementById('receipt-qr-upi-id');
  const rcptBarcodeVal = document.getElementById('rcpt-barcode-val');
  const rcptHotelName = document.getElementById('rcpt-hotel-name');
  const rcptHotelTagline = document.getElementById('rcpt-hotel-tagline');
  const rcptHotelAddress = document.getElementById('rcpt-hotel-address');
  const rcptHotelContact = document.getElementById('rcpt-hotel-contact');

  // --- OWNER DASHBOARD ELEMENTS ---
  const tabTerminalBtn = document.getElementById('tab-terminal-btn');
  const tabOwnerBtn = document.getElementById('tab-owner-btn');
  const terminalView = document.getElementById('terminal-view');
  const ownerView = document.getElementById('owner-view');
  const brandTitle = document.getElementById('brand-title');

  // Sidebar elements
  const ownerHotelsList = document.getElementById('owner-hotels-list');
  const hotelsCount = document.getElementById('hotels-count');
  const btnShowAddHotel = document.getElementById('btn-show-add-hotel');

  // Main Dashboard elements
  const dashboardActiveHotelName = document.getElementById('dashboard-active-hotel-name');
  
  // Finance KPIs
  const financeRevenue = document.getElementById('finance-revenue');
  const financeExpenses = document.getElementById('finance-expenses');
  const financeProfit = document.getElementById('finance-profit');
  const profitKpiCard = document.getElementById('profit-kpi-card');
  const svgChartWrapper = document.getElementById('svg-chart-wrapper');

  // Expense Logger Form
  const expenseForm = document.getElementById('expense-form');
  const expenseName = document.getElementById('expense-name');
  const expenseAmount = document.getElementById('expense-amount');
  const expensesTbody = document.getElementById('expenses-tbody');

  // Salaries elements
  const salariesPaidCount = document.getElementById('salaries-paid-count');
  const salariesDueCount = document.getElementById('salaries-due-count');
  const salariesDueLiability = document.getElementById('salaries-due-liability');
  const btnShowAddEmployee = document.getElementById('btn-show-add-employee');
  const salariesTbody = document.getElementById('salaries-tbody');

  // Modals
  const addHotelModal = document.getElementById('add-hotel-modal');
  const btnCloseAddHotel = document.getElementById('btn-close-add-hotel');
  const btnCancelAddHotel = document.getElementById('btn-cancel-add-hotel');
  const addHotelForm = document.getElementById('add-hotel-form');

  const addEmployeeModal = document.getElementById('add-employee-modal');
  const btnCloseAddEmployee = document.getElementById('btn-close-add-employee');
  const btnCancelAddEmployee = document.getElementById('btn-cancel-add-employee');
  const addEmployeeForm = document.getElementById('add-employee-form');

  // --- INITIAL SETUP ---
  const formatCurrency = (amount) => `₹${amount.toFixed(2)}`;

  // Load Saved State & Configurations
  const loadState = () => {
    // Load Hotels
    const savedHotels = localStorage.getItem('vvce_hotels');
    if (savedHotels) {
      try {
        hotels = JSON.parse(savedHotels);
      } catch (e) {
        console.error("Error parsing hotels", e);
        hotels = [...DEFAULT_HOTELS];
      }
    } else {
      hotels = [...DEFAULT_HOTELS];
      localStorage.setItem('vvce_hotels', JSON.stringify(hotels));
    }

    // Load Active Hotel ID
    currentHotelId = localStorage.getItem('vvce_current_hotel_id') || 'vvce-hotel';
    if (!hotels.some(h => h.id === currentHotelId)) {
      currentHotelId = hotels[0].id;
    }
    localStorage.setItem('vvce_current_hotel_id', currentHotelId);

    // Update Brand Title
    const activeHotel = hotels.find(h => h.id === currentHotelId) || hotels[0];
    brandTitle.textContent = activeHotel.name.toUpperCase();

    // Load Employees
    const savedEmployees = localStorage.getItem('vvce_employees');
    if (savedEmployees) {
      try {
        employees = JSON.parse(savedEmployees);
      } catch (e) {
        console.error("Error parsing employees", e);
        employees = [...DEFAULT_EMPLOYEES];
      }
    } else {
      employees = [...DEFAULT_EMPLOYEES];
      localStorage.setItem('vvce_employees', JSON.stringify(employees));
    }

    // Load Expenses
    const savedExpenses = localStorage.getItem('vvce_expenses');
    if (savedExpenses) {
      try {
        expenses = JSON.parse(savedExpenses);
      } catch (e) {
        console.error("Error parsing expenses", e);
        expenses = [...DEFAULT_EXPENSES];
      }
    } else {
      expenses = [...DEFAULT_EXPENSES];
      localStorage.setItem('vvce_expenses', JSON.stringify(expenses));
    }
  };

  const loadConfigurations = () => {
    const activeHotel = hotels.find(h => h.id === currentHotelId) || hotels[0];
    config = {
      discount: activeHotel.discount,
      gst: activeHotel.gst,
      gas: activeHotel.gas,
      upi: activeHotel.upi
    };

    // Populate settings inputs
    setDiscountInput.value = config.discount;
    setGstInput.value = config.gst;
    setGasInput.value = config.gas;
    setUpiInput.value = config.upi;

    // Apply configuration labels to receipt
    rcptDiscountLbl.textContent = config.discount;
    rcptGstLbl.textContent = config.gst.toFixed(1);
    rcptCgstLbl.textContent = (config.gst / 2).toFixed(2);
    rcptSgstLbl.textContent = (config.gst / 2).toFixed(2);
    rcptGasLbl.textContent = config.gas.toFixed(1);
    rcptQrUpiId.textContent = config.upi;

    // Apply active hotel info to receipt header
    rcptHotelName.textContent = activeHotel.name.toUpperCase();
    rcptHotelTagline.textContent = activeHotel.tagline;
    rcptHotelAddress.textContent = activeHotel.address;
    rcptHotelContact.textContent = activeHotel.contact;
  };

  // Load Past Transactions (with auto migration for hotelId)
  const loadTransactions = () => {
    const savedTransactions = localStorage.getItem('vvce_transactions');
    let migrated = false;
    if (savedTransactions) {
      try {
        transactions = JSON.parse(savedTransactions);
        transactions.forEach(t => {
          if (!t.hotelId) {
            t.hotelId = "vvce-hotel";
            migrated = true;
          }
        });
        if (migrated) {
          localStorage.setItem('vvce_transactions', JSON.stringify(transactions));
        }
      } catch (e) {
        console.error("Error parsing transactions", e);
      }
    }
  };

  // Save Transaction to local db
  const saveTransaction = (invoice) => {
    transactions.push(invoice);
    localStorage.setItem('vvce_transactions', JSON.stringify(transactions));
    updateAnalytics();
    renderHistory();
    if (!ownerView.classList.contains('hidden')) {
      renderOwnerDashboard();
    }
  };

  // Update Sales Analytics (scoped to current active hotel)
  const updateAnalytics = () => {
    let totalRevenue = 0;
    let totalDiscounts = 0;
    const itemCounts = {};

    const hotelTransactions = transactions.filter(t => t.hotelId === currentHotelId);

    hotelTransactions.forEach(t => {
      totalRevenue += t.finalBill;
      totalDiscounts += t.saved;
      t.items.forEach(item => {
        itemCounts[item.name] = (itemCounts[item.name] || 0) + item.qty;
      });
    });

    // Find top item
    let topItem = "None";
    let maxQty = 0;
    for (const [name, qty] of Object.entries(itemCounts)) {
      if (qty > maxQty) {
        maxQty = qty;
        topItem = name;
      }
    }

    statRevenue.textContent = formatCurrency(totalRevenue);
    statOrders.textContent = hotelTransactions.length;
    statTopItem.textContent = topItem + (maxQty > 0 ? ` (${maxQty})` : '');
    statDiscounts.textContent = formatCurrency(totalDiscounts);
  };

  // --- DIGITAL CLOCK ---
  const updateClock = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    clockTime.textContent = `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    clockDate.textContent = now.toLocaleDateString('en-US', options);
  };
  setInterval(updateClock, 1000);
  updateClock();

  // --- COLLAPSIBLE ANALYTICS ---
  analyticsToggle.addEventListener('click', () => {
    analyticsBanner.classList.toggle('collapsed');
  });

  // --- ORDER TYPES & TABLES CONTROLS ---
  orderType.addEventListener('change', () => {
    if (orderType.value === "Dine-In") {
      tableGroup.style.display = "";
      rcptTableRow.style.display = "";
      deliveryGroup.style.display = "none";
      rcptDeliveryRow.style.display = "none";
    } else if (orderType.value === "Delivery") {
      tableGroup.style.display = "none";
      rcptTableRow.style.display = "none";
      deliveryGroup.style.display = "";
      rcptDeliveryRow.style.display = "";
    } else {
      tableGroup.style.display = "none";
      rcptTableRow.style.display = "none";
      deliveryGroup.style.display = "none";
      rcptDeliveryRow.style.display = "none";
    }
  });

  // --- MENU RENDER & SEARCH ---
  const renderMenu = (filterCat = "all", search = "") => {
    quickMenuContainer.innerHTML = '';
    const query = search.trim().toLowerCase();

    const filtered = MENU_ITEMS.filter(item => {
      const matchCat = filterCat === "all" || item.category === filterCat;
      const matchSearch = item.name.toLowerCase().includes(query);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      quickMenuContainer.innerHTML = `<span style="grid-column: 1/-1; text-align: center; color: var(--text-muted); font-size: 0.8rem; padding: 1rem 0;">No matching items found</span>`;
      return;
    }

    filtered.forEach(item => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'menu-item-btn';
      btn.setAttribute('data-name', item.name);
      btn.setAttribute('data-price', item.price);
      
      btn.innerHTML = `
        <span class="item-icon">${item.icon}</span>
        <span class="item-info">
          <span class="name" title="${item.name}">${item.name}</span>
          <span class="price">${formatCurrency(item.price)}</span>
        </span>
      `;

      btn.addEventListener('click', () => {
        addMenuItemToTable(item.name, item.price);
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => { btn.style.transform = ''; }, 100);
      });

      quickMenuContainer.appendChild(btn);
    });
  };

  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderMenu(tab.getAttribute('data-category'), menuSearch.value);
    });
  });

  menuSearch.addEventListener('input', () => {
    const activeTab = document.querySelector('.category-tab.active');
    renderMenu(activeTab.getAttribute('data-category'), menuSearch.value);
  });

  // --- DYNAMIC ITEMS TABLE WORKFLOW ---
  const addMenuItemToTable = (name, price) => {
    const rows = itemsTbody.querySelectorAll('.item-row');
    let found = false;

    for (let i = 0; i < rows.length; i++) {
      const nameInput = rows[i].querySelector('.item-name');
      const priceInput = rows[i].querySelector('.item-price');
      const qtyInput = rows[i].querySelector('.item-qty');

      if (nameInput.value.trim().toLowerCase() === name.toLowerCase()) {
        const qty = parseInt(qtyInput.value) || 0;
        qtyInput.value = qty + 1;
        qtyInput.dispatchEvent(new Event('input'));
        found = true;
        break;
      }
    }

    if (!found) {
      // Find empty row
      let emptyRow = null;
      for (let i = 0; i < rows.length; i++) {
        const nameInput = rows[i].querySelector('.item-name');
        const priceInput = rows[i].querySelector('.item-price');
        if (!nameInput.value.trim() && !priceInput.value) {
          emptyRow = rows[i];
          break;
        }
      }

      if (emptyRow) {
        emptyRow.querySelector('.item-name').value = name;
        emptyRow.querySelector('.item-price').value = price;
        emptyRow.querySelector('.item-qty').value = 1;
        emptyRow.querySelector('.item-name').dispatchEvent(new Event('input'));
      } else {
        createItemRow(name, price, 1);
      }
    }
  };

  const createItemRow = (name = "", price = "", qty = 1) => {
    const tr = document.createElement('tr');
    tr.className = 'item-row';
    
    tr.innerHTML = `
      <td>
        <input type="text" class="item-name" placeholder="Enter food name" value="${name}" required>
      </td>
      <td>
        <input type="number" class="item-price" placeholder="0.00" min="0" step="0.01" value="${price}" required>
      </td>
      <td>
        <input type="number" class="item-qty" placeholder="1" min="1" value="${qty}" required>
      </td>
      <td class="row-total-cell">
        ₹0.00
      </td>
      <td style="text-align: center;">
        <button type="button" class="btn-delete-row" title="Remove Item">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </button>
      </td>
    `;

    const nameInput = tr.querySelector('.item-name');
    const priceInput = tr.querySelector('.item-price');
    const qtyInput = tr.querySelector('.item-qty');
    const deleteBtn = tr.querySelector('.btn-delete-row');

    const updateRowTotal = () => {
      const priceVal = parseFloat(priceInput.value) || 0;
      const qtyVal = parseInt(qtyInput.value) || 0;
      const total = priceVal * qtyVal;
      tr.querySelector('.row-total-cell').textContent = formatCurrency(total);
      
      if (nameInput.value.trim()) nameInput.style.borderColor = "";
      if (priceInput.value && priceVal >= 0) priceInput.style.borderColor = "";
      if (qtyInput.value && qtyVal >= 1) qtyInput.style.borderColor = "";
      
      recalculateBill();
      checkFormValidity();
    };

    nameInput.addEventListener('input', updateRowTotal);
    priceInput.addEventListener('input', updateRowTotal);
    qtyInput.addEventListener('input', updateRowTotal);

    deleteBtn.addEventListener('click', () => {
      tr.remove();
      if (itemsTbody.children.length === 0) {
        createItemRow();
      }
      recalculateBill();
      checkFormValidity();
    });

    itemsTbody.appendChild(tr);
    updateRowTotal();
  };

  // Add custom lines
  btnAddItemRow.addEventListener('click', () => {
    createItemRow();
    checkFormValidity();
  });

  // Multiple generator click
  btnGenerateFields.addEventListener('click', () => {
    const count = parseInt(numItemsInput.value);
    if (isNaN(count) || count < 1 || count > 20) {
      itemsError.textContent = "Please enter a valid count (1-20).";
      return;
    }
    itemsError.textContent = "";
    for (let i = 0; i < count; i++) {
      createItemRow();
    }
    numItemsInput.value = "";
    checkFormValidity();
  });

  // --- CALCULATION ENGINE ---
  const recalculateBill = () => {
    const rows = itemsTbody.querySelectorAll('.item-row');
    let subtotal = 0;

    rows.forEach(row => {
      const name = row.querySelector('.item-name').value.trim();
      const price = parseFloat(row.querySelector('.item-price').value);
      const qty = parseInt(row.querySelector('.item-qty').value);

      if (name && !isNaN(price) && price >= 0 && !isNaN(qty) && qty >= 1) {
        subtotal += price * qty;
      }
    });

    // Config-driven rates calculations
    const discountAmount = subtotal * (config.discount / 100);
    const discountedTotal = subtotal - discountAmount;
    const gst = subtotal * (config.gst / 100);
    const cgst = subtotal * (config.gst / 2 / 100);
    const sgst = subtotal * (config.gst / 2 / 100);
    const gasCharge = subtotal * (config.gas / 100);
    const finalBill = discountedTotal + gst + cgst + sgst + gasCharge;

    document.querySelectorAll('#rcpt-total-cost').forEach(el => el.textContent = formatCurrency(subtotal));
    document.querySelectorAll('#rcpt-discount').forEach(el => el.textContent = formatCurrency(discountedTotal));
    document.querySelectorAll('#rcpt-gst').forEach(el => el.textContent = formatCurrency(gst));
    document.querySelectorAll('#rcpt-cgst').forEach(el => el.textContent = formatCurrency(cgst));
    document.querySelectorAll('#rcpt-sgst').forEach(el => el.textContent = formatCurrency(sgst));
    document.querySelectorAll('#rcpt-gas').forEach(el => el.textContent = formatCurrency(gasCharge));
    document.querySelectorAll('#rcpt-final-bill').forEach(el => el.textContent = formatCurrency(finalBill));
    document.querySelectorAll('#rcpt-saved').forEach(el => el.textContent = formatCurrency(discountAmount));

    return {
      subtotal,
      discountAmount,
      discountedTotal,
      gst,
      cgst,
      sgst,
      gasCharge,
      finalBill
    };
  };

  // --- INPUT VALIDATIONS ---
  phoneNumber.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
    validatePhoneRealtime();
    checkFormValidity();
  });

  customerName.addEventListener('input', () => {
    validateNameRealtime();
    checkFormValidity();
  });

  const validateNameRealtime = () => {
    if (customerName.value.trim().length > 0) {
      nameError.textContent = "";
      customerName.style.borderColor = "var(--border-subtle)";
      return true;
    } else {
      customerName.style.borderColor = "rgba(255, 255, 255, 0.08)";
      return false;
    }
  };

  const validatePhoneRealtime = () => {
    const val = phoneNumber.value;
    if (val.length === 10) {
      phoneError.textContent = "";
      phoneNumber.style.borderColor = "var(--border-subtle)";
      return true;
    } else if (val.length > 0 && val.length < 10) {
      phoneError.textContent = "Phone number must be exactly 10 digits.";
      phoneNumber.style.borderColor = "var(--error)";
      return false;
    } else {
      phoneNumber.style.borderColor = "rgba(255, 255, 255, 0.08)";
      return false;
    }
  };

  const checkFormValidity = () => {
    const isNameValid = customerName.value.trim().length > 0;
    const isPhoneValid = /^\d{10}$/.test(phoneNumber.value);
    const rows = itemsTbody.querySelectorAll('.item-row');
    let areItemsValid = rows.length > 0;

    rows.forEach(row => {
      const name = row.querySelector('.item-name').value.trim();
      const price = parseFloat(row.querySelector('.item-price').value);
      const qty = parseInt(row.querySelector('.item-qty').value);

      if (!name || isNaN(price) || price < 0 || isNaN(qty) || qty < 1) {
        areItemsValid = false;
      }
    });

    btnGenerateBill.disabled = !(isNameValid && isPhoneValid && areItemsValid);
  };

  // --- BILL COMPILING / PERSISTENCE ---
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    nameError.textContent = "";
    phoneError.textContent = "";
    itemsError.textContent = "";

    let isValid = true;

    if (!customerName.value.trim()) {
      nameError.textContent = "Customer name is required.";
      customerName.style.borderColor = "var(--error)";
      isValid = false;
    }
    if (!/^\d{10}$/.test(phoneNumber.value)) {
      phoneError.textContent = "Please enter a valid 10-digit phone number.";
      phoneNumber.style.borderColor = "var(--error)";
      isValid = false;
    }

    const rows = itemsTbody.querySelectorAll('.item-row');
    let itemsValid = true;
    if (rows.length === 0) {
      itemsError.textContent = "At least one item is required.";
      isValid = false;
    }

    const itemsData = [];
    rows.forEach(row => {
      const nameInput = row.querySelector('.item-name');
      const priceInput = row.querySelector('.item-price');
      const qtyInput = row.querySelector('.item-qty');

      const name = nameInput.value.trim();
      const price = parseFloat(priceInput.value);
      const qty = parseInt(qtyInput.value);

      let rowValid = true;
      if (!name) { nameInput.style.borderColor = "var(--error)"; rowValid = false; }
      if (isNaN(price) || price < 0) { priceInput.style.borderColor = "var(--error)"; rowValid = false; }
      if (isNaN(qty) || qty < 1) { qtyInput.style.borderColor = "var(--error)"; rowValid = false; }

      if (!rowValid) {
        itemsValid = false;
      } else {
        itemsData.push({ name, price, qty, total: price * qty });
      }
    });

    if (!itemsValid) {
      itemsError.textContent = "Please fix highlighted fields in the items table.";
      isValid = false;
    }

    if (!isValid) return;

    // Calculations Compile
    const calc = recalculateBill();

    // Sequential Invoice generation
    let lastInvoice = parseInt(localStorage.getItem('vvce_last_invoice') || '1000') + 1;
    localStorage.setItem('vvce_last_invoice', lastInvoice.toString());
    currentInvoiceNum = `#VVCE-${lastInvoice}`;

    // Timestamps
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB'); // DD/MM/YYYY
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const timeStr = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;

    // Create Invoice Transaction Object
    const newInvoiceObj = {
      hotelId: currentHotelId,
      invoiceNum: currentInvoiceNum,
      customerName: customerName.value.trim(),
      phoneNumber: phoneNumber.value,
      orderType: orderType.value,
      tableNum: orderType.value === "Dine-In" ? tableNum.value : "N/A",
      deliveryApp: orderType.value === "Delivery" ? deliveryApp.value : "N/A",
      paymentMethod: paymentMethod.value,
      items: itemsData,
      subtotal: calc.subtotal,
      discount: calc.discountedTotal,
      gst: calc.gst,
      cgst: calc.cgst,
      sgst: calc.sgst,
      gas: calc.gasCharge,
      finalBill: calc.finalBill,
      saved: calc.discountAmount,
      date: dateStr,
      time: timeStr,
      timestamp: Date.now()
    };

    // Save and update analytics
    saveTransaction(newInvoiceObj);

    // Render receipt visually
    populateReceipt(newInvoiceObj);

    // Display receipt
    billPanel.classList.remove('hidden');
    if (window.innerWidth <= 960) {
      billPanel.scrollIntoView({ behavior: 'smooth' });
    }

    // Receipt Slide animation
    const receiptCard = document.getElementById('receipt-card');
    receiptCard.style.animation = 'none';
    void receiptCard.offsetWidth; // trigger reflow
    receiptCard.style.animation = 'receipt-slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards';
  });

  // Populate Receipt UI Card
  const populateReceipt = (invoice) => {
    rcptInvoiceNum.textContent = invoice.invoiceNum;
    rcptDateText.textContent = invoice.date;
    rcptTimeText.textContent = invoice.time;
    rcptOrderType.textContent = invoice.orderType;
    rcptTableNumSpan.textContent = `Table ${invoice.tableNum}`;
    rcptDeliveryApp.textContent = invoice.deliveryApp || "N/A";
    rcptPayMethod.textContent = invoice.paymentMethod;

    if (invoice.orderType === "Dine-In") {
      rcptTableRow.style.display = "";
      rcptDeliveryRow.style.display = "none";
    } else if (invoice.orderType === "Delivery") {
      rcptTableRow.style.display = "none";
      rcptDeliveryRow.style.display = "";
    } else {
      rcptTableRow.style.display = "none";
      rcptDeliveryRow.style.display = "none";
    }

    // Items table rows
    receiptItems.innerHTML = '';
    invoice.items.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="text-align: left;">${item.name}</td>
        <td style="text-align: right;">${formatCurrency(item.price)}</td>
        <td style="text-align: right;">${item.qty}</td>
        <td style="text-align: right;">${formatCurrency(item.total)}</td>
      `;
      receiptItems.appendChild(tr);
    });

    // Populate calculations values
    document.querySelectorAll('#rcpt-total-cost').forEach(el => el.textContent = formatCurrency(invoice.subtotal));
    document.querySelectorAll('#rcpt-discount').forEach(el => el.textContent = formatCurrency(invoice.discount));
    document.querySelectorAll('#rcpt-gst').forEach(el => el.textContent = formatCurrency(invoice.gst));
    document.querySelectorAll('#rcpt-cgst').forEach(el => el.textContent = formatCurrency(invoice.cgst));
    document.querySelectorAll('#rcpt-sgst').forEach(el => el.textContent = formatCurrency(invoice.sgst));
    document.querySelectorAll('#rcpt-gas').forEach(el => el.textContent = formatCurrency(invoice.gas));
    document.querySelectorAll('#rcpt-final-bill').forEach(el => el.textContent = formatCurrency(invoice.finalBill));
    document.querySelectorAll('#rcpt-saved').forEach(el => el.textContent = formatCurrency(invoice.saved));

    document.getElementById('rcpt-cname').textContent = invoice.customerName;
    document.getElementById('rcpt-cphone').textContent = invoice.phoneNumber;
    document.getElementById('rcpt-cname-footer').textContent = invoice.customerName.toUpperCase();

    // Barcode value sync
    rcptBarcodeVal.textContent = `VVCE-POS-${invoice.invoiceNum.replace('#', '')}`;

    // UPI QR Code generator
    if (invoice.paymentMethod === "UPI") {
      rcptQrWrapper.classList.remove('hidden');
      rcptQrImg.src = "Screenshot_20260522_094545_Gallery.jpg";
      rcptQrUpiId.textContent = config.upi;
    } else {
      rcptQrWrapper.classList.add('hidden');
      rcptQrImg.src = "";
    }
  };

  // --- INVOICE HISTORY DRAWER WORKFLOW ---
  const openHistoryDrawer = () => {
    historyDrawer.classList.remove('hidden');
    historyDrawerOverlay.classList.remove('hidden');
    renderHistory();
  };

  const closeHistoryDrawer = () => {
    historyDrawer.classList.add('hidden');
    historyDrawerOverlay.classList.add('hidden');
  };

  const renderHistory = (searchVal = "") => {
    historyList.innerHTML = '';
    const query = searchVal.trim().toLowerCase();

    // Filter transactions by active hotel
    const hotelTransactions = transactions.filter(t => t.hotelId === currentHotelId);

    // Sort transactions latest first
    const sorted = [...hotelTransactions].sort((a, b) => b.timestamp - a.timestamp);

    const filtered = sorted.filter(t => {
      return t.customerName.toLowerCase().includes(query) ||
             t.phoneNumber.includes(query) ||
             t.invoiceNum.toLowerCase().includes(query);
    });

    if (filtered.length === 0) {
      historyList.innerHTML = `<div class="no-history-msg">No invoices found</div>`;
      return;
    }

    filtered.forEach(invoice => {
      const card = document.createElement('div');
      card.className = 'history-invoice-card';
      
      card.innerHTML = `
        <div class="history-card-header">
          <span class="history-bill-num">${invoice.invoiceNum}</span>
          <span class="history-bill-date">${invoice.date} ${invoice.time}</span>
        </div>
        <div class="history-cust-name">${invoice.customerName}</div>
        <div class="history-card-footer">
          <span>Items: ${invoice.items.reduce((acc, item) => acc + item.qty, 0)}</span>
          <span class="history-bill-amount">${formatCurrency(invoice.finalBill)}</span>
        </div>
      `;

      card.addEventListener('click', () => {
        populateReceipt(invoice);
        billPanel.classList.remove('hidden');
        billPanel.scrollIntoView({ behavior: 'smooth' });
        closeHistoryDrawer();
      });

      historyList.appendChild(card);
    });
  };

  btnOpenHistory.addEventListener('click', openHistoryDrawer);
  btnCloseHistory.addEventListener('click', closeHistoryDrawer);
  historyDrawerOverlay.addEventListener('click', closeHistoryDrawer);
  historySearch.addEventListener('input', () => {
    renderHistory(historySearch.value);
  });

  // --- OWNER DASHBOARD WORKFLOW ---
  
  // Render Hotels list inside the sidebar
  const renderHotelsList = () => {
    ownerHotelsList.innerHTML = '';
    hotelsCount.textContent = hotels.length;
    
    hotels.forEach(h => {
      const card = document.createElement('div');
      card.className = `hotel-item-card ${h.id === currentHotelId ? 'active' : ''}`;
      card.innerHTML = `
        <h5>${h.name}</h5>
        <p>${h.address}</p>
        ${h.id === currentHotelId ? '<span class="active-indicator">Active</span>' : ''}
      `;
      card.addEventListener('click', () => {
        if (h.id !== currentHotelId) {
          selectHotel(h.id);
        }
      });
      ownerHotelsList.appendChild(card);
    });
  };

  // Switch Active Hotel
  const selectHotel = (hotelId) => {
    currentHotelId = hotelId;
    localStorage.setItem('vvce_current_hotel_id', currentHotelId);
    
    // Reload configurations labels and sync values
    loadConfigurations();
    
    // Recalculate bill
    recalculateBill();
    
    // Sync Brand Title and Dashboard active name
    const activeHotel = hotels.find(h => h.id === currentHotelId) || hotels[0];
    brandTitle.textContent = activeHotel.name.toUpperCase();
    
    // Refresh Analytics, History and Dashboard
    updateAnalytics();
    renderHistory();
    renderOwnerDashboard();
  };

  // Render Salaries ledger
  const renderSalariesLedger = () => {
    salariesTbody.innerHTML = '';
    const hotelEmployees = employees.filter(e => e.hotelId === currentHotelId);
    
    let paidCount = 0;
    let dueCount = 0;
    let dueLiability = 0;

    hotelEmployees.forEach(e => {
      if (e.status === "Paid") {
        paidCount++;
      } else {
        dueCount++;
        dueLiability += e.salary;
      }

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong>${e.name}</strong></td>
        <td class="emp-role">${e.role}</td>
        <td class="emp-salary" style="text-align: right;">${formatCurrency(e.salary)}</td>
        <td style="text-align: center;">
          <span class="badge-status ${e.status.toLowerCase()}">${e.status}</span>
        </td>
        <td style="text-align: center;">
          <button type="button" class="btn-toggle-salary" data-id="${e.id}">
            ${e.status === "Paid" ? "Mark Due" : "Mark Paid"}
          </button>
        </td>
      `;

      tr.querySelector('.btn-toggle-salary').addEventListener('click', () => {
        toggleEmployeeStatus(e.id);
      });

      salariesTbody.appendChild(tr);
    });

    salariesPaidCount.textContent = paidCount;
    salariesDueCount.textContent = dueCount;
    salariesDueLiability.textContent = formatCurrency(dueLiability);
  };

  // Toggle paid/due employee status
  const toggleEmployeeStatus = (empId) => {
    const emp = employees.find(e => e.id === empId);
    if (emp) {
      emp.status = emp.status === "Paid" ? "Due" : "Paid";
      localStorage.setItem('vvce_employees', JSON.stringify(employees));
      renderOwnerDashboard();
    }
  };

  // Render Financial Analytics & P&L
  const renderFinancialAnalytics = () => {
    // 1. Calculate Revenue
    const hotelTransactions = transactions.filter(t => t.hotelId === currentHotelId);
    const totalRevenue = hotelTransactions.reduce((acc, t) => acc + t.finalBill, 0);

    // 2. Calculate Salary Expenses (Paid salaries counted as expense)
    const hotelEmployees = employees.filter(e => e.hotelId === currentHotelId);
    const salariesExpense = hotelEmployees.filter(e => e.status === "Paid").reduce((acc, e) => acc + e.salary, 0);

    // 3. Miscellaneous Expenses
    const hotelExpenses = expenses.filter(ex => ex.hotelId === currentHotelId);
    const miscExpense = hotelExpenses.reduce((acc, ex) => acc + ex.amount, 0);

    const totalExpenses = salariesExpense + miscExpense;
    const netProfit = totalRevenue - totalExpenses;

    financeRevenue.textContent = formatCurrency(totalRevenue);
    financeExpenses.textContent = formatCurrency(totalExpenses);
    financeProfit.textContent = formatCurrency(netProfit);

    // Style Profit KPI Card based on positive/negative
    if (netProfit >= 0) {
      profitKpiCard.className = "kpi-card profit-kpi positive-profit";
    } else {
      profitKpiCard.className = "kpi-card profit-kpi negative-profit";
    }

    // Render Expenses Ledger
    renderExpensesLedger(hotelExpenses);

    // Render SVG P&L Chart
    drawFinancialChart(totalRevenue, totalExpenses);
  };

  // Render Logged Expenses Ledger
  const renderExpensesLedger = (hotelExpenses) => {
    expensesTbody.innerHTML = '';
    if (hotelExpenses.length === 0) {
      expensesTbody.innerHTML = `<tr><td colspan="3" style="text-align: center; color: var(--text-muted); font-size: 0.8rem; padding: 1rem 0;">No miscellaneous expenses logged</td></tr>`;
      return;
    }

    // Sort by timestamp latest first
    const sorted = [...hotelExpenses].sort((a, b) => b.timestamp - a.timestamp);

    sorted.forEach(ex => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${ex.name}</td>
        <td style="text-align: right; padding-right: 1.5rem; font-family: 'Share Tech Mono', monospace; font-weight: 600;">
          ${formatCurrency(ex.amount)}
        </td>
        <td style="text-align: center;">
          <button type="button" class="btn-delete-small" data-id="${ex.id}" title="Delete Expense">&times;</button>
        </td>
      `;

      tr.querySelector('.btn-delete-small').addEventListener('click', () => {
        deleteExpense(ex.id);
      });

      expensesTbody.appendChild(tr);
    });
  };

  // Delete logged expense
  const deleteExpense = (exId) => {
    expenses = expenses.filter(ex => ex.id !== exId);
    localStorage.setItem('vvce_expenses', JSON.stringify(expenses));
    renderOwnerDashboard();
  };

  // Draw Financial SVG double bar chart (Revenue vs Expenses)
  const drawFinancialChart = (revenue, expensesAmt) => {
    const maxVal = Math.max(revenue, expensesAmt, 1000); // Avoid division by zero
    const revenueHeight = (revenue / maxVal) * 110;
    const expensesHeight = (expensesAmt / maxVal) * 110;

    const revenueY = 130 - revenueHeight;
    const expensesY = 130 - expensesHeight;

    svgChartWrapper.innerHTML = `
      <svg width="100%" height="100%" viewBox="0 0 400 150" preserveAspectRatio="xMidYMid meet">
        <!-- Grid lines -->
        <line x1="40" y1="20" x2="380" y2="20" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
        <line x1="40" y1="75" x2="380" y2="75" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
        <line x1="40" y1="130" x2="380" y2="130" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" />
        
        <!-- Y-Axis Labels -->
        <text x="32" y="24" fill="var(--text-muted)" font-size="8" text-anchor="end">${formatCurrency(maxVal)}</text>
        <text x="32" y="79" fill="var(--text-muted)" font-size="8" text-anchor="end">${formatCurrency(maxVal / 2)}</text>
        <text x="32" y="134" fill="var(--text-muted)" font-size="8" text-anchor="end">₹0.00</text>
        
        <!-- Bar: Revenue -->
        <rect x="110" y="${revenueY}" width="45" height="${revenueHeight}" fill="url(#goldGradient)" rx="4" filter="url(#glowGold)" />
        <text x="132.5" y="${revenueY - 8}" fill="#fff" font-size="9" text-anchor="middle" font-weight="700">${formatCurrency(revenue)}</text>
        <text x="132.5" y="144" fill="var(--text-muted)" font-size="9" text-anchor="middle">Revenue</text>
        
        <!-- Bar: Expenses -->
        <rect x="235" y="${expensesY}" width="45" height="${expensesHeight}" fill="url(#redGradient)" rx="4" filter="url(#glowRed)" />
        <text x="257.5" y="${expensesY - 8}" fill="#fff" font-size="9" text-anchor="middle" font-weight="700">${formatCurrency(expensesAmt)}</text>
        <text x="257.5" y="144" fill="var(--text-muted)" font-size="9" text-anchor="middle">Expenses</text>
        
        <!-- Definitions for gradients & glows -->
        <defs>
          <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="var(--accent-gold-hover)" />
            <stop offset="100%" stop-color="var(--accent-gold-dark)" />
          </linearGradient>
          <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ef4444" />
            <stop offset="100%" stop-color="#991b1b" />
          </linearGradient>
          <filter id="glowGold" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="var(--accent-gold)" flood-opacity="0.2" />
          </filter>
          <filter id="glowRed" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#ef4444" flood-opacity="0.2" />
          </filter>
        </defs>
      </svg>
    `;
  };

  // Master Render Dashboard
  const renderOwnerDashboard = () => {
    const activeHotel = hotels.find(h => h.id === currentHotelId) || hotels[0];
    dashboardActiveHotelName.textContent = activeHotel.name;

    renderHotelsList();
    renderSalariesLedger();
    renderFinancialAnalytics();
  };

  // Add Hotel Modal Actions
  btnShowAddHotel.addEventListener('click', () => {
    addHotelModal.classList.remove('hidden');
  });

  const closeAddHotelModal = () => {
    addHotelModal.classList.add('hidden');
    addHotelForm.reset();
  };

  btnCloseAddHotel.addEventListener('click', closeAddHotelModal);
  btnCancelAddHotel.addEventListener('click', closeAddHotelModal);

  addHotelForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('hotel-name').value.trim();
    const tagline = document.getElementById('hotel-tagline').value.trim();
    const address = document.getElementById('hotel-address').value.trim();
    const contact = document.getElementById('hotel-contact').value.trim();
    const upi = document.getElementById('hotel-upi').value.trim();
    const discount = parseInt(document.getElementById('hotel-discount').value) || 0;
    const gst = parseFloat(document.getElementById('hotel-gst').value) || 0;
    const gas = parseFloat(document.getElementById('hotel-gas').value) || 0;

    const newHotel = {
      id: "hotel-" + Date.now(),
      name,
      tagline,
      address,
      contact,
      upi,
      discount,
      gst,
      gas
    };

    hotels.push(newHotel);
    localStorage.setItem('vvce_hotels', JSON.stringify(hotels));
    
    selectHotel(newHotel.id);
    closeAddHotelModal();
  });

  // Add Employee Modal Actions
  btnShowAddEmployee.addEventListener('click', () => {
    addEmployeeModal.classList.remove('hidden');
  });

  const closeAddEmployeeModal = () => {
    addEmployeeModal.classList.add('hidden');
    addEmployeeForm.reset();
  };

  btnCloseAddEmployee.addEventListener('click', closeAddEmployeeModal);
  btnCancelAddEmployee.addEventListener('click', closeAddEmployeeModal);

  addEmployeeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('emp-name').value.trim();
    const role = document.getElementById('emp-role').value.trim();
    const salary = parseInt(document.getElementById('emp-salary').value) || 0;
    const status = document.getElementById('emp-status').value;

    const newEmployee = {
      id: "emp-" + Date.now(),
      hotelId: currentHotelId,
      name,
      role,
      salary,
      status
    };

    employees.push(newEmployee);
    localStorage.setItem('vvce_employees', JSON.stringify(employees));
    
    renderOwnerDashboard();
    closeAddEmployeeModal();
  });

  // Add Expense Inline Form Action
  expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = expenseName.value.trim();
    const amount = parseInt(expenseAmount.value) || 0;

    if (!name || amount <= 0) return;

    const newExpense = {
      id: "expense-" + Date.now(),
      hotelId: currentHotelId,
      name,
      amount,
      timestamp: Date.now()
    };

    expenses.push(newExpense);
    localStorage.setItem('vvce_expenses', JSON.stringify(expenses));
    
    expenseName.value = '';
    expenseAmount.value = '';
    
    renderOwnerDashboard();
  });

  // Tab View Switcher Event Listeners
  tabTerminalBtn.addEventListener('click', () => {
    tabTerminalBtn.classList.add('active');
    tabOwnerBtn.classList.remove('active');
    terminalView.classList.remove('hidden');
    ownerView.classList.add('hidden');
  });

  tabOwnerBtn.addEventListener('click', () => {
    tabOwnerBtn.classList.add('active');
    tabTerminalBtn.classList.remove('active');
    ownerView.classList.remove('hidden');
    terminalView.classList.add('hidden');
    renderOwnerDashboard();
  });

  // --- ADMIN SETTINGS MODAL WORKFLOW ---
  const openSettingsModal = () => {
    setDiscountInput.value = config.discount;
    setGstInput.value = config.gst;
    setGasInput.value = config.gas;
    setUpiInput.value = config.upi;
    settingsModal.classList.remove('hidden');
  };

  const closeSettingsModal = () => {
    settingsModal.classList.add('hidden');
  };

  btnOpenSettings.addEventListener('click', openSettingsModal);
  btnCloseSettings.addEventListener('click', closeSettingsModal);
  btnCancelSettings.addEventListener('click', closeSettingsModal);

  btnSaveSettings.addEventListener('click', () => {
    const disc = parseInt(setDiscountInput.value);
    const gstVal = parseFloat(setGstInput.value);
    const gasVal = parseFloat(setGasInput.value);
    const upiVal = setUpiInput.value.trim();

    if (isNaN(disc) || disc < 0 || disc > 100) {
      alert("Please enter a valid discount percentage (0-100).");
      return;
    }
    if (isNaN(gstVal) || gstVal < 0 || gstVal > 100) {
      alert("Please enter a valid GST percentage (0-100).");
      return;
    }
    if (isNaN(gasVal) || gasVal < 0 || gasVal > 100) {
      alert("Please enter a valid Gas Charge percentage (0-100).");
      return;
    }
    if (!upiVal) {
      alert("UPI merchant address is required.");
      return;
    }

    config = {
      discount: disc,
      gst: gstVal,
      gas: gasVal,
      upi: upiVal
    };

    localStorage.setItem('vvce_config', JSON.stringify(config));

    // Also update this configuration inside the active hotel object
    const activeHotel = hotels.find(h => h.id === currentHotelId);
    if (activeHotel) {
      activeHotel.discount = disc;
      activeHotel.gst = gstVal;
      activeHotel.gas = gasVal;
      activeHotel.upi = upiVal;
      localStorage.setItem('vvce_hotels', JSON.stringify(hotels));
    }
    
    // Reload configurations labels on receipt
    loadConfigurations();
    
    // Recalculate bill based on new values
    recalculateBill();
    
    closeSettingsModal();
  });

  // --- RESET & ORDER CANCELLATION ---
  btnReset.addEventListener('click', () => {
    form.reset();
    itemsTbody.innerHTML = '';
    createItemRow();

    // Clear validation styling
    nameError.textContent = "";
    phoneError.textContent = "";
    itemsError.textContent = "";
    customerName.style.borderColor = "";
    phoneNumber.style.borderColor = "";

    // Reset default selections
    orderType.value = "Dine-In";
    tableGroup.style.display = "";
    deliveryGroup.style.display = "none";
    paymentMethod.value = "Cash";

    btnGenerateBill.disabled = true;
    billPanel.classList.add('hidden');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- PRINT RECEIPT TRIGGER ---
  btnPrint.addEventListener('click', () => {
    window.print();
  });

  // --- INIT BOOTSTRAPPING ---
  loadState();
  loadConfigurations();
  loadTransactions();
  updateAnalytics();
  renderMenu();
  createItemRow();
});
