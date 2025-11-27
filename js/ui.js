class UI {
    constructor() {
        this.initNav();
        this.initForm();
        this.initSmooth();
        this.initVouchModal();
    }
    
    initNav() {
        const nav = document.getElementById('nav');
        const toggle = document.querySelector('.nav-toggle');
        const links = document.querySelector('.nav-links');
        let lastScroll = 0;
        
        if (toggle) {
            toggle.addEventListener('click', () => {
                links.classList.toggle('active');
                toggle.classList.toggle('active');
            });
        }
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > lastScroll && currentScroll > 100) {
                nav.classList.add('hide');
            } else {
                nav.classList.remove('hide');
            }
            
            lastScroll = currentScroll;
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                        links.classList.remove('active');
                        toggle?.classList.remove('active');
                    }
                } else {
                    links.classList.remove('active');
                    toggle?.classList.remove('active');
                }
            });
        });
    }
    
    initForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: form.querySelector('[name="name"]').value,
                email: form.querySelector('[name="email"]').value,
                message: form.querySelector('[name="message"]').value
            };
            
            this.showNotification('Message sent successfully!');
            form.reset();
        });
    }
    
    initSmooth() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
    
    showNotification(message) {
        const container = document.getElementById('notifications') || this.createNotificationContainer();
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        container.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    createNotificationContainer() {
        const container = document.createElement('div');
        container.id = 'notifications';
        document.body.appendChild(container);
        return container;
    }
    
    initVouchModal() {
        const modal = document.getElementById('vouch-modal');
        const btn = document.getElementById('vouch-btn');
        const closeBtn = document.querySelector('.modal-close');
        const form = document.getElementById('vouch-form');
        const stars = document.querySelectorAll('.star');
        const ratingInput = document.getElementById('rating-value');
        
        if (!modal || !btn) return;
        
        btn.addEventListener('click', () => {
            modal.classList.add('show');
        });
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('show');
            });
        }
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
        
        stars.forEach(star => {
            star.addEventListener('click', () => {
                const rating = star.getAttribute('data-rating');
                ratingInput.value = rating;
                
                stars.forEach((s, i) => {
                    if (i < rating) {
                        s.classList.add('active');
                        s.textContent = '★';
                    } else {
                        s.classList.remove('active');
                        s.textContent = '☆';
                    }
                });
            });
            
            star.addEventListener('mouseenter', () => {
                const rating = star.getAttribute('data-rating');
                stars.forEach((s, i) => {
                    if (i < rating) {
                        s.textContent = '★';
                    } else {
                        s.textContent = '☆';
                    }
                });
            });
        });
        
        document.querySelector('.stars-input').addEventListener('mouseleave', () => {
            const currentRating = ratingInput.value;
            stars.forEach((s, i) => {
                if (i < currentRating) {
                    s.textContent = '★';
                } else {
                    s.textContent = '☆';
                }
            });
        });
        
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = {
                    name: form.querySelector('[name="name"]').value,
                    role: form.querySelector('[name="role"]').value,
                    rating: parseInt(ratingInput.value),
                    review: form.querySelector('[name="review"]').value
                };
                
                CONFIG.reviews.unshift({
                    name: formData.name,
                    role: formData.role,
                    rating: formData.rating,
                    text: formData.review,
                    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=1a1a1a&color=ffffff`
                });
                
                const grid = document.getElementById('reviews-grid');
                if (grid) {
                    const card = document.createElement('div');
                    card.className = 'review-card';
                    card.innerHTML = `
                        <div class="review-header">
                            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=1a1a1a&color=ffffff" alt="${formData.name}" class="review-avatar">
                            <div class="review-info">
                                <h4>${formData.name}</h4>
                                <p>${formData.role}</p>
                            </div>
                        </div>
                        <div class="review-stars">${'★'.repeat(formData.rating)}</div>
                        <p class="review-text">${formData.review}</p>
                    `;
                    grid.insertBefore(card, grid.firstChild);
                }
                
                this.showNotification('Vouch added successfully!');
                modal.classList.remove('show');
                form.reset();
                
                stars.forEach((s, i) => {
                    if (i < 5) {
                        s.classList.add('active');
                        s.textContent = '★';
                    }
                });
            });
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new UI());
} else {
    new UI();
}