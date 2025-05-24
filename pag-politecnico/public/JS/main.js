// Espere a que el DOM se cargue completamente: ayuda con el preloader
// y la inicialización de los elementos de la página
document.addEventListener('DOMContentLoaded', function() {
    // Precargador de página
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        setTimeout(function() {
            preloader.style.opacity = '0';
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 500);
        }, 500);
    });

    // Alternar menú móvil: esta función solo se ejecuta si el menú móvil está presente
    // y se asegura de que el menú se cierre al hacer clic en un enlace de navegación
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Cerrar el menú móvil al hacer clic en un enlace de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Efecto de desplazamiento de la barra de navegación
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    
    // Desplácese por las secciones con un comportamiento fluido
    // Esto se aplica a los enlaces de navegación que apuntan a secciones de la misma página
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Actualizar el enlace de navegación activo al desplazarse
    const sections = document.querySelectorAll('section, header');
    
    function updateActiveNavLink() {
        let current = '';
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);

    // Botón volver al inicio
    const backToTop = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Opinion modal
    const opinionBtn = document.getElementById('opinion-btn');
    const opinionModal = document.getElementById('opinion-modal');
    const closeBtn = document.querySelector('.close-btn');
    const opinionForm = document.getElementById('opinionForm');
    const formMessage = document.getElementById('form-message');
    
    opinionBtn.addEventListener('click', function() {
        opinionModal.classList.add('show');
        setTimeout(() => {
            document.querySelector('.modal-content').style.opacity = 1;
            document.querySelector('.modal-content').style.transform = 'translateY(0)';
        }, 10);
    });
    
    function closeModal() {
        document.querySelector('.modal-content').style.opacity = 0;
        document.querySelector('.modal-content').style.transform = 'translateY(50px)';
        setTimeout(() => {
            opinionModal.classList.remove('show');
        }, 500);
    }
    
    closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal();
    });
    
    opinionModal.addEventListener('click', function(e) {
        if (e.target === opinionModal) {
            closeModal();
        }
    });
    
    opinionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        formMessage.textContent = 'Enviando...';
        
        const formData = new FormData(this);
        
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                formMessage.textContent = '¡Gracias por tu opinión!';
                formMessage.style.color = '#28a745';
                opinionForm.reset();
                setTimeout(closeModal, 2000);
            } else {
                throw new Error('Error al enviar el formulario');
            }
        })
        .catch(error => {
            formMessage.textContent = 'Hubo un error al enviar. Por favor, intenta de nuevo.';
            formMessage.style.color = '#dc3545';
        });
    });

    // Tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
});