let cart = [];

function addToCart(name, price) {
  cart.push({ name, price });
  alert(name + " ajouté au panier !");
  updateCartCount();
}

function updateCartCount() {
  const el = document.getElementById("cartCount");
  if (el) el.innerText = cart.length;
}

function showCart() {
  let total = 0;
  let list = "";

  cart.forEach(item => {
    list += item.name + " - " + item.price + "€\n";
    total += item.price;
  });

  alert("PANIER:\n\n" + list + "\nTOTAL: " + total + "€");
}

function buy() {
  alert("Simulation achat validé !");
}
