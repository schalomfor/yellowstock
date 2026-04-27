let cart = [];

/* INIT - récupère panier si existant */
document.addEventListener("DOMContentLoaded", () => {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
  updateCartCount();
});

/* AJOUT PRODUIT */
function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
  updateCartCount();
  renderCart();
}

/* SAUVEGARDE LOCAL */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* COMPTEUR */
function updateCartCount() {
  const counter = document.getElementById("cartCount");
  if (counter) {
    counter.innerText = cart.length;
  }
}

/* AFFICHAGE PANIER */
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
      <button onclick="goToCheckout()">💳 Passer à la caisse</button>
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

/* SUPPRIMER ITEM */
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartCount();
  renderCart();
}

/* REDIRECTION CHECKOUT */
function goToCheckout() {
  saveCart();
  window.location.href = "checkout.html";
}

/* PAIEMENT DEMO */
function pay() {
  alert("Redirection vers Stripe Checkout (mode démo)");
}
