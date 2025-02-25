// Initial menu items data with more realistic examples
let menuItems = [
    {
        id: 1,
        name: "Chicken Burger",
        price: 149,
        stock: 50,
        image: "https://source.unsplash.com/featured/?burger"
    },
    {
        id: 2,
        name: "Margherita Pizza",
        price: 299,
        stock: 30,
        image: "https://source.unsplash.com/featured/?pizza"
    },
    {
        id: 3,
        name: "Masala Dosa",
        price: 99,
        stock: 40,
        image: "https://source.unsplash.com/featured/?dosa"
    },
    {
        id: 4,
        name: "Chicken Biryani",
        price: 249,
        stock: 25,
        image: "https://source.unsplash.com/featured/?biryani"
    },
    {
        id: 5,
        name: "Chocolate Shake",
        price: 129,
        stock: 35,
        image: "https://source.unsplash.com/featured/?milkshake"
    },
    {
        id: 6,
        name: "Veg Sandwich",
        price: 89,
        stock: 45,
        image: "https://source.unsplash.com/featured/?sandwich"
    },
    {
        id: 7,
        name: "French Fries",
        price: 99,
        stock: 60,
        image: "https://source.unsplash.com/featured/?fries"
    },
    {
        id: 8,
        name: "Ice Cream Sundae",
        price: 159,
        stock: 20,
        image: "https://source.unsplash.com/featured/?icecream"
    }
];

let cart = [];

// Load menu items from localStorage
function loadMenuItems() {
    const storedItems = localStorage.getItem('menuItems');
    if (storedItems) {
        menuItems = JSON.parse(storedItems);
    }
    displayMenuItems();
}

