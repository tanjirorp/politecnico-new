// Animaciones e interacciones
document.addEventListener('DOMContentLoaded', function() {
    // Revelar secciones al desplazarse
    const revealElements = document.querySelectorAll('.reveal');
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.8;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.classList.add('active');
                element.classList.add('show');
            }
        });
        
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.classList.add('show');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Verificar la carga de la página

    // Animación del contador de números
    const counters = document.querySelectorAll('.counter');
    
    function animateCounters() {
        counters.forEach(counter => {
            const elementTop = counter.getBoundingClientRect().top;
            const triggerBottom = window.innerHeight * 0.8;
            
            if (elementTop < triggerBottom && !counter.classList.contains('animate')) {
                counter.classList.add('animate');
                
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // ms
                const increment = target / (duration / 16); // Actualizar cada 16ms (60 fps)
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    
                    if (current < target) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            }
        });
    }
    
    window.addEventListener('scroll', animateCounters);
    setTimeout(animateCounters, 1000); // Retrasar la animación inicial

    // Animar barras de progreso
    const progressBars = document.querySelectorAll('.progress');
    
    function animateProgressBars() {
        progressBars.forEach(progress => {
            const elementTop = progress.getBoundingClientRect().top;
            const triggerBottom = window.innerHeight * 0.8;
            
            if (elementTop < triggerBottom && !progress.classList.contains('animate')) {
                const width = progress.style.width;
                progress.style.setProperty('--progress-width', width);
                progress.style.width += '0';
                
                setTimeout(() => {
                    progress.classList.add('animate');
                    progress.style.width = width;
                }, 100);
            }
        });
    }
    
    window.addEventListener('scroll', animateProgressBars);
    setTimeout(animateProgressBars, 1000); // Retrasar la animación inicial

    // Efecto de encabezado de paralaje
    const parallaxHeader = document.querySelector('.parallax-header');
    
    window.addEventListener('scroll', function() {
        if (parallaxHeader) {
            const scrollPosition = window.scrollY;
            parallaxHeader.style.backgroundPositionY = `${scrollPosition * 0.4}px`;
        }
    });

    // Control deslizante de testimonios
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    let currentSlide = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    
    function showSlide(n) {
        // Ocultar todos los testimonios
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
            testimonial.classList.remove('slide-right');
            testimonial.classList.remove('slide-left');
        });
        
        // Eliminar la clase activa de todos los puntos
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Calcular el índice considerando la naturaleza circular
        currentSlide = (n + testimonials.length) % testimonials.length;
        
        // Mostrar el testimonio actual con animación
        if (n > currentSlide) {
            testimonials[currentSlide].classList.add('slide-right');
        } else {
            testimonials[currentSlide].classList.add('slide-left');
        }
        
        testimonials[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Escuchadores de eventos para controles de testimonios
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Navegación por puntos
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Avance automático de diapositivas cada 5 segundos
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pausa el avance automático al pasar el cursor
    const testimonialContainer = document.querySelector('.testimonial-container');
    if (testimonialContainer) {
        testimonialContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        testimonialContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
        
        // Eventos táctiles para deslizar el dedo en el móvil
        testimonialContainer.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        testimonialContainer.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            nextSlide(); // Desliza hacia la izquierda
        } else if (touchEndX > touchStartX + swipeThreshold) {
            prevSlide(); // Desliza hacia la derecha
        }
    }

    // Animar los elementos de la galería
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.gallery-overlay').style.transform = 'translateY(0)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.gallery-overlay').style.transform = 'translateY(100%)';
        });
    });
});