document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('billing-form');
  const btnGenerateFields = document.getElementById('btn-generate-fields');
  const dynamicFieldsContainer = document.getElementById('dynamic-fields-container');
  const itemsTbody = document.getElementById('items-tbody');
  const btnGenerateBill = document.getElementById('btn-generate-bill');
  const btnReset = document.getElementById('btn-reset');
  const billPanel = document.getElementById('bill-panel');
  const btnPrint = document.getElementById('btn-print');

  // Input Validation elements
  const customerName = document.getElementById('customer-name');
  const phoneNumber = document.getElementById('phone-number');
  const numItems = document.getElementById('num-items');
  
  const nameError = document.getElementById('name-error');
  const phoneError = document.getElementById('phone-error');
  const itemsError = document.getElementById('items-error');

  const formatCurrency = (amount) => `₹${amount.toFixed(2)}`;

  // Real-time phone number constraint
  phoneNumber.addEventListener('input', function() {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);
  });

  btnGenerateFields.addEventListener('click', () => {
    // Validate number of items
    const count = parseInt(numItems.value);
    if (isNaN(count) || count < 1 || count > 20) {
      itemsError.textContent = "Please enter a valid number of items (1-20).";
      return;
    }
    itemsError.textContent = "";
    
    // Generate rows
    itemsTbody.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><input type="text" class="item-name" required placeholder="Item ${i+1}"></td>
        <td><input type="number" class="item-price" required min="0" step="0.01" placeholder="0.00"></td>
        <td><input type="number" class="item-qty" required min="1" placeholder="1"></td>
      `;
      itemsTbody.appendChild(tr);
    }
    
    dynamicFieldsContainer.classList.remove('hidden');
    btnGenerateBill.disabled = false;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear previous errors
    nameError.textContent = "";
    phoneError.textContent = "";
    let isValid = true;

    // Validate Customer Name
    if (!customerName.value.trim()) {
      nameError.textContent = "Customer name is required.";
      isValid = false;
    }

    // Validate Phone Number
    if (!/^\d{10}$/.test(phoneNumber.value)) {
      phoneError.textContent = "Please enter a valid 10-digit phone number.";
      isValid = false;
    }

    if (!isValid) return;

    // Calculate Items
    const names = document.querySelectorAll('.item-name');
    const prices = document.querySelectorAll('.item-price');
    const qtys = document.querySelectorAll('.item-qty');
    
    let ba = 0;
    const itemsData = [];

    let itemsValid = true;
    for (let i = 0; i < names.length; i++) {
      const name = names[i].value.trim();
      const price = parseFloat(prices[i].value);
      const qty = parseInt(qtys[i].value);

      let rowValid = true;
      if (!name) { 
        names[i].style.borderColor = "var(--error)"; 
        rowValid = false; 
      } else { 
        names[i].style.borderColor = "var(--border-color)"; 
      }
      
      if (isNaN(price) || price < 0) { 
        prices[i].style.borderColor = "var(--error)"; 
        rowValid = false; 
      } else { 
        prices[i].style.borderColor = "var(--border-color)"; 
      }
      
      if (isNaN(qty) || qty < 1) { 
        qtys[i].style.borderColor = "var(--error)"; 
        rowValid = false; 
      } else { 
        qtys[i].style.borderColor = "var(--border-color)"; 
      }
      
      if (!rowValid) {
        itemsValid = false;
      } else {
        const total = price * qty;
        ba += total;
        itemsData.push({ name, price, qty, total });
      }
    }

    if (!itemsValid) {
      alert("Please fill all generated item fields correctly before generating the bill.");
      return;
    }

    // Logic replicated from C Code
    const dis = ba * 0.20;
    const dis1 = ba - dis; // Discounted total amount
    const gst = ba * 0.05;
    const cgst = ba * 0.025;
    const sgst = ba * 0.025;
    const gas = ba * 0.05;
    const finalBill = dis1 + gst + cgst + sgst + gas;

    // Render Bill Items
    const receiptItems = document.getElementById('receipt-items');
    receiptItems.innerHTML = '';
    
    itemsData.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item.name}</td>
        <td>${formatCurrency(item.price)}</td>
        <td>${item.qty}</td>
        <td>${formatCurrency(item.total)}</td>
      `;
      receiptItems.appendChild(tr);
    });

    // Populate Receipt Totals
    document.getElementById('rcpt-total-cost').textContent = formatCurrency(ba);
    document.getElementById('rcpt-discount').textContent = formatCurrency(dis1);
    document.getElementById('rcpt-gst').textContent = formatCurrency(gst);
    document.getElementById('rcpt-cgst').textContent = formatCurrency(cgst);
    document.getElementById('rcpt-sgst').textContent = formatCurrency(sgst);
    document.getElementById('rcpt-gas').textContent = formatCurrency(gas);
    document.getElementById('rcpt-final-bill').textContent = formatCurrency(finalBill);

    // Populate Customer Details
    document.getElementById('rcpt-cname').textContent = customerName.value.trim();
    document.getElementById('rcpt-cphone').textContent = phoneNumber.value;
    document.getElementById('rcpt-cname-footer').textContent = customerName.value.trim();
    
    // Savings Badge
    document.getElementById('rcpt-saved').textContent = formatCurrency(dis);

    // Show panel
    billPanel.classList.remove('hidden');
    
    // Scroll to bill on mobile or small desktop
    if (window.innerWidth <= 900) {
      billPanel.scrollIntoView({ behavior: 'smooth' });
    }
  });

  btnReset.addEventListener('click', () => {
    form.reset();
    dynamicFieldsContainer.classList.add('hidden');
    itemsTbody.innerHTML = '';
    btnGenerateBill.disabled = true;
    billPanel.classList.add('hidden');
    nameError.textContent = "";
    phoneError.textContent = "";
    itemsError.textContent = "";
  });

  btnPrint.addEventListener('click', () => {
    window.print();
  });
});
