// anima.js
'use strict';

const modal = document.getElementById('cardsModal');
const closeBtn = modal.querySelector('.close');
const container = document.getElementById('modalCardsContainer');

let photoIndex = 0;// índice global para AMBOS modales
/* ============================
      LISTA DE IMÁGENES
============================ */
const photoList = [
    "Fotos/ZTimon.jpg",
    "Fotos/Moha.jpg",
    "Fotos/MohaY.jpg",
    "Fotos/zeta.jpg",
    "Fotos/Paisaje.jpg",
    "Fotos/Quantum.jpg",
    "Fotos/Rosa.jpg",
    "Fotos/Bestia.jpg",
    "Fotos/Panthro.jpg",
    "Fotos/CelsoP.jpg"

];
let modalOpen = false;
let zoomOpen = false;

function showPhoto() {
    document.getElementById("carouselImage").src = photoList[photoIndex];
}

function nextImage() {
    photoIndex = (photoIndex + 1) % photoList.length;
    showPhoto();
}

function prevImage() {
    photoIndex = (photoIndex - 1 + photoList.length) % photoList.length;
    showPhoto();
}


/* ---------------- MODAL PRINCIPAL ---------------- */

function openPhotoModal() {
    document.getElementById("photoModal").style.display = "flex";
    showPhoto();
}

function closePhotoModal() {
    document.getElementById("photoModal").style.display = "none";
}

/* ---------------- MODAL ZOOM ---------------- */

function openImageZoom(src) {
    document.getElementById("zoomImg").src = src;
    document.getElementById("zoomModal").style.display = "flex";
}

function closeZoomModal() {
    document.getElementById("zoomModal").style.display = "none";
}

/* --- FUNCIÓN GENERAL PARA ABRIR MODAL --- */
function openProjectsFromCard(card) {
    const projects = JSON.parse(card.getAttribute('data-projects'));

    container.innerHTML = '';

    projects.forEach(p => {
        const div = document.createElement('div');
        div.className = 'project-card-modal bg-white rounded-xl shadow-lg overflow-hidden';
        div.innerHTML = `
            <img src="${p.img}" class="w-full" />
            <div class="p-4">
                <h4 class="text-lg font-semibold mb-2">${p.title}</h4>
                <p class="text-gray-700 mb-4">${p.desc}</p>
                <button class="bg-blue-600 text-white px-4 py-2 rounded"
                    onclick="window.open('${p.video}', '_blank')">
                    Ver Demo
                </button>
            </div>
        `;
        container.appendChild(div);
    });

    modal.style.display = 'flex';
}

/* ---------------- CARRUSEL DEL ZOOM ---------------- */

let zoomIndex = 0;

function openImageZoom(index) {
    zoomIndex = index;
    document.getElementById("zoomModal").style.display = "flex";
    loadZoomImage();
}

function loadZoomImage() {
    const img = document.getElementById("zoomCarouselImage");
    img.src = photoList[zoomIndex];

    // Actualizar dots
    const dotsContainer = document.getElementById("zoomDots");
    dotsContainer.innerHTML = "";

    photoList.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.className = `w-3 h-3 rounded-full cursor-pointer ${
            i === zoomIndex ? "bg-blue-600" : "bg-gray-400"
        }`;
        dot.onclick = () => { zoomIndex = i; loadZoomImage(); };
        dotsContainer.appendChild(dot);
    });
}

function nextZoomImage() {
    zoomIndex = (zoomIndex + 1) % photoList.length;
    loadZoomImage();
}

function prevZoomImage() {
    zoomIndex = (zoomIndex - 1 + photoList.length) % photoList.length;
    loadZoomImage();
}

function closeZoomModal() {
    document.getElementById("zoomModal").style.display = "none";
}
/* --- CLICK EN TARJETAS --- */
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => openProjectsFromCard(card));
});

/* --- CLICK EN BOTÓN DENTRO DEL OVERLAY --- */
function openModalFromButton(btn) {
    const card = btn.closest('.project-card'); // tarjeta padre
    openProjectsFromCard(card);
}

/* --- CERRAR MODAL --- */
closeBtn.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });
       
// ==============================
// MOBILE MENU
// ==============================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// ==============================
// TYPING EFFECT 
// ==============================
const typingElement = document.getElementById('typing-name');
const names = ['Josué Puente', 'Lic. Multimedia y Animación Digital', 'Diseñador Gráfico', 'Diseñador 3D', 'Editor de Video'];

let nameIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingElement) return;

    const currentName = names[nameIndex];

    if (isDeleting) {
        // Borrando
        charIndex = Math.max(0, charIndex - 1);
        typingElement.textContent = currentName.substring(0, charIndex);
    } else {
        // Escribiendo
        charIndex = Math.min(currentName.length, charIndex + 1);
        typingElement.textContent = currentName.substring(0, charIndex);
    }

    // Pausas y cambio de modo
    if (!isDeleting && charIndex === currentName.length) {
        // Pausa al terminar de escribir, luego empezar a borrar
        setTimeout(() => {
            isDeleting = true;
            typeEffect();
        }, 2000);
        return;
    } else if (isDeleting && charIndex === 0) {
        // Cuando ya borró todo, pasar al siguiente nombre
        isDeleting = false;
        nameIndex = (nameIndex + 1) % names.length;
        setTimeout(typeEffect, 300);
        return;
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

// Arrancar typing si existe el elemento
if (typingElement) typeEffect();

// ==============================
// SMOOTH SCROLL
// ==============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            if (mobileMenu) mobileMenu.classList.add('hidden');
        }
    });
});

