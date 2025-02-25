// Load menu items from localStorage
function loadInventory() {
    const storedItems = localStorage.getItem('menuItems');
    if (storedItems) {
        const items = JSON.parse(storedItems);
        displayInventory(items);
    }
}

// Display inventory items
function displayInventory(items) {
    const inventoryContainer = document.getElementById('inventory-items');
    inventoryContainer.innerHTML = '';

    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'inventory-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 100px;">
            <p>Name: ${item.name}</p>
            <p>Price: ₹${item.price}</p>
            <p>Stock: ${item.stock}</p>
            <button onclick="updateStock(${item.id})" class="btn">Update Stock</button>
            <button onclick="deleteItem(${item.id})" class="btn">Delete</button>
        `;
        inventoryContainer.appendChild(itemElement);
    });
}

// Add new item
document.getElementById('add-item-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const storedItems = JSON.parse(localStorage.getItem('menuItems') || '[]');
    const newItem = {
        id: Date.now(),
        name: document.getElementById('item-name').value,
        price: Number(document.getElementById('item-price').value),
        stock: Number(document.getElementById('item-stock').value),
        image: document.getElementById('item-image').value
    };

    storedItems.push(newItem);
    localStorage.setItem('menuItems', JSON.stringify(storedItems));
    displayInventory(storedItems);
    e.target.reset();
});

// Update stock
function updateStock(itemId) {
    const items = JSON.parse(localStorage.getItem('menuItems'));
    const item = items.find(item => item.id === itemId);
    
    const newStock = prompt(`Enter new stock quantity for ${item.name}:`, item.stock);
    if (newStock !== null) {
        item.stock = Number(newStock);
        localStorage.setItem('menuItems', JSON.stringify(items));
        displayInventory(items);
    }
}

// Delete item
function deleteItem(itemId) {
    if (confirm('Are you sure you want to delete this item?')) {
        const items = JSON.parse(localStorage.getItem('menuItems'));
        const updatedItems = items.filter(item => item.id !== itemId);
        localStorage.setItem('menuItems', JSON.stringify(updatedItems));
        displayInventory(updatedItems);
    }
}

// Initialize the admin panel
loadInventory(); 