// Display menu items with enhanced UI
function displayMenuItems(items = menuItems) {
    const menuContainer = document.getElementById('menuItems');
    menuContainer.innerHTML = '';

    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'menu-item';

        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-content">
                <div>
                <h3>${item.name}</h3>
                <div class="price-tag">₹${item.price.toFixed(2)}</div>
                <p class="stock-status ${item.stock < 10 ? 'low-stock' : ''}">
                    ${item.stock === 0 ? 'Out of Stock' : 
                      item.stock < 10 ? `Only ${item.stock} left!` : 
                      `In Stock: ${item.stock}`}
                </p>
                </div>
                <div class="item-controls">
                    <button class="btn-quantity" onclick="decreaseQuantity(${item.id})" ${item.stock === 0 ? 'disabled' : ''}>-</button>
                    <span id="quantity-${item.id}">0</span>
                    <button class="btn-quantity" onclick="increaseQuantity(${item.id})" ${item.stock === 0 ? 'disabled' : ''}>+</button>
                    <button onclick="addToCart(${item.id})" class="btn btn-primary" ${item.stock === 0 ? 'disabled' : ''}>
                        <i class="fas fa-cart-plus"></i> Add
                    </button>
                </div>
            </div>
        `;
        menuContainer.appendChild(itemElement);
    });
}

// Quantity control functions
function increaseQuantity(itemId) {
    const quantityElement = document.getElementById(`quantity-${itemId}`);
    const item = menuItems.find(item => item.id === itemId);
    const currentQuantity = parseInt(quantityElement.textContent);
    
    if (currentQuantity < item.stock) {
        quantityElement.textContent = currentQuantity + 1;
    } else {
        showNotification('Maximum stock limit reached!', 'warning');
    }
}

function decreaseQuantity(itemId) {
    const quantityElement = document.getElementById(`quantity-${itemId}`);
    const currentQuantity = parseInt(quantityElement.textContent);
    if (currentQuantity > 0) {
        quantityElement.textContent = currentQuantity - 1;
    }
}

// Add item to cart with quantity
function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    const quantity = parseInt(document.getElementById(`quantity-${itemId}`).textContent);
    
    if (quantity === 0) {
        showNotification('Please select quantity', 'warning');
        return;
    }

    if (item && item.stock >= quantity) {
        const cartItem = cart.find(i => i.id === itemId);
        if (cartItem) {
            if (cartItem.quantity + quantity <= item.stock) {
                cartItem.quantity += quantity;
            } else {
                showNotification('Not enough stock!', 'error');
                return;
            }
        } else {
            cart.push({ ...item, quantity });
        }
        
        // Reset quantity display
        document.getElementById(`quantity-${itemId}`).textContent = '0';
        
        updateCart();
        updateCartCount();
        showNotification('Item added to cart!', 'success');
    }
}

// Update cart display with enhanced UI
function updateCart() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>₹${item.price} × ${item.quantity}</p>
                </div>
            </div>
            <div class="cart-item-actions">
                <span class="cart-item-total">₹${(item.price * item.quantity).toFixed(2)}</span>
                <button onclick="removeFromCart(${item.id})" class="btn btn-danger">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartContainer.appendChild(itemElement);
    });

    updateTotal();
}

// Calculate and update totals
function updateTotal() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * 0.05; // 5% tax
    const total = subtotal + tax;

    document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `₹${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `₹${total.toFixed(2)}`;
}

// Generate PDF bill
function generateBill() {
    try {
        if (cart.length === 0) {
            showNotification('Cart is empty!', 'error');
            return;
        }

        // Create new jsPDF instance
        const doc = new jsPDF();

        // Add header
        doc.setFontSize(22);
        doc.setTextColor(44, 62, 80);
        doc.text('CANTEEN MANAGEMENT', 105, 20, { align: 'center' });

        // Add bill information
        doc.setFontSize(12);
        doc.setTextColor(70, 70, 70);
        
        const currentDate = new Date();
        const billNo = `BILL-${currentDate.getTime().toString().slice(-6)}`;
        const dateStr = currentDate.toLocaleDateString();
        const timeStr = currentDate.toLocaleTimeString();

        doc.text(`Bill No: ${billNo}`, 20, 40);
        doc.text(`Date: ${dateStr}`, 20, 48);
        doc.text(`Time: ${timeStr}`, 20, 56);

        // Add separator line
        doc.setLineWidth(0.5);
        doc.line(20, 65, 190, 65);

        // Prepare table data
        const tableColumn = ["Item", "Price (₹)", "Quantity", "Total (₹)"];
        const tableRows = cart.map(item => [
            item.name,
            item.price.toFixed(2),
            item.quantity,
            (item.price * item.quantity).toFixed(2)
        ]);

        // Add table
            doc.autoTable({
                head: [tableColumn],
                body: tableRows,
                startY: 70,
                theme: 'grid',
                styles: {
                    fontSize: 10,
                cellPadding: 5,
                lineColor: [80, 80, 80],
                lineWidth: 0.1,
                },
                headStyles: {
                    fillColor: [44, 62, 80],
                textColor: [255, 255, 255],
                fontSize: 11,
                fontStyle: 'bold',
                halign: 'center'
            },
            columnStyles: {
                0: { cellWidth: 70 },
                1: { cellWidth: 40, halign: 'right' },
                2: { cellWidth: 30, halign: 'center' },
                3: { cellWidth: 40, halign: 'right' }
                },
                alternateRowStyles: {
                    fillColor: [245, 245, 245]
                }
            });

        // Calculate totals
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const tax = subtotal * 0.05;
        const total = subtotal + tax;

        // Add totals
        const finalY = doc.lastAutoTable.finalY + 10;

        // Add total section separator
        doc.setLineWidth(0.5);
        doc.line(120, finalY, 190, finalY);

        // Add totals with right alignment
        doc.setFontSize(10);
        doc.text('Subtotal:', 150, finalY + 7);
        doc.text(`₹ ${subtotal.toFixed(2)}`, 190, finalY + 7, { align: 'right' });

        doc.text('Tax (5%):', 150, finalY + 14);
        doc.text(`₹ ${tax.toFixed(2)}`, 190, finalY + 14, { align: 'right' });

        // Total in bold
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Total:', 150, finalY + 24);
        doc.text(`₹ ${total.toFixed(2)}`, 190, finalY + 24, { align: 'right' });

        // Add footer
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text('Thank you for your purchase!', 105, finalY + 40, { align: 'center' });
        doc.text('Please visit again', 105, finalY + 48, { align: 'center' });

        // Add terms
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text('* This is a computer-generated bill', 20, finalY + 60);
        doc.text('* All prices are inclusive of GST', 20, finalY + 65);

        // Save the PDF
        doc.save(`Canteen-Bill-${billNo}.pdf`);

        // Update stock and clear cart
        cart.forEach(cartItem => {
            const menuItem = menuItems.find(item => item.id === cartItem.id);
            if (menuItem) {
            menuItem.stock -= cartItem.quantity;
            }
        });

        // Update localStorage
        localStorage.setItem('menuItems', JSON.stringify(menuItems));

        // Clear cart and update UI
        cart = [];
        updateCart();
        updateCartCount();
        displayMenuItems();
        toggleCart();

        showNotification('Bill generated successfully!', 'success');
    } catch (error) {
        console.error('Error generating bill:', error);
        showNotification('Error generating bill. Please try again.', 'error');
    }
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 
                       type === 'error' ? 'fa-times-circle' : 
                       'fa-exclamation-circle'}"></i>
        ${message}
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Toggle cart visibility
function toggleCart() {
    const cartSection = document.getElementById('cartSection');
    cartSection.classList.toggle('active');
}

// Update cart count badge
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Add search functionality
function searchItems(query) {
    const filteredItems = menuItems.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase())
    );
    displayMenuItems(filteredItems);
}

// Add event listener for search
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchItems(e.target.value);
        });
    }
});

// Initialize the page
loadMenuItems(); 