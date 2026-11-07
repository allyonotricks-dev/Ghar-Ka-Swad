// GHAR KA SWAD - WEBSITE FUNCTIONALITY

const ORDER_WHATSAPP = "916901851598";

let cart = [];

// ELEMENTS
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const checkoutModal = document.getElementById("checkoutModal");

// MOBILE MENU
document.getElementById("mobileMenu").addEventListener("click", () => {
  document.getElementById("navigation").classList.toggle("show");
});

document.querySelectorAll(".navigation a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("navigation").classList.remove("show");
  });
});

// OPEN CART
function openCart() {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("show");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("show");
}

document.getElementById("openCart").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

// ADD TO CART
document.querySelectorAll(".add-cart").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);

    const existing = cart.find(item => item.name === name);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    updateCart();

    const originalText = button.textContent;
    button.textContent = "Added ✓";

    setTimeout(() => {
      button.textContent = originalText;
    }, 900);
  });
});

// UPDATE CART
function updateCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
  }

  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    count += item.quantity;

    const row = document.createElement("div");
    row.className = "cart-item";

    const info = document.createElement("div");
    info.className = "cart-item-info";

    const title = document.createElement("strong");
    title.textContent = item.name;

    const price = document.createElement("small");
    price.textContent = `₹${item.price} × ${item.quantity}`;

    info.append(title, price);

    const controls = document.createElement("div");
    controls.className = "quantity-controls";

    const minus = document.createElement("button");
    minus.textContent = "−";
    minus.setAttribute("aria-label", "Decrease quantity");
    minus.addEventListener("click", () => changeQuantity(index, -1));

    const quantity = document.createElement("span");
    quantity.textContent = item.quantity;

    const plus = document.createElement("button");
    plus.textContent = "+";
    plus.setAttribute("aria-label", "Increase quantity");
    plus.addEventListener("click", () => changeQuantity(index, 1));

    controls.append(minus, quantity, plus);
    row.append(info, controls);
    cartItems.appendChild(row);
  });

  cartTotal.textContent = `₹${total}`;
  cartCount.textContent = count;
}

function changeQuantity(index, amount) {
  cart[index].quantity += amount;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
}

// CHECKOUT
document.getElementById("checkoutButton").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Bhai, pehle cart mein food add karo!");
    return;
  }

  closeCart();
  checkoutModal.classList.add("show");
});

document.getElementById("closeCheckout").addEventListener("click", () => {
  checkoutModal.classList.remove("show");
});

checkoutModal.addEventListener("click", event => {
  if (event.target === checkoutModal) {
    checkoutModal.classList.remove("show");
  }
});

