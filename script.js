
let cart = JSON.parse(localStorage.getItem("ys_cart")) || [];

/* =========================
   STATE
========================= */
let startX = 0;
let imgIndex = 0;
let intensity = 0.13;

/* =========================
   IMAGES PRODUIT
========================= */
const images = [
  "iphone14_front.jpg",
  "iphone14_side.jpg",
  "iphone14_back.jpg"
];

/* =========================
   INIT
========================= */
window.onload = () => {
  updateCartCount();
  applyBackground();

  const img = document.getElementById("productImage");
  if (img) img.src = images[0];
};

/* =========================
   BACKGROUND SYSTEM
========================= */
function applyBackground() {
  let r = 181 - (intensity * 90);
  let g = 160 - (intensity * 80);
  let b = 140 - (intensity * 70);

  document.body.style.background = `rgb(${r},${g},${b})`;
}

/* =========================
   ADD TO CART
========================= */
function addToCart(name, price) {
  cart.push({ name, price });

  saveCart();
  updateCartCount();

  increaseIntensity(0.06);
  openCart();
}

/* =========================
   SAVE LOCALSTORAGE
========================= */
function saveCart() {
  localStorage.setItem("ys_cart", JSON.stringify(cart));
}

/* =========================
   COUNT
========================= */
function updateCartCount() {
  const el = document.getElementById("cartCount");
  if (el) el.innerText = cart.length;
}

/* =========================
   OPEN CART (66%)
========================= */
function openCart() {
  const modal = document.querySelector(".cart-modal");
  const overlay = document.querySelector(".overlay");

  if (modal) modal.classList.add("open");
  if (overlay) {
    overlay.style.pointerEvents = "auto";
    overlay.style.background = "rgba(255,0,180,0.12)";
  }

  increaseIntensity(0.13);
  renderCart();
}

/* =========================
   CLOSE CART
========================= */
function closeCart() {
  const modal = document.querySelector(".cart-modal");
  const overlay = document.querySelector(".overlay");

  if (modal) modal.classList.remove("open");
  if (overlay) {
    overlay.style.pointerEvents = "none";
    overlay.style.background = "rgba(255,0,180,0)";
  }

  intensity = 0.13;
  applyBackground();
}

/* =========================
   INTENSITY SYSTEM
========================= */
function increaseIntensity(value) {
  intensity += value;
  if (intensity > 0.19) intensity = 0.19;
  applyBackground();
}

/* =========================
   RENDER CART
========================= */
function renderCart() {
  const modal = document.getElementById("cartModal");

  if (!modal) return;

  let total = 0;

  modal.innerHTML = "<h2>🛒 Panier</h2>";

  if (cart.length === 0) {
    modal.innerHTML += "<p>Panier vide</p>";
    return;
  }

  cart.forEach((item, i) => {
    total += item.price;

    modal.innerHTML += `
      <div style="margin-bottom:10px;">
        <b>${item.name}</b><br>
        ${item.price}€
        <br>
        <button onclick="removeItem(${i})">Supprimer</button>
      </div>
    `;
  });

  modal.innerHTML += `
    <hr>
    <h3>Total : ${total}€</h3>
    <button onclick="checkout()">💳 Payer</button>
    <button onclick="closeCart()">Fermer</button>
  `;
}

/* =========================
   REMOVE ITEM
========================= */
function removeItem(i) {
  cart.splice(i, 1);
  saveCart();
  updateCartCount();
  renderCart();
}

/* =========================
   CHECKOUT
========================= */
function checkout() {
  alert("Paiement simulé 💳");

  cart = [];
  saveCart();
  updateCartCount();

  intensity = 0.13;
  applyBackground();

  renderCart();
  closeCart();
}

/* =========================
   IMAGE CAROUSEL SAFE
========================= */
function changeImage() {
  const img = document.getElementById("productImage");
  if (!img) return;

  imgIndex = (imgIndex + 1) % images.length;

  const next = images[imgIndex];

  const test = new Image();
  test.src = next;

  test.onload = () => {
    img.src = next;
  };

  increaseIntensity(0.03);
}

/* =========================
   SWIPE 0 → 66%
========================= */
document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchmove", e => {
  const diff = startX - e.touches[0].clientX;
  const modal = document.querySelector(".cart-modal");

  if (!modal) return;

  if (diff > 0 && diff < window.innerWidth * 0.66) {
    modal.style.transform =
      `translateX(${100 - (diff / (window.innerWidth * 0.66)) * 100}%)`;
  }
});

document.addEventListener("touchend", e => {
  const diff = startX - e.changedTouches[0].clientX;

  if (diff > window.innerWidth * 0.25) {
    openCart();
  } else {
    closeCart();
  }
});
