const productsList = document.getElementById("products-list");
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartEmptyMsg = document.getElementById('cart-empty-msg');
const clearCartBtn = document.getElementById('clear-cart');
let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];





fetch('https://fakestoreapi.com/products')
  .then(response => response.json())

  .then(products => {
    



      productsList.innerHTML = '';
    products.forEach(product => {
      let productDiv = document.createElement("div");
      productDiv.classList.add('product');

      let productImage = document.createElement("img");
      productImage.src = product.image;
      productImage.alt = product.title;
      // let productLink = document.createElement("a");
      // productLink.href = 'product.html';

      productImage.addEventListener('click', () => {
        window.location.href = `product.html?id=${product.id}`;
      });

      // let details = document.createElement("div", "p-4");
      let productName = document.createElement("h3");
      productName.textContent = product.title;
      productName.classList.add('product-title');

      let productPrice = document.createElement("p");
      productPrice.textContent = product.price.toFixed(2);

      let productCategory = document.createElement('p')
      productCategory.textContent = product.category;

      let addButton = document.createElement('button');
      addButton.classList.add('add-to-cart-btn');
      addButton.textContent = "Add to Cart";

      addButton.dataset.id = product.id;



      //productLink.append(productImage);
      productDiv.append(productImage, productName, productPrice, productCategory, addButton);
      productsList.appendChild(productDiv);
    })
  }

  )
  .catch(error => {
    productsList.innerHTML = `<p>Error loading products: ${error.message}</p>`;
    console.error("Fetch error:", error);
  });





function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
};



$("#dropdownBtn").on("click", function () {
  $("#cart-preview").toggle("slow", function () {

  });
});



let items = products;
function createElement(tag, className, text) {
    const el = document.createElement(tag);
    el.className = className;
    if (text) {
        el.textContent = text;
    }
    return el;
};

function renderCart() {
  cartItems.innerHTML = '';

  if (cart.length === 0) {
    cartEmptyMsg.style.display = 'block';
    clearCartBtn.disabled = true;
  } else {
    cartEmptyMsg.style.display = 'none';
    clearCartBtn.disabled = false;

    cart.forEach(item => {
      const cartItem = createElement('div', 'cart-item flex justify-between items-center py-3');
      cartItem.classList.add('cart-item', 'flex', 'justify-between', 'items-center', 'py-3');
      const cartDiv1 = createElement('div');
      const nameP = document.createElement('p');
      nameP.classList.add('font-semibold');
      //nameP.textContent = `${item.title}`;
      const quantityP = createElement('p',`${item.title}` );
      quantityP.classList.add('text-sm');
      // quantityP.textContent = 
      cartDiv1.append(nameP, quantityP);

      const cartDiv2 = document.createElement('div', 'flex items-center gap-2');
      const totalP = document.createElement('p', 'font-bold text-gray-800', `$${(item.price * item.quantity).toFixed(2)}`);
      const removeButton = document.createElement('button', 'remove-from-cart-btn text-red-500 hover:text-red-700');
      removeButton.dataset.id = item.id;
      removeButton.classList.add('remove-from-cart-btn');
      removeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                      </svg>`;
      cartDiv2.append(totalP, removeButton);

      cartItem.append(cartDiv1, cartDiv2);
      cartItems.appendChild(cartItem);
    });

  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

function addToCart(productId) {
  const productNo = products.find(p => p.id === productId);
  const cartItem = cart.find(item => item.id === productId);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...productNo, quantity: 1 });
  }

  saveCart();
  renderCart();
}
productsList.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to-cart-btn')) {
    const productId = parseInt(e.target.dataset.id);
    addToCart(productId);
  }
});


function removeFromCart(productId) {
  const cartItemIndex = cart.findIndex(item => item.id === productId);
  if (cartItemIndex > -1) {
    const item = cart[cartItemIndex];
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      cart.splice(cartItemIndex, 1);
    }
  }

  saveCart();
  renderCart();
}



cartItems.addEventListener('click', (e) => {
  const removeButton = e.target.closest('.remove-from-cart-btn');
  if (removeButton) {
    const productId = parseInt(removeButton.dataset.id);
    removeFromCart(productId);
  }

});

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

clearCartBtn.addEventListener('click', clearCart);



renderCart();

