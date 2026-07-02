/**
 * NATALIA JAUREGUI | NATS TATTOOS - Interactive Landing Page Logic
 * Features: Scroll Effects, Mobile Navigation, Portfolio Filter, Lightbox, Step-by-Step Booking Form, Aftercare Accordion, Reveal on Scroll
 */

// URL de tu aplicación web de Google Apps Script (¡Reemplázala con tu URL generada!)
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxJM51qSuGJdAD9gczt22NhTI9sBoZkiNDvChTp8Pye1lLxJBsf3YkvtMNxwRx57DiL/exec';

// Base de datos de Google Reviews - Curadas de 5 estrellas de texto completo
const GOOGLE_REVIEWS_DB = [
    {
        id: "review-1",
        authorName: "Andrés Felipe Gómez",
        authorAvatar: "A",
        rating: 5,
        relativeTime: "Hace 2 semanas",
        text: "El trabajo a color y anime de Natalia es increíble. Busqué mucho a la mejor artista en Bucaramanga y superó todas mis expectativas con el detalle de mi pieza en el antebrazo. Súper profesional, el estudio de tatuajes es impecable, limpio y seguro."
    },
    {
        id: "review-2",
        authorName: "Camila Restrepo",
        authorAvatar: "C",
        rating: 5,
        relativeTime: "Hace 1 mes",
        text: "Me hice un tatuaje personalizado fine line en el hombro. Los difuminados y el contraste son perfectos, súper limpios. La atención de Natalia Jauregui en Bucaramanga es de otro nivel, te asesora desde cero para crear arte exclusivo."
    },
    {
        id: "review-3",
        authorName: "Valeria Muñoz",
        authorAvatar: "V",
        rating: 5,
        relativeTime: "Hace 3 semanas",
        text: "Es mi primer tatuaje en Bucaramanga (un diseño conceptual a color de mi mascota). Tenía miedo del dolor, pero Natalia es una tatuadora profesional con excelente técnica y paciencia. El estudio cuenta con estándares quirúrgicos y sanó perfecto."
    },
    {
        id: "review-4",
        authorName: "Diego Alejandro Moreno",
        authorAvatar: "D",
        rating: 5,
        relativeTime: "Hace 2 meses",
        text: "Excelente experiencia con la tecnología de tatuajes sin dolor en Bucaramanga. Me hice un proyecto de sombras en el pecho en una sesión larga de 8 horas y casi no sentí molestia. La cicatrización con los insumos del estudio fue impecable."
    },
    {
        id: "review-5",
        authorName: "Mariana Silva",
        authorAvatar: "M",
        rating: 5,
        relativeTime: "Hace 1 mes",
        text: "El nivel de detalle y color de mi tatuaje de anime es espectacular. Es el mejor estudio de tatuajes personalizados en Bucaramanga. Natalia es una artista completa que domina el color y el diseño de autor. ¡Volveré sin duda!"
    },
    {
        id: "review-6",
        authorName: "Juan Carlos Ortega",
        authorAvatar: "J",
        rating: 5,
        relativeTime: "Hace 2 semanas",
        text: "Hacerme la espalda completa era un gran reto, pero la tecnología de control de dolor que maneja Natalia Jauregui en Bucaramanga hizo que fuera súper llevadero. Excelente trato, higiene inmejorable y el diseño de autor es de nivel internacional."
    },
    {
        id: "review-7",
        authorName: "Gabriela Suárez",
        authorAvatar: "G",
        rating: 5,
        relativeTime: "Hace 3 semanas",
        text: "Me encantó la consultoría de co-creación digital. Natalia escuchó mi idea y la convirtió en una pieza de autor en sombras que encaja perfecto con mi brazo. Es la mejor tatuadora profesional en Colombia."
    },
    {
        id: "review-8",
        authorName: "Sebastian Delgado",
        authorAvatar: "S",
        rating: 5,
        relativeTime: "Hace 1 mes",
        text: "Buscaba una tatuadora especializada en anime y color en Cabecera, Bucaramanga. El resultado con mi pieza a color de Goku es brutal. La calidad de los pigmentos es del top mundial, brilla increíble en la piel."
    },
    {
        id: "review-9",
        authorName: "Natalia Pérez",
        authorAvatar: "N",
        rating: 5,
        relativeTime: "Hace 2 meses",
        text: "La bioseguridad del estudio es impecable, parece un quirófano. Todo esterilizado, insumos premium y materiales veganos. El trato de Natalia y su equipo es súper profesional y te da mucha tranquilidad."
    },
    {
        id: "review-10",
        authorName: "Santiago Restrepo",
        authorAvatar: "S",
        rating: 5,
        relativeTime: "Hace 1 mes",
        text: "Increíble sesión sin dolor. Tenía dudas sobre la bomba de infusión pero funciona al 100%. Me hice una manga completa en sombras en Bucaramanga sin sufrir nada. El cuidado posterior que te entregan es una maravilla."
    },
    {
        id: "review-11",
        authorName: "Clara Inés Gómez",
        authorAvatar: "C",
        rating: 5,
        relativeTime: "Hace 3 semanas",
        text: "Excelente servicio de principio a fin. Natalia Jauregui no solo copia una imagen, crea una verdadera obra de arte adaptada a ti. La cámara hiperbárica redujo la inflamación del tatuaje de inmediato y sanó súper rápido."
    },
    {
        id: "review-12",
        authorName: "Mateo Villamizar",
        authorAvatar: "M",
        rating: 5,
        relativeTime: "Hace 2 semanas",
        text: "El mejor estudio en Bucaramanga para proyectos complejos. Natalia tiene una técnica en sombras que parece una fotografía impresa en la piel. Todo el kit de biocuidado es excelente, mantiene los colores vivos."
    },
    {
        id: "review-13",
        authorName: "Daniela Santos",
        authorAvatar: "D",
        rating: 5,
        relativeTime: "Hace 1 mes",
        text: "Su línea de ropa Apparel es genial, me compré un hoodie con un diseño exclusivo de Natalia en el estudio. Y del tatuaje ni hablar, me hice una pieza a color estilo anime en el brazo que llama la atención de todo el mundo."
    },
    {
        id: "review-14",
        authorName: "Alejandro Ruiz",
        authorAvatar: "A",
        rating: 5,
        relativeTime: "Hace 2 meses",
        text: "Gran profesional Natalia. Se nota la experiencia en cada trazo. Me hice una pieza conceptual fine line de un lobo en el antebrazo y quedó espectacular. El proceso de sanación fue impecable gracias a sus consejos."
    },
    {
        id: "review-15",
        authorName: "Diana Carolina Vargas",
        authorAvatar: "D",
        rating: 5,
        relativeTime: "Hace 3 semanas",
        text: "Totalmente recomendada. Si buscas exclusividad, Natalia es la opción. Co-creamos mi tatuaje con mis ideas y su visión artística, el resultado es único. La técnica de infusión para evitar el dolor es sencillamente espectacular."
    },
    {
        id: "review-16",
        authorName: "Luis Felipe Mendoza",
        authorAvatar: "L",
        rating: 5,
        relativeTime: "Hace 1 mes",
        text: "Estuve buscando en Google Maps el mejor estudio de tatuajes en Bucaramanga y llegué aquí por las excelentes opiniones. Confirmo que es 5 estrellas en todo. Profesionalismo, bioseguridad y talento inigualable de Natalia Jauregui."
    },
    {
        id: "review-17",
        authorName: "Sofía Alejandra Silva",
        authorAvatar: "S",
        rating: 5,
        relativeTime: "Hace 2 semanas",
        text: "La atención de Natalia en Cabecera es fantástica. El diseño personalizado a color de mi personaje de anime favorito en el brazo quedó hermoso y detallado. Un nivel de trazo asombroso. La curación fue rápida y sin ningún inconveniente."
    },
    {
        id: "review-18",
        authorName: "Felipe Calderón",
        authorAvatar: "F",
        rating: 5,
        relativeTime: "Hace 1 mes",
        text: "Hacerme mi tatuaje de anime con Natalia fue la mejor decisión. Capturó los detalles, las sombras y los colores con una fidelidad increíble. El estudio en Bucaramanga es de primer nivel, moderno y súper limpio."
    },
    {
        id: "review-19",
        authorName: "Isabella Marín",
        authorAvatar: "I",
        rating: 5,
        relativeTime: "Hace 2 meses",
        text: "Una artista excepcional. Natalia Jauregui se toma el tiempo de entender tu historia y plasmarla. Mi tatuaje representa mucho para mí y ella lo trató con un respeto y técnica impecable. La cámara hiperbárica acelera la curación muchísimo."
    },
    {
        id: "review-20",
        authorName: "Carlos Eduardo Bernal",
        authorAvatar: "C",
        rating: 5,
        relativeTime: "Hace 3 semanas",
        text: "El mejor sistema para tatuarse sin dolor. Estuve 7 horas en sesión y fue sumamente cómodo. Si vas a hacerte un formato grande como un body suit o espalda completa en Bucaramanga, este es el lugar y Natalia la mejor artista."
    },
    {
        id: "review-21",
        authorName: "Paola Andrea Cruz",
        authorAvatar: "P",
        rating: 5,
        relativeTime: "Hace 1 mes",
        text: "La crema de regeneración y los apósitos del kit de biocuidado son lo máximo. No me salió costra y curó perfecto. El diseño de autor de Natalia es inigualable, tiene un estilo de sombras y líneas finas muy suave y elegante."
    },
    {
        id: "review-22",
        authorName: "Ricardo Andrés Pinto",
        authorAvatar: "R",
        rating: 5,
        relativeTime: "Hace 2 semanas",
        text: "Excelente trato de Natalia y todo su equipo. El estudio de tatuajes en Cabecera cuenta con todas las normas higiénicas. El diseño de autor superó lo que imaginaba. Una artista de talla internacional aquí en Bucaramanga."
    },
    {
        id: "review-23",
        authorName: "Manuela Fernanda Castro",
        authorAvatar: "M",
        rating: 5,
        relativeTime: "Hace 1 mes",
        text: "Espectacular mi tatuaje de anime a color. La saturación de los pigmentos es perfecta. Natalia domina la técnica del color y el diseño personalizado de autor de una manera increíble. Sin duda volveré por mi próximo proyecto."
    },
    {
        id: "review-24",
        authorName: "José Luis Guerrero",
        authorAvatar: "J",
        rating: 5,
        relativeTime: "Hace 2 meses",
        text: "Mi primer gran proyecto (media manga de sombras y color). Estaba nervioso, pero Natalia Jauregui me guio con total profesionalismo. Cero dolor gracias a su tecnología de infusión y la cicatrización fue sumamente rápida. ¡Cinco estrellas merecidas!"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    let revealObserver;

    /* ==========================================
       1. Header Scroll Effect
       ========================================== */
    const header = document.getElementById('header');
    
    function checkHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', checkHeaderScroll);
    
    // Initial run on load
    checkHeaderScroll();

    // Bio "Leer más" Toggle
    const btnReadMore = document.getElementById('btn-read-more');
    const bioWrapper = document.querySelector('.bio-expandable-wrapper');
    if (btnReadMore && bioWrapper) {
        btnReadMore.addEventListener('click', () => {
            const isExpanded = bioWrapper.classList.contains('expanded');
            if (isExpanded) {
                bioWrapper.classList.remove('expanded');
                btnReadMore.innerHTML = 'Leer más <i class="fa-solid fa-chevron-down"></i>';
            } else {
                bioWrapper.classList.add('expanded');
                btnReadMore.innerHTML = 'Leer menos <i class="fa-solid fa-chevron-up"></i>';
            }
        });
    }


    /* ==========================================
       3. Portfolio Filter & Pagination
       ========================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioPrevBtn = document.getElementById('portfolio-prev');
    const portfolioNextBtn = document.getElementById('portfolio-next');
    const portfolioPaginationContainer = document.getElementById('portfolio-pagination-dots');

    let currentGalleryPage = 0;
    
    function getGalleryItemsPerPage() {
        if (window.innerWidth < 768) {
            return 2;
        } else {
            return 6;
        }
    }

    // Helper to get items matching current active filter
    function getFilteredGalleryItems() {
        const activeBtn = document.querySelector('.filter-btn.active');
        if (!activeBtn) return Array.from(portfolioItems);
        const filterValue = activeBtn.getAttribute('data-filter');
        
        return Array.from(portfolioItems).filter(item => {
            const categories = (item.getAttribute('data-category') || '').split(' ');
            return filterValue === 'all' || categories.includes(filterValue);
        });
    }

    // Get total pages for the current active filter
    function getGalleryTotalPages() {
        const filteredItems = getFilteredGalleryItems();
        return Math.ceil(filteredItems.length / getGalleryItemsPerPage());
    }

    // Render the active items for the current page
    function renderGallery() {
        const filteredItems = getFilteredGalleryItems();
        const totalPages = getGalleryTotalPages();

        // Adjust page index if it goes out of bounds
        if (currentGalleryPage >= totalPages) {
            currentGalleryPage = Math.max(0, totalPages - 1);
        }

        const startIdx = currentGalleryPage * getGalleryItemsPerPage();
        const endIdx = startIdx + getGalleryItemsPerPage();

        // Loop through all items and display/hide them appropriately
        portfolioItems.forEach(item => {
            const isMatch = filteredItems.includes(item);
            const matchIdx = filteredItems.indexOf(item);
            const isOnPage = matchIdx >= startIdx && matchIdx < endIdx;

            if (isMatch && isOnPage) {
                // If it was hidden, display first then animate opacity
                if (item.style.display === 'none' || !item.style.display) {
                    item.style.display = 'block';
                }
                // Trigger reflow/animation
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                // Hide with transition
                item.style.opacity = '0';
                item.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    // Only set display none if opacity is still 0 (prevents race conditions if pages are clicked quickly)
                    if (item.style.opacity === '0') {
                        item.style.display = 'none';
                    }
                }, 300); // matches CSS transition time
            }
        });

        // Update Prev/Next button states
        if (portfolioPrevBtn) {
            portfolioPrevBtn.disabled = currentGalleryPage === 0;
            // Hide arrows if only 1 page
            portfolioPrevBtn.style.display = totalPages <= 1 ? 'none' : 'flex';
        }
        if (portfolioNextBtn) {
            portfolioNextBtn.disabled = currentGalleryPage === totalPages - 1 || totalPages === 0;
            portfolioNextBtn.style.display = totalPages <= 1 ? 'none' : 'flex';
        }

        renderGalleryPaginationDots();
    }

    function renderGalleryPaginationDots() {
        if (!portfolioPaginationContainer) return;
        portfolioPaginationContainer.innerHTML = '';
        
        const totalPages = getGalleryTotalPages();
        if (totalPages <= 1) return; // No dots needed if 1 page or less

        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('span');
            dot.className = `portfolio-dot ${i === currentGalleryPage ? 'active' : ''}`;
            dot.setAttribute('data-page', i);
            dot.addEventListener('click', () => {
                goToGalleryPage(i);
            });
            portfolioPaginationContainer.appendChild(dot);
        }
    }

    function goToGalleryPage(pageIndex) {
        const totalPages = getGalleryTotalPages();
        if (pageIndex < 0 || pageIndex >= totalPages) return;
        
        currentGalleryPage = pageIndex;
        
        // Transition: slightly fade out grid
        const grid = document.querySelector('.portfolio-grid');
        if (grid) {
            grid.style.opacity = '0.7';
            setTimeout(() => {
                renderGallery();
                grid.style.opacity = '1';
            }, 150);
        } else {
            renderGallery();
        }
    }

    // Set up filter buttons events
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and add to clicked
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Reset to page 0 when filtering
            currentGalleryPage = 0;
            renderGallery();
        });
    });

    // Prev/Next buttons click events
    if (portfolioPrevBtn) {
        portfolioPrevBtn.addEventListener('click', () => {
            goToGalleryPage(currentGalleryPage - 1);
        });
    }

    if (portfolioNextBtn) {
        portfolioNextBtn.addEventListener('click', () => {
            goToGalleryPage(currentGalleryPage + 1);
        });
    }

    // Initial gallery render on load
    renderGallery();


    /* ==========================================
       4. Lightbox Modal
       ========================================== */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCat = document.getElementById('lightbox-cat');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    
    let currentImageIndex = 0;
    let visibleItemsArray = []; // keeps track of items that are currently visible (filtered)
    
    function getVisibleItems() {
        // Collect portfolio items that match the current active filter
        visibleItemsArray = getFilteredGalleryItems();
    }
    
    function openLightbox(itemElement) {
        getVisibleItems();
        currentImageIndex = visibleItemsArray.indexOf(itemElement);
        
        updateLightboxContent(itemElement);
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function updateLightboxContent(itemElement) {
        const img = itemElement.querySelector('img');
        const title = itemElement.querySelector('.item-title').textContent;
        const category = itemElement.querySelector('.item-category').textContent;
        
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxTitle.textContent = title;
        lightboxCat.textContent = category;
    }
    
    function navigateLightbox(direction) {
        if (visibleItemsArray.length <= 1) return;
        
        if (direction === 'next') {
            currentImageIndex = (currentImageIndex + 1) % visibleItemsArray.length;
        } else if (direction === 'prev') {
            currentImageIndex = (currentImageIndex - 1 + visibleItemsArray.length) % visibleItemsArray.length;
        }
        
        const nextItem = visibleItemsArray[currentImageIndex];
        
        // Soft animation out & in
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            updateLightboxContent(nextItem);
            lightboxImg.style.opacity = '1';
        }, 150);
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Attach event listeners to portfolio items
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => openLightbox(item));
    });
    
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', () => navigateLightbox('next'));
    if (lightboxPrev) lightboxPrev.addEventListener('click', () => navigateLightbox('prev'));
    
    // Close lightbox on click outside image
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') navigateLightbox('next');
        if (e.key === 'ArrowLeft') navigateLightbox('prev');
    });

    /* ==========================================
       3.5. Services & Products Tabs
       ========================================== */
    const tabBtns = document.querySelectorAll('.services-tabs .tab-btn');
    const tabContents = document.querySelectorAll('.services-content-wrapper .tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and add to current
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const tabId = btn.getAttribute('data-tab');

            // Show matching content, hide others
            tabContents.forEach(content => {
                if (content.id === `tab-${tabId}`) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });


    /* ==========================================
       5. Multi-step Booking Form (Wizard)
       ========================================== */


    const bookingWizard = document.querySelector('.booking-wizard');
    const bookingForm = document.getElementById('booking-form');
    const steps = document.querySelectorAll('.wizard-steps .step');
    const wizardContents = document.querySelectorAll('.wizard-content');
    const nextBtns = document.querySelectorAll('.next-step');
    const prevBtns = document.querySelectorAll('.prev-step');
    const fileInput = document.getElementById('tattoo-refs');
    const fileList = document.getElementById('file-list');
    const wizardStatus = document.getElementById('wizard-status');
    const statusLoading = document.getElementById('status-loading');
    const statusSuccess = document.getElementById('status-success');
    const resetWizardBtn = document.getElementById('btn-reset-wizard');
    const btnConfirmScheduling = document.getElementById('btn-confirm-scheduling');
    const successCalendarView = document.getElementById('success-calendar-view');
    const successFinalView = document.getElementById('success-final-view');
    
    let currentStep = 1;
    let selectedFiles = []; // to hold reference files
    
    function updateStepIndicator() {
        steps.forEach((step, idx) => {
            const stepNum = idx + 1;
            step.classList.remove('active', 'completed');
            
            if (stepNum === currentStep) {
                step.classList.add('active');
            } else if (stepNum < currentStep) {
                step.classList.add('completed');
            }
        });
    }
    
    function showWizardContent() {
        wizardContents.forEach(content => {
            content.classList.remove('active');
            if (parseInt(content.getAttribute('data-step')) === currentStep) {
                content.classList.add('active');
            }
        });
    }
    
    function validateStep(step) {
        let isValid = true;
        const currentContainer = document.querySelector(`.wizard-content[data-step="${step}"]`);
        
        // Select required inputs in current container
        const requiredInputs = currentContainer.querySelectorAll('[required]');
        
        requiredInputs.forEach(input => {
            const formGroup = input.closest('.form-group');
            
            if (input.type === 'checkbox') {
                if (!input.checked) {
                    formGroup.classList.add('error');
                    isValid = false;
                } else {
                    formGroup.classList.remove('error');
                }
            } else if (input.tagName === 'SELECT') {
                if (!input.value) {
                    formGroup.classList.add('error');
                    isValid = false;
                } else {
                    formGroup.classList.remove('error');
                }
            } else if (input.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value.trim())) {
                    formGroup.classList.add('error');
                    isValid = false;
                } else {
                    formGroup.classList.remove('error');
                }
            } else {
                if (!input.value.trim()) {
                    formGroup.classList.add('error');
                    isValid = false;
                } else {
                    formGroup.classList.remove('error');
                }
            }
        });
        
        return isValid;
    }
    
    // Next Step handler
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                updateStepIndicator();
                showWizardContent();
            }
        });
    });
    
    // Previous Step handler
    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentStep--;
            updateStepIndicator();
            showWizardContent();
        });
    });
    
    // Input event to clear error styling on user input
    bookingForm.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('input', () => {
            const formGroup = input.closest('.form-group');
            if (formGroup && formGroup.classList.contains('error')) {
                formGroup.classList.remove('error');
            }
        });
        
        if (input.tagName === 'SELECT' || input.type === 'checkbox') {
            input.addEventListener('change', () => {
                const formGroup = input.closest('.form-group');
                if (formGroup) formGroup.classList.remove('error');
            });
        }
    });
    
    // File Upload Feedback
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            const files = Array.from(e.target.files);
            
            files.forEach(file => {
                // Check if file is already added
                if (selectedFiles.some(f => f.name === file.name && f.size === file.size)) return;
                
                selectedFiles.push(file);
                
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                
                // Human readable file size
                const sizeKB = (file.size / 1024).toFixed(1);
                
                const spanInfo = document.createElement('span');
                const icon = document.createElement('i');
                icon.className = 'fa-regular fa-image';
                spanInfo.appendChild(icon);
                spanInfo.appendChild(document.createTextNode(` ${file.name} (${sizeKB} KB)`));
                
                const spanRemove = document.createElement('span');
                spanRemove.className = 'file-item-remove';
                spanRemove.setAttribute('data-name', file.name);
                const trashIcon = document.createElement('i');
                trashIcon.className = 'fa-solid fa-trash-can';
                spanRemove.appendChild(trashIcon);
                
                fileItem.appendChild(spanInfo);
                fileItem.appendChild(spanRemove);
                
                fileList.appendChild(fileItem);
            });
            
            // Re-bind remove events
            bindFileRemoveEvents();
        });
    }
    
    function bindFileRemoveEvents() {
        const removeBtns = fileList.querySelectorAll('.file-item-remove');
        removeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const fileName = btn.getAttribute('data-name');
                selectedFiles = selectedFiles.filter(f => f.name !== fileName);
                btn.closest('.file-item').remove();
            });
        });
    }
    
    // Helper para redimensionar y comprimir imágenes antes de convertirlas a Base64 (evita fallos de Google Apps Script por tamaño de archivo)
    function compressAndResizeImage(file) {
        return new Promise((resolve, reject) => {
            if (!file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    resolve({
                        name: file.name,
                        type: file.type,
                        base64: reader.result.split(',')[1]
                    });
                };
                reader.onerror = error => reject(error);
                return;
            }

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    const max_size = 1024; // Redimensionar si supera 1024px

                    if (width > height) {
                        if (width > max_size) {
                            height *= max_size / width;
                            width = max_size;
                        }
                    } else {
                        if (height > max_size) {
                            width *= max_size / height;
                            height = max_size;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    // Comprimir como JPEG al 70% de calidad para reducir dramáticamente el peso
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                    const base64String = dataUrl.split(',')[1];

                    resolve({
                        name: file.name.replace(/\.[^/.]+$/, "") + ".jpg",
                        type: 'image/jpeg',
                        base64: base64String
                    });
                };
                img.onerror = error => reject(error);
                img.src = event.target.result;
            };
            reader.onerror = error => reject(error);
        });
    }

    // Form Submit
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateStep(currentStep)) {
            // Validar que la URL esté configurada
            if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes('AQUÍ_VA_TU_URL')) {
                alert('Por favor, configura la URL de tu Google Apps Script en la línea 6 de script.js antes de enviar la cotización.');
                return;
            }

            // Mostrar estado de carga
            wizardStatus.classList.add('active');
            statusLoading.classList.add('active');
            statusSuccess.classList.remove('active');
            
            const loadingText = statusLoading.querySelector('p');
            const originalLoadingText = loadingText ? loadingText.innerHTML : '';
            if (loadingText && selectedFiles.length > 0) {
                loadingText.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Procesando imágenes de referencia y enviando datos...';
            }

            // Recopilar los datos del formulario
            const formData = {
                style: document.getElementById('tattoo-style').value,
                description: document.getElementById('tattoo-desc').value,
                placement: document.getElementById('tattoo-placement').value,
                size: document.getElementById('tattoo-size').value,
                color: document.querySelector('input[name="tattoo-color"]:checked')?.value || 'black-grey',
                clientName: document.getElementById('client-name').value,
                clientInstagram: document.getElementById('client-instagram').value || 'No proporcionado',
                clientEmail: document.getElementById('client-email').value,
                clientPhone: document.getElementById('client-phone').value,
                references: []
            };

            // Comprimir y convertir imágenes a base64 si existen
            const filePromises = selectedFiles.map(file => compressAndResizeImage(file));

            Promise.all(filePromises)
                .then(base64Files => {
                    formData.references = base64Files;

                    // Enviar datos usando fetch.
                    // Usamos text/plain como Content-Type para evitar peticiones OPTIONS (preflight) que a veces tienen problemas de CORS en Apps Script
                    return fetch(GOOGLE_SCRIPT_URL, {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'text/plain;charset=utf-8'
                        },
                        body: JSON.stringify(formData)
                    });
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('La respuesta del servidor de Google no fue correcta.');
                    }
                    return response.json();
                })
                .then(resData => {
                    if (resData.status === 'success') {
                        // Limpiar contenedor e inicializar el widget oficial de Calendly
                        const container = document.getElementById('calendly-embed-container');
                        if (container) {
                            container.innerHTML = '';
                            const clientName = document.getElementById('client-name').value;
                            const clientEmail = document.getElementById('client-email').value;
                            
                            Calendly.initInlineWidget({
                                url: 'https://calendly.com/nats-jauregui/30min?hide_gdpr_banner=1&locale=es',
                                parentElement: container,
                                prefill: {
                                    name: clientName,
                                    email: clientEmail
                                },
                                locale: 'es',
                                embed_locale: 'es'
                            });
                        }

                        if (bookingWizard) bookingWizard.classList.add('submitted');
                        statusLoading.classList.remove('active');
                        if (successCalendarView) successCalendarView.style.display = 'block';
                        if (successFinalView) successFinalView.style.display = 'none';
                        statusSuccess.classList.add('active');
                    } else {
                        throw new Error(resData.message || 'Error desconocido al registrar en Google Sheets.');
                    }
                })
                .catch(error => {
                    console.error('Error al enviar el formulario:', error);
                    
                    // Ocultar overlay de carga y alertar al usuario
                    wizardStatus.classList.remove('active');
                    alert('Hubo un inconveniente al enviar tu cotización automáticamente a Google Sheets:\n\n' + error.message + '\n\nPor favor, verifica la conexión e intenta de nuevo, o contáctanos directamente a través de WhatsApp.');
                })
                .finally(() => {
                    if (loadingText && originalLoadingText) {
                        loadingText.innerHTML = originalLoadingText;
                    }
                });
        }
    });
    
    // Escuchar el evento de reserva exitosa emitido por Calendly para hacer la transición automática
    window.addEventListener('message', (e) => {
        let data = e.data;
        if (typeof data === 'string') {
            try {
                data = JSON.parse(data);
            } catch (err) {
                // Ignorar errores de parseo de otros mensajes
            }
        }
        
        if (e.origin.includes('calendly.com') && data && data.event === 'calendly.event_scheduled') {
            if (successCalendarView) successCalendarView.style.display = 'none';
            if (successFinalView) successFinalView.style.display = 'block';
            
            // Scroll al inicio de la sección de cotización para que el mensaje de agradecimiento sea visible
            const bookingSection = document.getElementById('cotizar');
            if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // Reset Form Wizard
    if (resetWizardBtn) {
        resetWizardBtn.addEventListener('click', () => {
            // Clear inputs
            bookingForm.reset();
            while (fileList.firstChild) {
                fileList.removeChild(fileList.firstChild);
            }
            selectedFiles = [];
            
            // Reset state
            currentStep = 1;
            updateStepIndicator();
            showWizardContent();
            
            // Hide Status Overlay
            if (bookingWizard) bookingWizard.classList.remove('submitted');
            wizardStatus.classList.remove('active');
            statusLoading.classList.remove('active');
            statusSuccess.classList.remove('active');
            
            // Reset success sub-views
            if (successCalendarView) successCalendarView.style.display = 'block';
            if (successFinalView) successFinalView.style.display = 'none';
        });
    }


    /* ==========================================
       6. Accordion Toggles (FAQs)
       ========================================== */
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.closest('.accordion-item');
            const isActive = accordionItem.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                const content = item.querySelector('.accordion-content');
                content.style.maxHeight = null;
            });
            
            // Open clicked item if it wasn't already active
            if (!isActive) {
                accordionItem.classList.add('active');
                const content = accordionItem.querySelector('.accordion-content');
                // Set max-height to its scrollHeight
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
    
    // Set initial active state height for all active accordions on load
    const initialActives = document.querySelectorAll('.accordion-item.active .accordion-content');
    initialActives.forEach(content => {
        content.style.maxHeight = content.scrollHeight + 'px';
    });

    /* ==========================================
       6.5. Google Reviews Integration
       ========================================== */
    const reviewsContainer = document.getElementById('reviews-container');
    const reviewsPrevBtn = document.getElementById('reviews-prev');
    const reviewsNextBtn = document.getElementById('reviews-next');
    const paginationDotsContainer = document.getElementById('reviews-pagination-dots');

    let currentReviewPage = 0;
    
    function getReviewsPerPage() {
        if (window.innerWidth < 768) {
            return 2;
        } else {
            return 6;
        }
    }

    function getTotalPages() {
        return Math.ceil(GOOGLE_REVIEWS_DB.length / getReviewsPerPage());
    }

    function renderReviews() {
        if (!reviewsContainer) return;
        
        reviewsContainer.innerHTML = '';
        
        const perPage = getReviewsPerPage();
        const start = currentReviewPage * perPage;
        const end = start + perPage;
        const pageReviews = GOOGLE_REVIEWS_DB.slice(start, end);
        
        pageReviews.forEach((review, idx) => {
            const card = document.createElement('div');
            card.className = 'testimonial-card reveal-up';
            card.style.animationDelay = `${idx * 0.08}s`;
            
            // Stars HTML
            let starsHtml = '';
            for (let i = 0; i < review.rating; i++) {
                starsHtml += '<i class="fa-solid fa-star"></i>';
            }
            
            card.innerHTML = `
                <span class="card-google-badge"><i class="fa-brands fa-google"></i></span>
                <div class="reviewer-header">
                    <div class="reviewer-avatar">${review.authorAvatar}</div>
                    <div class="reviewer-info">
                        <h5>${review.authorName}</h5>
                        <div class="reviewer-meta">
                            <span class="verified-tag"><i class="fa-solid fa-circle-check"></i> Cliente Verificado</span>
                            <span class="review-date">• ${review.relativeTime}</span>
                        </div>
                    </div>
                </div>
                <div class="card-stars">
                    ${starsHtml}
                </div>
                <p class="testimonial-text">"${review.text}"</p>
            `;
            
            reviewsContainer.appendChild(card);
        });
        
        // Re-run Scroll Reveal Observer for new cards
        if ('IntersectionObserver' in window && revealObserver) {
            const newCards = reviewsContainer.querySelectorAll('.reveal-up');
            newCards.forEach(card => revealObserver.observe(card));
        } else {
            const newCards = reviewsContainer.querySelectorAll('.reveal-up');
            newCards.forEach(card => card.classList.add('revealed'));
        }
        
        renderPaginationDots();
    }

    function renderPaginationDots() {
        if (!paginationDotsContainer) return;
        
        paginationDotsContainer.innerHTML = '';
        const totalPages = getTotalPages();
        
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('span');
            dot.className = `review-dot ${i === currentReviewPage ? 'active' : ''}`;
            dot.setAttribute('data-page', i);
            dot.addEventListener('click', () => {
                goToPage(i);
            });
            paginationDotsContainer.appendChild(dot);
        }
    }

    function goToPage(pageIndex) {
        const totalPages = getTotalPages();
        if (pageIndex < 0 || pageIndex >= totalPages) return;
        
        currentReviewPage = pageIndex;
        
        // Fade-out animation for container transition
        reviewsContainer.style.opacity = '0';
        reviewsContainer.style.transform = 'translateY(10px)';
        reviewsContainer.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            renderReviews();
            reviewsContainer.style.opacity = '1';
            reviewsContainer.style.transform = 'translateY(0)';
        }, 300);
    }

    // Nav buttons events
    if (reviewsPrevBtn) {
        reviewsPrevBtn.addEventListener('click', () => {
            const totalPages = getTotalPages();
            const prevPage = (currentReviewPage - 1 + totalPages) % totalPages;
            goToPage(prevPage);
        });
    }

    if (reviewsNextBtn) {
        reviewsNextBtn.addEventListener('click', () => {
            const totalPages = getTotalPages();
            const nextPage = (currentReviewPage + 1) % totalPages;
            goToPage(nextPage);
        });
    }

    // Handle window resizing for responsive items count
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Ajustar página del portafolio si queda fuera de rango al redimensionar
            const galleryTotalPages = getGalleryTotalPages();
            if (currentGalleryPage >= galleryTotalPages) {
                currentGalleryPage = Math.max(0, galleryTotalPages - 1);
            }
            renderGallery();

            // Ajustar página de testimonios si queda fuera de rango
            const totalPages = getTotalPages();
            if (currentReviewPage >= totalPages) {
                currentReviewPage = Math.max(0, totalPages - 1);
            }
            renderReviews();
        }, 150);
    });

    // Initial render
    renderReviews();

    /* ==========================================
       6.8. VSL Experience Video Modal (HTML5 Video)
       ========================================== */
    const vslTrigger = document.getElementById('vsl-video-trigger');
    const videoModal = document.getElementById('video-modal');
    const closeVslBtn = document.getElementById('close-vsl-video');
    const vslModalBg = document.getElementById('video-modal-bg');
    const html5Video = document.getElementById('vsl-player');
    
    // Configuración de Video Modal (VSL)
    const VSL_CONFIG = {
        resetOnClose: true, // Si es true, el video vuelve al inicio (0s) al cerrar. Si es false, se pausa.
        stopOnClose: true   // Si es true, detiene la carga/reproducción por completo al cerrar.
    };

    // Inicializar el video silenciado para asegurar la reproducción autónoma
    if (html5Video) {
        html5Video.muted = true;
        html5Video.volume = 0;
    }

    function openVslModal() {
        if (!videoModal) return;
        
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Bloquear scroll del fondo
        
        if (html5Video) {
            // Siempre arrancar en silencio
            html5Video.muted = true;
            html5Video.volume = 0;
            
            if (VSL_CONFIG.resetOnClose) {
                html5Video.currentTime = 0;
            }
            
            html5Video.play().then(() => {
                // Esperar a que la ventana esté completamente abierta (400ms) para activar el sonido
                setTimeout(() => {
                    if (videoModal.classList.contains('active')) {
                        html5Video.muted = false;
                        html5Video.volume = 1.0;
                    }
                }, 400); // 400ms coincide con la transición CSS
            }).catch(error => {
                console.warn("Autoplay failed:", error);
            });
        }
    }

    function closeVslModal() {
        if (!videoModal) return;
        
        videoModal.classList.remove('active');
        document.body.style.overflow = ''; // Restaurar scroll del fondo
        
        if (html5Video) {
            // Silenciar inmediatamente para evitar ruidos residuales en la transición de salida
            html5Video.muted = true;
            html5Video.volume = 0;
            
            html5Video.pause();
            
            if (VSL_CONFIG.stopOnClose) {
                html5Video.currentTime = 0;
                // Forzar la descarga del video (detiene las peticiones de red del buffer)
                html5Video.load();
            }
        }
    }

    if (vslTrigger) {
        vslTrigger.addEventListener('click', openVslModal);
    }

    if (closeVslBtn) {
        closeVslBtn.addEventListener('click', closeVslModal);
    }

    if (vslModalBg) {
        vslModalBg.addEventListener('click', closeVslModal);
    }

    // Cerrar también con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (videoModal && videoModal.classList.contains('active') && e.key === 'Escape') {
            closeVslModal();
        }
    });

    /* ==========================================
       7. Scroll Reveal Animation (Intersection Observer)
       ========================================== */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    if ('IntersectionObserver' in window) {
        revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target); // trigger animation once
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px' // animate slightly before entering viewport
        });
        
        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('revealed'));
    }

    /* ==========================================
       8. Mobile Collapsible Cards & Features
       ========================================== */
    const collapsibles = document.querySelectorAll('.mobile-collapsible');
    collapsibles.forEach(item => {
        const header = item.querySelector('.feature-header-mobile, .card-header-mobile');
        const content = item.querySelector('.card-collapse-content');
        
        if (!content) return;
        
        const toggleHandler = (e) => {
            if (window.innerWidth >= 768) return; // Only toggle on mobile
            
            // Prevent toggling when clicking links/buttons inside the header/card
            if (e.target.closest('a') || e.target.closest('button:not(.card-toggle-btn)')) {
                return;
            }
            
            const isExpanded = item.classList.contains('expanded');
            
            if (isExpanded) {
                item.classList.remove('expanded');
                content.style.maxHeight = null;
            } else {
                item.classList.add('expanded');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        };
        
        if (header) {
            header.addEventListener('click', toggleHandler);
        }
    });

    // Clean up inline styles on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            document.querySelectorAll('.mobile-collapsible').forEach(item => {
                item.classList.remove('expanded');
                const content = item.querySelector('.card-collapse-content');
                if (content) {
                    content.style.maxHeight = null;
                }
            });
        }
    });

});
