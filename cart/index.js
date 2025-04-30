let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartProductsEl = document.getElementById('cart_products');
const emptyCartMessage = document.getElementById('empty-cart-message');
const removeAllBtn = document.getElementById('remove-all-btn');

function updateCartCount() {
    const cartCountElement = document.querySelector('.cart_li span');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

function displayCartItems() {    
    cartProductsEl.innerHTML = '';
    
    
    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartProductsEl.style.display = 'none';
        removeAllBtn.style.display = 'none';
    } else {
        emptyCartMessage.style.display = 'none';
        cartProductsEl.style.display = 'flex';
        removeAllBtn.style.display = 'block';
        
        cart.forEach(item => {
            const cartItemEl = document.createElement('div');
            cartItemEl.className = 'cart-item';
            
            const currentPrice = parseFloat(item.currentPrice);
            const itemTotal = currentPrice * item.quantity;
            
            cartItemEl.innerHTML = `
                <div class="item-image">
                    <img src="${item.thumbnail}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p class="price">₹${currentPrice.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                    <p class="item-total">Total: ₹${itemTotal.toFixed(2)}</p>
                </div>
                <button class="remove-btn" data-id="${item.id}">Remove</button>
            `;
            
            cartProductsEl.appendChild(cartItemEl);
        });
    }
    
    addEventListeners();
}

function addEventListeners() {
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            removeFromCart(id);
        });
    });
    
    const plusButtons = document.querySelectorAll('.quantity-btn.plus');
    plusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            updateQuantity(id, 1);
        });
    });
    
    const minusButtons = document.querySelectorAll('.quantity-btn.minus');
    minusButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            updateQuantity(id, -1);
        });
    });

   
    removeAllBtn.addEventListener('click', removeAllFromCart);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCartItems();
}

function removeAllFromCart() {
    if (confirm('Are you sure you want to remove all items from your cart?')) {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCartItems();
    }
}

function updateQuantity(id, change) {
    const index = cart.findIndex(item => item.id === id);
    
    if (index !== -1) {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            removeFromCart(id);
            return;
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    displayCartItems();
});

