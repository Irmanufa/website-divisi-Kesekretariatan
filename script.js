// ==========================================
// EMAILJS KONFIGURASI
// ==========================================
// INISIALISASI EMAILJS - DAFTAR GRATIS DI https://www.emailjs.com/
// GANTI "YOUR_PUBLIC_KEY" DENGAN PUBLIC KEY ANDA
emailjs.init("YOUR_PUBLIC_KEY");

// ==========================================
// SLIDESHOW OTOMATIS
// ==========================================
let slideIndex = 1;
let slideInterval;

function showSlides(n) {
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (let i = 0; i < slides.length; i++) slides[i].style.opacity = "0";
  for (let i = 0; i < dots.length; i++)
    dots[i].className = dots[i].className.replace(" active", "");

  slides[slideIndex - 1].style.opacity = "1";
  if (dots[slideIndex - 1]) dots[slideIndex - 1].className += " active";
}

function changeSlide(n) {
  clearInterval(slideInterval);
  showSlides((slideIndex += n));
  startAutoSlide();
}

function currentSlide(n) {
  clearInterval(slideInterval);
  showSlides((slideIndex = n));
  startAutoSlide();
}

function startAutoSlide() {
  slideInterval = setInterval(() => showSlides((slideIndex += 1)), 4000);
}

showSlides(slideIndex);
startAutoSlide();

// ==========================================
// MOBILE MENU
// ==========================================
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
if (menuToggle) menuToggle.onclick = () => navMenu.classList.toggle("active");

// ==========================================
// SMOOTH SCROLL
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      if (navMenu.classList.contains("active"))
        navMenu.classList.remove("active");
    }
  });
});

// ==========================================
// MODAL FUNCTIONS
// ==========================================
const modal = document.getElementById("notificationModal");
const errorModal = document.getElementById("errorModal");
const modalNama = document.getElementById("modalNama");
const errorMessage = document.getElementById("errorMessage");

function showModal() {
  modal.style.display = "flex";
  setTimeout(() => modal.classList.add("show"), 10);
}

function closeModal() {
  modal.classList.remove("show");
  setTimeout(() => (modal.style.display = "none"), 300);
}

function showErrorModal(message) {
  errorMessage.textContent = message || "Terjadi kesalahan. Silakan coba lagi.";
  errorModal.style.display = "flex";
  setTimeout(() => errorModal.classList.add("show"), 10);
}

function closeErrorModal() {
  errorModal.classList.remove("show");
  setTimeout(() => (errorModal.style.display = "none"), 300);
}

window.closeModal = closeModal;
window.closeErrorModal = closeErrorModal;

// ==========================================
// FORM DENGAN EMAILJS
// ==========================================
const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const email = document.getElementById("email").value;
    const pesan = document.getElementById("pesan").value;

    if (!nama || !email || !pesan) {
      showErrorModal("Harap isi semua field yang diperlukan!");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Mengirim...';

    // GANTI DENGAN EMAIL TUJUAN ANDA
    const templateParams = {
      from_name: nama,
      from_email: email,
      message: pesan,
      to_email: "irmanufa@example.com",
      reply_to: email,
    };

    try {
      // GANTI DENGAN SERVICE ID DAN TEMPLATE ID ANDA
      const response = await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        templateParams,
      );

      console.log("Email berhasil dikirim:", response);
      modalNama.textContent = nama;
      showModal();
      contactForm.reset();
    } catch (error) {
      console.error("Error mengirim email:", error);
      showErrorModal("Gagal mengirim pesan. Silakan coba lagi nanti.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Pesan';
    }
  });
}

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 2px 15px rgba(0,0,0,0.08)";
    navbar.style.background = "#ffffff";
  } else {
    navbar.style.boxShadow = "0 2px 15px rgba(0,0,0,0.03)";
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
  }
});

// ==========================================
// ACTIVE NAV LINK
// ==========================================
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-menu a");
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) current = section.getAttribute("id");
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`)
      link.classList.add("active");
  });
});

// ==========================================
// ANIMASI SCROLL FADE IN
// ==========================================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 },
);

document
  .querySelectorAll(
    ".tentang-card, .program-item, .jadwal-card, .galeri-item, .ketua-card",
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(25px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// ==========================================
// CONSOLE WELCOME
// ==========================================
console.log(
  "%c✨ IRMANUFA - Divisi Kesekretariatan ✨",
  "color: #2d6a4f; font-size: 14px; font-weight: bold;",
);
console.log(
  "%cIkatan Remaja Masjid Jami' Nurul Falah, Desa Ujungjaya",
  "color: #5a6e4a; font-size: 11px;",
);
console.log(
  "%cKetua Divisi: Chindy Kharisya Putri",
  "color: #f9d56e; font-size: 11px;",
);