// WHATSAPP ORDER
document.getElementById("checkoutForm").addEventListener("submit", event => {
  event.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty.");
    checkoutModal.classList.remove("show");
    return;
  }

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const address = document.getElementById("customerAddress").value.trim();
  const note = document.getElementById("orderNote").value.trim();

  if (!name || !phone || !address) {
    alert("Please fill all required details.");
    return;
  }

  let total = 0;

  let message = `*NEW ORDER - GHAR KA SWAD*\n\n`;
  message += `*Customer:* ${name}\n`;
  message += `*Phone:* ${phone}\n`;
  message += `*Address:* ${address}\n\n`;
  message += `*ORDER ITEMS:*\n`;

  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    message += `• ${item.name} × ${item.quantity} = ₹${subtotal}\n`;
  });

  message += `\n*Total: ₹${total}*\n`;
  message += `*Delivery Charges:* To be confirmed\n`;

  if (note) {
    message += `\n*Special Instructions:* ${note}\n`;
  }

  message += `\nPlease confirm availability and delivery details.`;

  const url = `https://wa.me/${ORDER_WHATSAPP}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");

  checkoutModal.classList.remove("show");
});

// MENU SEARCH
document.getElementById("menuSearch").addEventListener("input", event => {
  const query = event.target.value.toLowerCase().trim();

  document.querySelectorAll(".food-card").forEach(card => {
    const text = card.textContent.toLowerCase();

    card.style.display = text.includes(query) ? "" : "none";
  });
});

// MENU FILTERS
document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const filter = button.dataset.filter;

    document.querySelectorAll(".food-card").forEach(card => {
      const category = card.dataset.category;

      card.style.display =
        filter === "all" || category === filter ? "" : "none";
    });
  });
});

// LANGUAGE SELECTOR
const translations = {
  en: {
    home: "⌂ Home",
    kitchen: "Our Kitchen",
    menu: "Menu",
    delivery: "Delivery",
    reviews: "Reviews",
    contact: "Contact",
    menuTitle: "Our Special Menu",
    menuSubtitle: "Freshly prepared meals for you",
    search: "Search your favourite food...",
    all: "All",
    veg: "Veg",
    nonveg: "Non-Veg",
    why: "Why Choose Ghar Ka Swad?",
    reviewTitle: "What Our Customers Say",
    reviewNote: "Customer reviews coming soon.",
    cart: "Cart",
    empty: "Your cart is empty.",
    checkout: "Complete Your Order",
    orderButton: "Send Order on WhatsApp",
    name: "Your Name",
    phone: "Phone Number",
    address: "Delivery Address"
  },

  hi: {
    home: "⌂ होम",
    kitchen: "हमारी रसोई",
    menu: "मेन्यू",
    delivery: "डिलीवरी",
    reviews: "रिव्यू",
    contact: "संपर्क",
    menuTitle: "हमारा खास मेन्यू",
    menuSubtitle: "आपके लिए ताज़ा बना खाना",
    search: "अपना पसंदीदा खाना खोजें...",
    all: "सभी",
    veg: "शाकाहारी",
    nonveg: "मांसाहारी",
    why: "Ghar Ka Swad क्यों चुनें?",
    reviewTitle: "हमारे ग्राहक क्या कहते हैं",
    reviewNote: "ग्राहकों के रिव्यू जल्द आएंगे।",
    cart: "कार्ट",
    empty: "आपका कार्ट खाली है।",
    checkout: "अपना ऑर्डर पूरा करें",
    orderButton: "WhatsApp पर ऑर्डर भेजें",
    name: "आपका नाम",
    phone: "फोन नंबर",
    address: "डिलीवरी का पता"
  },

  as: {
    home: "⌂ হোম",
    kitchen: "আমাৰ পাকঘৰ",
    menu: "মেনু",
    delivery: "ডেলিভাৰী",
    reviews: "মতামত",
    contact: "যোগাযোগ",
    menuTitle: "আমাৰ বিশেষ মেনু",
    menuSubtitle: "আপোনাৰ বাবে সতেজকৈ প্ৰস্তুত কৰা খাদ্য",
    search: "আপোনাৰ প্ৰিয় খাদ্য বিচাৰক...",
    all: "সকলো",
    veg: "নিৰামিষ",
    nonveg: "আমিষ",
    why: "Ghar Ka Swad কিয় বাছি ল'ব?",
    reviewTitle: "আমাৰ গ্ৰাহকে কি কয়",
    reviewNote: "গ্ৰাহকৰ মতামত অতি সোনকালে আহিব।",
    cart: "কাৰ্ট",
    empty: "আপোনাৰ কাৰ্ট খালী।",
    checkout: "অৰ্ডাৰ সম্পূৰ্ণ কৰক",
    orderButton: "WhatsApp ত অৰ্ডাৰ পঠাওক",
    name: "আপোনাৰ নাম",
    phone: "ফোন নম্বৰ",
    address: "ডেলিভাৰীৰ ঠিকনা"
  }
};

function changeLanguage(language) {
  const t = translations[language];
  if (!t) return;

  const nav = document.querySelectorAll(".navigation a");

  const navKeys = [
    "home",
    "kitchen",
    "menu",
    "delivery",
    "reviews",
    "contact"
  ];

  nav.forEach((link, index) => {
    link.textContent = t[navKeys[index]];
  });

  document.querySelector(".section-heading h2").textContent = t.menuTitle;
  document.querySelector(".section-heading p").textContent = t.menuSubtitle;
  document.getElementById("menuSearch").placeholder = t.search;

  document.querySelectorAll(".filter-btn").forEach(button => {
    button.textContent = t[button.dataset.filter];
  });

  document.querySelector(".why-content .section-heading h2").textContent = t.why;
  document.querySelector(".review-copy h2").textContent = t.reviewTitle;
  document.querySelector(".review-copy .review-note").textContent = t.reviewNote;

  document.getElementById("openCart").innerHTML =
    `🛒 ${t.cart} <b id="cartCount">${cart.reduce((sum, item) => sum + item.quantity, 0)}</b>`;

  document.querySelector(".cart-header h2").textContent = t.cart;
  document.querySelector(".empty-cart").textContent = t.empty;

  document.querySelector(".checkout-modal h2").textContent = t.checkout;
  document.querySelector('label[for="customerName"]').textContent = t.name;
  document.querySelector('label[for="customerPhone"]').textContent = t.phone;
  document.querySelector('label[for="customerAddress"]').textContent = t.address;
  document.querySelector("#checkoutForm button").textContent = t.orderButton;

  document.querySelectorAll(".languages button").forEach(button => {
    button.classList.toggle("active", button.dataset.lang === language);
  });

  document.documentElement.lang = language;
}

document.querySelectorAll(".languages button").forEach(button => {
  button.addEventListener("click", () => {
    changeLanguage(button.dataset.lang);
  });
});

// INITIAL CART
updateCart();
