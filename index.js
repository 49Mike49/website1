function fetching(){
    fetch("https://raw.githubusercontent.com/dvishal485/flipkart-scraper-api/refs/heads/main/sample-search.json")
    .then(res => {
        return res.json();
    })
    .then(data => {
        console.log(data);
        let res = data.result;
        let element = document.getElementById("api");
        res.forEach(item => {
            let creatingdiv = document.createElement("div");
            creatingdiv.setAttribute("class", "pages");
            creatingdiv.innerHTML = `
                <img src="${item.thumbnail}" alt="">
                <p>${item.name}</p>
                <p>₹${item.current_price}(discount price)</p>
                <p style="color:#3597d8;"><del>₹${item.original_price}(current price)</del></p>
                <input type="button" value="Add to cart" class="add-to-cart-btn" style="border-radius:20px" 
                onclick="addToCart('${item.name}', '${item.thumbnail}', '${item.current_price}', '${item.original_price}')">
            `;
            element.appendChild(creatingdiv);
        });
    })

    .catch(error => {
        console.log(error);
    });
}
fetching();

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart_li span');
    cartCountElements.forEach(element => {
        element.textContent = cart.length;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});

function addToCart(name, thumbnail, currentPrice, originalPrice) {
    const item = {
        id: Date.now().toString(),
        name: name,
        thumbnail: thumbnail,
        currentPrice: currentPrice,
        originalPrice: originalPrice,
        quantity: 1
    };
    
    const existingItemIndex = cart.findIndex(cartItem => cartItem.name === name);
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push(item);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartCount();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}