// --- Select all cards ---
const cards = document.querySelectorAll(".card");

// --- Scroll fade in/out ---
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const ratio = entry.intersectionRatio;
    entry.target.style.opacity = 0.6 + 0.4*ratio;
  });
}, { threshold: Array.from({length:101}, (_,i)=>i/100) });

cards.forEach(card => observer.observe(card));

// --- Certificate popup ---
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const closeBtn = document.getElementById("close");

document.querySelectorAll(".view-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    e.stopPropagation();
    const cert = btn.getAttribute("data-cert");
    if(cert){
      popupImg.src = cert;
      popup.style.display = "flex";
      document.body.classList.add("popup-open"); // lock scroll
    }
  });
});

// Close popup
function closePopup() {
  popup.style.display = "none";
  popupImg.src = "";
  document.body.classList.remove("popup-open"); // unlock scroll
}

// Close only via close button
closeBtn.addEventListener("click", closePopup);

// Close popup when clicking outside the certificate image
popup.addEventListener("click", e => {
  if(e.target === popup) closePopup();
});

