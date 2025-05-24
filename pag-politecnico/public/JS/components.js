// Funcionalidad específica del componente
document.addEventListener('DOMContentLoaded', function() {
    // Botones de información para cursos
    const infoButtons = document.querySelectorAll('.btn-outline');
    
    infoButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parentCard = this.closest('.card');
            const courseTitle = parentCard.querySelector('h3').textContent;
            
            alert(`Próximamente más información sobre la carrera de ${courseTitle}. ¡Estamos preparando contenido detallado!`);
        });
    });

    // Caja de luz de imágenes de la galería
    const galleryImages = document.querySelectorAll('.gallery-img');
    const body = document.body;
    
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {       
            // Crear elementos de caja de luz
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            const lightboxContent = document.createElement('div');
            lightboxContent.className = 'lightbox-content';
            
            const lightboxImg = document.createElement('img');
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            
            const lightboxCaption = document.createElement('div');
            lightboxCaption.className = 'lightbox-caption';
            lightboxCaption.textContent = this.alt;
            
            const closeBtn = document.createElement('button');
            closeBtn.className = 'lightbox-close';
            closeBtn.innerHTML = '&times;';
             
            // Ensamblar y anexar al cuerpo
            lightboxContent.appendChild(lightboxImg);
            lightboxContent.appendChild(lightboxCaption);
            lightboxContent.appendChild(closeBtn);
            lightbox.appendChild(lightboxContent);
            body.appendChild(lightbox);
            
            //Añadir clase activa después de un pequeño retraso para la transición
            setTimeout(() => {
                lightbox.classList.add('active');
            }, 10);
               
            // Cerrar funcionalidad del botón
            closeBtn.addEventListener('click', function() {
                lightbox.classList.remove('active');
                setTimeout(() => {
                    body.removeChild(lightbox);
                }, 300);
            });
            
            // Cerrar en el fondo del cuadro de luz haciendo clic
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    lightbox.classList.remove('active');
                    setTimeout(() => {
                        body.removeChild(lightbox);
                    }, 300);
                }
            });
        });
    });

    // Añadir estilos de caja de luz dinámicamente
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1010;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .lightbox.active {
            opacity: 1;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 80vh;
            display: block;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .lightbox-caption {
            color: white;
            text-align: center;
            margin-top: 15px;
            font-size: 1rem;
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            font-size: 2rem;
            color: white;
            background: none;
            border: none;
            cursor: pointer;
            transition: color 0.3s ease;
        }
        
        .lightbox-close:hover {
            color: #ff4d4d;
        }
    `;
    document.head.appendChild(style);

    // Añadir efecto de desplazamiento "Próximamente"
    const comingSoon = document.querySelector('.coming-soon');
    
    if (comingSoon) {
        comingSoon.addEventListener('mouseenter', function() {
            this.querySelector('.project-overlay').style.opacity = '0.8';
        });
        
        comingSoon.addEventListener('mouseleave', function() {
            this.querySelector('.project-overlay').style.opacity = '1';
        });
    }

    // Crear un efecto de "escritura" para las comillas
    const quoteText = document.querySelector('blockquote p');
    
    if (quoteText) {
        const originalText = quoteText.textContent;
        let displayText = '';
        let i = 0;
        
        function typeWriter() {
            if (i < originalText.length) {
                displayText += originalText.charAt(i);
                quoteText.textContent = displayText;
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Comienza a escribir el efecto cuando la sección de citas esté a la vista
        const quoteSection = document.querySelector('.quote');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && i === 0) {
                    quoteText.textContent = '';
                    setTimeout(typeWriter, 500);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(quoteSection);
    }

    // Manejo de envíos de formularios con validación
    const form = document.getElementById('opinionForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            const nombreInput = document.getElementById('nombre');
            const correoInput = document.getElementById('correo');
            const opinionInput = document.getElementById('opinion');
            
            let isValid = true;
            
            // Validación sencilla
            if (nombreInput.value.trim() === '') {
                highlightInvalidField(nombreInput);
                isValid = false;
            } else {
                removeInvalidHighlight(nombreInput);
            }
            
            if (correoInput.value.trim() === '' || !isValidEmail(correoInput.value)) {
                highlightInvalidField(correoInput);
                isValid = false;
            } else {
                removeInvalidHighlight(correoInput);
            }
            
            if (opinionInput.value.trim() === '') {
                highlightInvalidField(opinionInput);
                isValid = false;
            } else {
                removeInvalidHighlight(opinionInput);
            }
            
            if (!isValid) {
                e.preventDefault();
                document.getElementById('form-message').textContent = 'Por favor, completa todos los campos correctamente.';
                document.getElementById('form-message').style.color = '#dc3545';
            }
        });
        
        // Agregar funciones de validación
        function highlightInvalidField(field) {
            field.style.borderColor = '#dc3545';
            field.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.25)';
        }
        
        function removeInvalidHighlight(field) {
            field.style.borderColor = '';
            field.style.boxShadow = '';
        }
        
        function isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        // Validación en tiempo real
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    removeInvalidHighlight(this);
                    document.getElementById('form-message').textContent = '';
                }
            });
        });
    }
});