class App {
    constructor() {
        this.init();
    }
    
    init() {
        this.hideLoading();
        this.loadProjects();
        this.loadSkills();
        this.loadReviews();
    }
    
    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            setTimeout(() => {
                loading.classList.add('hide');
                setTimeout(() => loading.remove(), 500);
            }, 1000);
        }
    }
    
    loadProjects() {
        const grid = document.querySelector('.projects-grid');
        if (!grid) return;
        
        CONFIG.projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <img src="${project.img}" alt="${project.title}" class="project-img">
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-desc">${project.desc}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }
    
    loadSkills() {
        const list = document.querySelector('.skills-list');
        if (!list) return;
        
        CONFIG.skills.forEach(skill => {
            const item = document.createElement('div');
            item.className = 'skill';
            item.textContent = skill;
            list.appendChild(item);
        });
    }
    
    loadReviews() {
        const grid = document.getElementById('reviews-grid');
        if (!grid) return;
        
        CONFIG.reviews.forEach(review => {
            const card = document.createElement('div');
            card.className = 'review-card';
            card.innerHTML = `
                <div class="review-header">
                    <img src="${review.avatar}" alt="${review.name}" class="review-avatar">
                    <div class="review-info">
                        <h4>${review.name}</h4>
                        <p>${review.role}</p>
                    </div>
                </div>
                <div class="review-stars">${'★'.repeat(review.rating)}</div>
                <p class="review-text">${review.text}</p>
            `;
            grid.appendChild(card);
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new App());
} else {
    new App();
}