// ==============================
// ANIMACIÓN DE BARRAS DE HABILIDAD
// ==============================
function animateSkillBars() {
    document.querySelectorAll('.skill-progress').forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) bar.style.width = width + '%';
    });
}

// ==============================
// INTERSECTION OBSERVER
// ==============================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');

            if (entry.target.closest && entry.target.closest('#habilidades')) {
                setTimeout(animateSkillBars, 500);
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.section-reveal').forEach(section => {
    observer.observe(section);
});

// ==============================
// SCROLL NAV SHADOW & PARALLAX HERO
// ==============================
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (nav) {
        if (window.scrollY > 100) nav.classList.add('shadow-lg');
        else nav.classList.remove('shadow-lg');
    }

    const parallax = document.querySelector('#inicio');
    if (parallax) {
        const scrolled = window.pageYOffset;
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});




function openModalPagWeb(videoUrl) {
    const modal = document.getElementById('videoModalPagWeb');
    const videoFrame = document.getElementById('videoFramePagWeb');
    videoFrame.src = videoUrl; // Establecer la URL del video
    modal.classList.remove('hidden'); // Mostrar el modal
}

document.getElementById('closeModalPagWeb').addEventListener('click', function() {
    const modal = document.getElementById('videoModalPagWeb');
    const videoFrame = document.getElementById('videoFramePagWeb');
    videoFrame.src = ""; // Limpiar la URL del video
    modal.classList.add('hidden'); // Ocultar el modal
});




function openModalFb(videoUrl) {
    const modal = document.getElementById('videoModalFb');
    const videoFrame = document.getElementById('videoFrameFb');
    videoFrame.src = videoUrl; // Establecer la URL del video
    modal.classList.remove('hidden'); // Mostrar el modal
}

document.getElementById('closeModalFb').addEventListener('click', function() {
    const modal = document.getElementById('videoModalFb');
    const videoFrame = document.getElementById('videoFrameFb');
    videoFrame.src = ""; // Limpiar la URL del video
    modal.classList.add('hidden'); // Ocultar el modal
});

function openModalTresProyectos() {
    document.getElementById("modalTresProyectos").classList.remove("hidden");
}

function closeModalTresProyectos() {
    document.getElementById("modalTresProyectos").classList.add("hidden");
}

// --- Modal de video ---
function openModalVideo(url) {
    document.getElementById("videoFrame").src = url;
    document.getElementById("videoModal").classList.remove("hidden");
}

function closeModalVideo() {
    document.getElementById("videoFrame").src = "";
    document.getElementById("videoModal").classList.add("hidden");
}


/* ============================
      ABRIR / CERRAR MODAL PRINCIPAL FOTOS
============================ */
function openPhotoModal(index = 0) {
    photoIndex = index;
    updateMainCarousel();
    document.getElementById("photoModal").style.display = "flex";
    modalOpen = true;
}

function closePhotoModal() {
    document.getElementById("photoModal").style.display = "none";
    modalOpen = false;
}

/* ============================
      CARRUSEL PRINCIPAL
============================ */
function updateMainCarousel() {
    document.getElementById("carouselImage").src = photoList[photoIndex];
}

function nextImage() {
    photoIndex = (photoIndex + 1) % photoList.length;
    updateMainCarousel();
}

function prevImage() {
    photoIndex = (photoIndex - 1 + photoList.length) % photoList.length;
    updateMainCarousel();
}

/* ============================
      ABRIR / CERRAR ZOOM
============================ */
function openImageZoom(index) {
    photoIndex = index; // sincroniza
    updateZoomImage();
    document.getElementById("zoomModal").style.display = "flex";
    zoomOpen = true;
}

function closeZoomModal() {
    document.getElementById("zoomModal").style.display = "none";
    updateMainCarousel(); // mantiene la última imagen al regresar
    zoomOpen = false;
}

/* ============================
      CARRUSEL ZOOM
============================ */
function updateZoomImage() {
    document.getElementById("zoomCarouselImage").src = photoList[photoIndex];
}

function nextZoomImage() {
    photoIndex = (photoIndex + 1) % photoList.length;
    updateZoomImage();
}

function prevZoomImage() {
    photoIndex = (photoIndex - 1 + photoList.length) % photoList.length;
    updateZoomImage();
}

/* ============================
      FLECHAS DEL TECLADO
============================ */
document.addEventListener("keydown", function(e) {
    
    // Mover solo si un modal está abierto
    if (!modalOpen && !zoomOpen) return;

    if (e.key === "ArrowRight") {
        if (zoomOpen) nextZoomImage();
        else nextImage();
    }

    if (e.key === "ArrowLeft") {
        if (zoomOpen) prevZoomImage();
        else prevImage();
    }

    if (e.key === "Escape") {
        if (zoomOpen) closeZoomModal();
        else closePhotoModal();
    }
});


const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: { el: '.swiper-pagination', clickable: true },
  });