import './style.css';
import { products, type Product } from "./products"; // type import

const app = document.getElementById('app');
let cart: Product[] = [];

// 🟢 Render Products (with optional filter)
function renderProducts(list: Product[] = products) {
  if (!app) return;
  app.innerHTML = "";

  // Store Heading
  const heading = document.createElement('h1');
  heading.textContent = "BunnyHugs 🐰 Baby Store";
  app.appendChild(heading);

  // Cart Button
  const viewCartBtn = document.createElement('button');
  viewCartBtn.textContent = `🛒 View Cart (${cart.length})`;
  viewCartBtn.className = "cart-btn";
  viewCartBtn.onclick = renderCart;
  app.appendChild(viewCartBtn);

  // Search Box
  const searchBox = document.createElement('input');
  searchBox.type = "text";
  searchBox.placeholder = "Search products...";
  searchBox.className = "search-box";
  app.appendChild(searchBox);

  const searchBtn = document.createElement('button');
  searchBtn.textContent = "🔍 Search";
  searchBtn.onclick = () => {
    const query = searchBox.value.toLowerCase();
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(query)
    );
    renderProducts(filtered);
  };
  app.appendChild(searchBtn);

  // Product Grid
  const container = document.createElement('div');
  container.className = 'product-container';
  app.appendChild(container);

  // Show products
  list.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';

    const img = document.createElement('img');
    img.src = product.img;
    img.alt = product.name;

    const name = document.createElement('h2');
    name.textContent = product.name;

    const price = document.createElement('p');
    price.textContent = `₹${product.price}`;

    const btn = document.createElement('button');
    btn.textContent = "Add to Cart";
    btn.onclick = () => {
      cart.push(product);
      alert(`${product.name} added to cart!`);
      renderProducts(); // refresh with updated cart count
    };

    card.append(img, name, price, btn);
    container.appendChild(card);
  });
}

// 🟢 Render Cart
function renderCart() {
  if (!app) return;
  app.innerHTML = "";

  const heading = document.createElement('h1');
  heading.textContent = "🛒 Your Cart";
  app.appendChild(heading);

  const backBtn = document.createElement('button');
  backBtn.textContent = "⬅️ Back to Shop";
  backBtn.className = "back-btn";
  backBtn.onclick = () => renderProducts();
  app.appendChild(backBtn);

  if (cart.length === 0) {
    const emptyMsg = document.createElement('p');
    emptyMsg.textContent = "Your cart is empty!";
    app.appendChild(emptyMsg);
    return;
  }

  const list = document.createElement('div');
  list.className = "cart-list";
  app.appendChild(list);

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;

    const row = document.createElement('div');
    row.className = "cart-item";

    const name = document.createElement('span');
    name.textContent = `${item.name} - ₹${item.price}`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = "❌ Remove";
    removeBtn.onclick = () => {
      cart.splice(index, 1);
      renderCart();
    };

    row.append(name, removeBtn);
    list.appendChild(row);
  });

  const totalDiv = document.createElement('h2');
  totalDiv.textContent = `Total: ₹${total}`;
  app.appendChild(totalDiv);

  // Proceed to Checkout
  const checkoutBtn = document.createElement('button');
  checkoutBtn.textContent = "➡️ Proceed to Checkout";
  checkoutBtn.className = "checkout-btn";
  checkoutBtn.onclick = renderCheckout;
  app.appendChild(checkoutBtn);
}

// 🟢 Render Checkout
function renderCheckout() {
  if (!app) return;
  app.innerHTML = "";

  const heading = document.createElement('h1');
  heading.textContent = "Checkout 🛍️";
  app.appendChild(heading);

  const nameInput = document.createElement('input');
  nameInput.placeholder = "Enter your name";
  nameInput.className = "checkout-input";

  const addressInput = document.createElement('textarea');
  addressInput.placeholder = "Enter your address";
  addressInput.className = "checkout-input";

  // Payment Type Dropdown
  const paymentSelect = document.createElement('select');
  paymentSelect.className = "checkout-input";
  const options = ["Credit Card", "Debit Card", "UPI", "Cash on Delivery"];
  options.forEach(opt => {
    const option = document.createElement('option');
    option.value = opt;
    option.textContent = opt;
    paymentSelect.appendChild(option);
  });


  const payBtn = document.createElement('button');
  payBtn.textContent = "💳 Place Order";
  payBtn.onclick = () => {
    alert("🎉 Order Placed Successfully!");
    cart = []; // clear cart
    renderProducts();
  };

  app.append(nameInput, addressInput, paymentSelect, payBtn);
}

// 🟢 Start App
renderProducts();
