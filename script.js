// Function: Toggle Light / Dark Theme across pages
function toggleTheme() {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  localStorage.setItem('themePreference', isLight ? 'light' : 'dark');
}

// Automatically load saved theme and saved gallery items on load
window.onload = function() {
  const savedTheme = localStorage.getItem('themePreference');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  }

  loadSavedOutfits();
};

// Designer Phone Number for WhatsApp Orders (Replace with your actual phone number with country code)
const DESIGNER_PHONE = "2348086714154";

// Function: Owner Upload New Male / Unisex Outfit
function handleProductUpload(event) {
  event.preventDefault();

  const title = document.getElementById('garmentTitle').value;
  // Default fallback image if no URL is provided (Male/Unisex suit style)
  const image = document.getElementById('garmentImg').value || 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800';
  const desc = document.getElementById('garmentDesc').value;

  if (!title || !desc) {
    alert("Please enter a garment title and description!");
    return;
  }

  const newGarment = { title, image, desc, rating: "5.0" };

  // Save to LocalStorage array so uploads persist across reloads
  let existingOutfits = JSON.parse(localStorage.getItem('customOutfits')) || [];
  existingOutfits.unshift(newGarment);
  localStorage.setItem('customOutfits', JSON.stringify(existingOutfits));

  // Display card immediately
  renderGarmentCard(newGarment, true);

  document.getElementById('uploadForm').reset();
  alert("Male/Unisex outfit successfully published and saved to gallery!");
}

// Helper Function: Render Product Card to DOM
function renderGarmentCard(garment, isNew = false) {
  const galleryGrid = document.getElementById('galleryGrid');
  if (!galleryGrid) return;

  const productCard = document.createElement('div');
  productCard.className = 'product-card';

  const encodedMsg = encodeURIComponent(`Hello Prestige Stitches, I would like to order/inquire about the "${garment.title}".`);
  const whatsappUrl = `https://wa.me/${DESIGNER_PHONE}?text=${encodedMsg}`;

  productCard.innerHTML = `
    <img src="${garment.image}" alt="${garment.title}">
    <h3>${garment.title}</h3>
    <p>${garment.desc}</p>
    <div class="stars" onclick="rateProduct(this)">⭐⭐⭐⭐⭐ (${garment.rating})</div>
    <a href="${whatsappUrl}" target="_blank" style="display:inline-block; margin-top:12px; padding:10px 18px; background-color:#22c55e; color:white; text-decoration:none; border-radius:6px; font-weight:bold;">Order on WhatsApp</a>
  `;

  if (isNew) {
    galleryGrid.prepend(productCard);
  } else {
    galleryGrid.appendChild(productCard);
  }
}

// Function: Load saved outfits from localStorage
function loadSavedOutfits() {
  const savedOutfits = JSON.parse(localStorage.getItem('customOutfits')) || [];
  savedOutfits.forEach(garment => renderGarmentCard(garment, false));
}

// Function: Interactive Rating System
function rateProduct(element) {
  let userRating = prompt("Rate this design from 1 to 5 stars:", "5");
  let ratingNum = parseInt(userRating);

  if (ratingNum >= 1 && ratingNum <= 5) {
    let starString = "⭐".repeat(ratingNum);
    element.innerText = `${starString} (${ratingNum}.0)`;
    alert("Thank you for rating Prestige Stitches!");
  } else if (userRating !== null) {
    alert("Please enter a number between 1 and 5.");
  }
}

// Function: Contact Form Validation
function handleContactSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById('contactName').value;
  const email = document.getElementById('contactEmail').value;
  const msg = document.getElementById('contactMsg').value;
  const status = document.getElementById('contactStatus');

  if (!name || !email || !msg) {
    status.innerText = "Please complete all fields!";
    status.style.color = "#ef4444";
    return;
  }

  status.innerText = `Thank you, ${name}! Your consultation request has been received.`;
  status.style.color = "#22c55e";
  document.getElementById('contactForm').reset();
}
