// Function: Toggle Light / Dark Theme across all pages
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

// Official Designer WhatsApp Phone Number
const DESIGNER_PHONE = "2348086714154";

// Secret Admin Passcode for Designer Portal
const DESIGNER_PASSCODE = "prestige2026";

// Function: Prompt for password and toggle portal visibility
function unlockDesignerPortal(event) {
  event.preventDefault();
  
  const portal = document.getElementById('designerPortal');
  if (!portal) return;

  if (portal.style.display === "block") {
    portal.style.display = "none";
    alert("Designer Portal hidden.");
    return;
  }

  const userPassword = prompt("Enter Designer Passcode to access upload form:");

  if (userPassword === DESIGNER_PASSCODE) {
    portal.style.display = "block";
    alert("Access granted! You can now publish new garments to the gallery.");
    portal.scrollIntoView({ behavior: 'smooth' });
  } else if (userPassword !== null) {
    alert("Incorrect passcode! Access denied.");
  }
}

// Function: Designer Upload New Garment with Local File Reader
function handleProductUpload(event) {
  event.preventDefault();

  const title = document.getElementById('garmentTitle').value;
  const fileInput = document.getElementById('garmentFile');
  const desc = document.getElementById('garmentDesc').value;

  if (!title || !desc || !fileInput.files[0]) {
    alert("Please select a photo file and complete all fields!");
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  // Read selected image file as a Data URL
  reader.onload = function(e) {
    const imageSrc = e.target.result;
    const newGarment = { title, image: imageSrc, desc, rating: "5.0" };

    // Save to local storage array
    let existingOutfits = JSON.parse(localStorage.getItem('customOutfits')) || [];
    existingOutfits.unshift(newGarment);
    localStorage.setItem('customOutfits', JSON.stringify(existingOutfits));

    // Render newly created card to the gallery grid
    renderGarmentCard(newGarment, true);

    document.getElementById('uploadForm').reset();
    alert("Garment photo and details successfully published!");
  };

  reader.readAsDataURL(file);
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

// Function: Interactive Star Rating System
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

// Function: Process Bespoke Measurement & Contact Submission to WhatsApp
function handleContactSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('contactName').value;
  const email = document.getElementById('contactEmail').value;
  const garment = document.getElementById('garmentType') ? document.getElementById('garmentType').value : 'General Inquiry';
  const chest = document.getElementById('chestSize') ? document.getElementById('chestSize').value : 'N/A';
  const waist = document.getElementById('waistSize') ? document.getElementById('waistSize').value : 'N/A';
  const shoulder = document.getElementById('shoulderSize') ? document.getElementById('shoulderSize').value : 'N/A';
  const sleeve = document.getElementById('sleeveSize') ? document.getElementById('sleeveSize').value : 'N/A';
  const notes = document.getElementById('contactMsg').value || 'None';
  const status = document.getElementById('contactStatus');

  if (!name || !email) {
    status.innerText = "Please complete your name and contact details!";
    status.style.color = "#ef4444";
    return;
  }

  // Format WhatsApp Message
  const textMessage = `Hello Prestige Stitches!%0A%0A*New Bespoke Order Inquiry*%0A` +
    `👤 *Name:* ${encodeURIComponent(name)}%0A` +
    `📞 *Contact:* ${encodeURIComponent(email)}%0A` +
    `✂️ *Garment Style:* ${encodeURIComponent(garment)}%0A%0A` +
    `📐 *Measurements (Inches):*%0A` +
    `- Chest: ${chest}"%0A` +
    `- Waist: ${waist}"%0A` +
    `- Shoulder: ${shoulder}"%0A` +
    `- Sleeve: ${sleeve}"%0A%0A` +
    `📝 *Additional Notes:* ${encodeURIComponent(notes)}`;

  const whatsappLink = `https://wa.me/${DESIGNER_PHONE}?text=${textMessage}`;

  status.innerText = `Redirecting ${name} to WhatsApp to send measurements...`;
  status.style.color = "#22c55e";

  setTimeout(() => {
    window.open(whatsappLink, '_blank');
  }, 1000);
      }
                                                                               
