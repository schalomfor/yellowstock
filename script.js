let cart = [];
let cartOpen = false;
let startX = 0;

/* =========================
   🛒 OUVRIR / FERMER PANIER
========================= */

function openCart() {
  const cartModal = document.getElementById("cartModal");
  if (!cartModal) return;

  cartModal.style.right = "0";
  cartOpen = true;
  renderCart();
}

function closeCart() {
  const cartModal = document.getElementById("cartModal");
  if (!cartModal) return;

  cartModal.style.right = "-80%";
  cartOpen = false;
}

function toggleCart() {
  if (cartOpen) {
    closeCart();
  } else {
    openCart();
  }
}

/* =========================
   ➕ AJOUT AVEC CONFIRMATION
========================= */

function confirmAdd(name = "Produit", price = 0) {
  const ok = confirm("Ajouter ce produit au panier ?");
  if (!ok) return;

  cart.push({ name, price, qty: 1 });
  updateCartCount();
  openCart();
}

/* =========================
   🔢 COMPTEUR PANIER
========================= */

function updateCartCount() {
  const counter = document.getElementById("cartCount");
  if (counter) {
    counter.innerText = cart.length;
  }
}

/* =========================
   📦 AFFICHAGE PANIER
========================= */

function renderCart() {
  const modal = document.getElementById("cartModal");
  if (!modal) return;

  let total = 0;

  modal.innerHTML = "<h2>🛒 Panier</h2>";

  if (cart.length === 0) {
    modal.innerHTML += "<p>Votre panier est vide</p>";
  }

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    modal.innerHTML += `
      <div style="margin-bottom:15px;">
        <p>${item.name}</p>
        <p>${item.price}€</p>

        <button onclick="removeItem(${index})">Supprimer</button>
      </div>
    `;
  });

  modal.innerHTML += `
    <hr>
    <h3>Total : ${total}€</h3>

    <button onclick="checkout()">💳 Payer</button>
    <br><br>
    <button onclick="closeCart()">Fermer</button>
  `;
}

/* =========================
   ❌ SUPPRIMER PRODUIT
========================= */

function removeItem(index) {
  cart.splice(index, 1);
  updateCartCount();
  renderCart();
}

/* =========================
   💳 CHECKOUT
========================= */

function checkout() {
  alert("Paiement à connecter avec Stripe");
}

/* =========================
   👉 SWIPE GLOBAL
========================= */

document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;

  // Swipe gauche → ouvrir
  if (startX - endX > 80) {
    openCart();
  }

  // Swipe droite → fermer
  if (endX - startX > 80) {
    closeCart();
  }
});

/* =========================
   🔄 INIT
========================= */

window.onload = function () {
  updateCartCount();
};
