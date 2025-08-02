fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(data => { products = data; renderProducts(products); })
  .catch(err => {
    productsList.innerHTML = `<p>Error loading products: ${err.message}</p>`;
    console.error(err);
  });

const productsList = document.getElementById("products-list");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartEmptyMsg = document.getElementById("cart-empty-msg");
const clearCartBtn = document.getElementById("clear-cart");
const searchInput = document.getElementById("search-input"); // optional feature
const filterSelect = document.getElementById("category-filter");


let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

 $("#dropdownBtn").on("click", function () {
    $("#cart-preview").toggle("slow");
  });
function renderProducts(items) {
  productsList.innerHTML = "";
  items.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product", "card");

    div.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="product-image">
      <h3 class="product-title">${product.title}</h3>
      <p class="product-price">$${product.price.toFixed(2)}</p>
      <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
    `;
    div.querySelector(".product-image")
      .addEventListener("click", () => window.location.href = `product.html?id=${product.id}`);
    productsList.append(div);
  });
}


function renderCart() {
  cartItems.innerHTML = "";
  if (cart.length === 0) {
    cartEmptyMsg.style.display = "block";
    clearCartBtn.disabled = true;
    cartTotal.textContent = "$0.00";
    return;
  }
  cartEmptyMsg.style.display = "none";
  clearCartBtn.disabled = false;

  cart.forEach(item => {
    const row = document.createElement("div");
    row.classList.add("cart-item");

    row.innerHTML = `
      <div>${item.title}</div>
      <div>
        <button class="dec" data-id="${item.id}">–</button>
        ${item.quantity}
        <button class="inc" data-id="${item.id}">+</button>
      </div>
      <div>$${(item.price * item.quantity).toFixed(2)}</div>
      <button class="remove" data-id="${item.id}">🗑️</button>
    `;
    cartItems.append(row);
  });

  const total = cart.reduce((sum, i) => sum + i.quantity * i.price, 0);
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  const e = cart.find(i => i.id === id);
  e ? e.quantity++ : cart.push({ ...product, quantity: 1 });
  saveCart();
  renderCart();
}

function changeQuantity(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.quantity = Math.max(1, item.quantity + delta);
  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
}

productsList.addEventListener("click", e => {
  if (e.target.matches(".add-to-cart")) {
    addToCart(Number(e.target.dataset.id));
  }
});
cartItems.addEventListener("click", e => {
  const id = Number(e.target.dataset.id);
  if (e.target.matches(".inc")) changeQuantity(id, +1);
  else if (e.target.matches(".dec")) changeQuantity(id, -1);
  else if (e.target.matches(".remove")) removeFromCart(id);
});
clearCartBtn.addEventListener("click", () => {
  cart = []; saveCart(); renderCart();
});

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const q = searchInput.value.toLowerCase();
    renderProducts(products.filter(p => p.title.toLowerCase().includes(q)));
  });
}
if (filterSelect) {
  filterSelect.addEventListener("change", () => {
    const cat = filterSelect.value;
    renderProducts(cat === "all" ? products : products.filter(p => p.category === cat));
  });
}




renderCart();
