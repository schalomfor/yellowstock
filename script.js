let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  updateCartCount();
  renderCart();
}

function updateCartCount() {
  const counter = document.getElementById("cartCount");
  if (counter) {
    counter.innerText = cart.length;
  }
}

function renderCart() {
  let modal = document.getElementById("cartModal");
  if (!modal) return;

  modal.innerHTML = "<h2>🛒 Panier</h2>";

  let total = 0;

  cart.forEach((item, index) => {
    modal.innerHTML += `
      <div style="margin-bottom:10px;">
        <p>${item.name} - ${item.price}€</p>
        <button onclick="removeItem(${index})">Supprimer</button>
      </div>
    `;
    total += item.price;
  });

  modal.innerHTML += `
    <hr>
    <h3>Total : ${total}€</h3>
    <button onclick="pay()">💳 Payer avec Stripe</button>
    <br><br>
    <button onclick="closeCart()">Fermer</button>
  `;

  modal.style.display = "block";
}

function openCart() {
  renderCart();
  document.getElementById("cartModal").style.display = "block";
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCartCount();
  renderCart();
}

/* STRIPE (DEMO) */
function pay() {
  alert("Redirection vers Stripe Checkout (mode démo)");

  // VERSION RÉELLE (backend requis)
  // window.location.href = "/checkout";
}
