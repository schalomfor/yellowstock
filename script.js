let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  renderCart();
}

function renderCart() {
  let modal = document.getElementById("cartModal");
  if (!modal) return;

  modal.innerHTML = "<h2>🛒 Panier</h2>";

  let total = 0;

  cart.forEach((item, i) => {
    modal.innerHTML += `
      <p>${item.name} - ${item.price}€</p>
    `;
    total += item.price;
  });

  modal.innerHTML += `
    <hr>
    <h3>Total : ${total}€</h3>
    <button onclick="pay()">Payer avec Stripe</button>
    <br><br>
    <button onclick="closeCart()">Fermer</button>
  `;

  modal.style.display = "block";
}

function openCart() {
  document.getElementById("cartModal").style.display = "block";
  renderCart();
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

/* STRIPE DEMO */
function pay() {
  alert("Redirection vers Stripe Checkout (mode démo)");

  // 👉 VERSION RÉELLE (à activer avec backend)
  // window.location.href = "/checkout";
}
