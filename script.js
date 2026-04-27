let cart = [];

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});

/* AJOUT AU PANIER */
function addToCart(name, price) {
  cart.push({ name, price });
  updateCartCount();
  renderCart();
}

/* COMPTEUR */
function updateCartCount() {
  const counter = document.getElementById("cartCount");
  if (counter) {
    counter.innerText = cart.length;
  }
}

/* RENDU PANIER */
function renderCart() {
  const modal = document.getElementById("cartModal");
  if (!modal) return;

  let total = 0;

  modal.innerHTML = `
    <h2>🛒 Panier</h2>
    <hr>
  `;

  if (cart.length === 0) {
    modal.innerHTML += `<p>Votre panier est vide</p>`;
  } else {
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
      <button onclick="pay()">💳 Payer (Stripe)</button>
    `;
  }

  modal.innerHTML += `
    <br><br>
    <button onclick="closeCart()">Fermer</button>
  `;

  modal.style.display = "block";
}

/* OUVRIR PANIER */
function openCart() {
  renderCart();
  document.getElementById("cartModal").style.display = "block";
}

/* FERMER PANIER */
function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

/* SUPPRIMER PRODUIT */
function removeItem(index) {
  cart.splice(index, 1);
  updateCartCount();
  renderCart();
}

/* PAIEMENT (DEMO STRIPE) */
function pay() {
  alert("Redirection vers Stripe Checkout (mode démo)");

  // 👉 VERSION RÉELLE :
  // window.location.href = "/checkout";
}
