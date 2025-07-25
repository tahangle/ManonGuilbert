document.addEventListener('DOMContentLoaded', function() {
    const rightContent = document.querySelector('.right-content');
    const studiesSection = document.getElementById('studies-section');
    const experienceSection = document.getElementById('experience-section');
    const studiesTitle = studiesSection.querySelector('.section-title');
    const experienceTitle = experienceSection.querySelector('.section-title');
    const studiesCards = document.querySelectorAll('.studies-card');
    const experienceCards = document.querySelectorAll('.experience-card');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Store original link texts
    const originalTexts = {};
    navLinks.forEach(link => {
        originalTexts[link.getAttribute('href')] = link.textContent;
    });
    
    // Function to update active nav link
    function updateActiveLink(activeSection) {
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const originalText = originalTexts[href];
            
            if (href === `#${activeSection}`) {
                link.textContent = `[ ${originalText} ]`;
            } else {
                link.textContent = originalText;
            }
        });
    }
    
    // Handle click on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            updateActiveLink(targetId);
        });
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const isOpen = navMenu.classList.contains('active');
        menuToggle.querySelector('span').textContent = isOpen ? '[ - ]' : '[ + ]';
    });
    
    // Color interpolation function
    function interpolateColor(color1, color2, factor) {
        // Convert hex to RGB
        const hex1 = color1.replace('#', '');
        const hex2 = color2.replace('#', '');
        
        const r1 = parseInt(hex1.substr(0, 2), 16);
        const g1 = parseInt(hex1.substr(2, 2), 16);
        const b1 = parseInt(hex1.substr(4, 2), 16);
        
        const r2 = parseInt(hex2.substr(0, 2), 16);
        const g2 = parseInt(hex2.substr(2, 2), 16);
        const b2 = parseInt(hex2.substr(4, 2), 16);
        
        const r = Math.round(r1 + (r2 - r1) * factor);
        const g = Math.round(g1 + (g2 - g1) * factor);
        const b = Math.round(b1 + (b2 - b1) * factor);
        
        return `rgb(${r}, ${g}, ${b})`;
    }
    
    // Toggle animation based on scroll position
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const isMobile = window.innerWidth <= 768;
        
        // Update active nav link based on scroll position
        // Since all main content belongs to "about" section as mentioned
        if (scrolled > 50) {
            updateActiveLink('about');
        } else {
            updateActiveLink(''); // Remove active state when at top
        }
        
        if (isMobile) {
            // On mobile, both sections are always displayed
            studiesSection.style.display = 'flex';
            experienceSection.style.display = 'flex';
            
            // Gradual color transition based on scroll
            const startColor = '#EBEAE4'; // Original background
            const endColor = '#F4F3F1';   // Target beige color
            
            // Calculate transition factor (0 to 1)
            const transitionStart = 50;  // Start transition at 50px scroll
            const transitionEnd = 400;   // Complete transition at 400px scroll
            let factor = Math.max(0, Math.min(1, (scrolled - transitionStart) / (transitionEnd - transitionStart)));
            
            // Apply interpolated color to navbar and right content
            const interpolatedColor = interpolateColor(startColor, endColor, factor);
            navbar.style.backgroundColor = interpolatedColor;
            navMenu.style.backgroundColor = interpolatedColor;
            rightContent.style.backgroundColor = interpolatedColor;
            
            // Calculate trigger points based on actual content position
            const studiesTrigger = 100;
            const experienceSectionTop = experienceSection.offsetTop;
            const experienceTrigger = Math.max(400, experienceSectionTop - window.innerHeight + 200);
            
            // Trigger animations based on scroll position
            if (scrolled > studiesTrigger) {
                // Animate studies content
                setTimeout(() => {
                    studiesTitle.classList.add('visible');
                }, 200);
                studiesCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, 400 + (index * 200));
                });
            }
            
            if (scrolled > experienceTrigger) {
                // Animate experience content
                setTimeout(() => {
                    experienceTitle.classList.add('visible');
                }, 200);
                experienceCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, 400 + (index * 200));
                });
            }
            
            // Remove animations when scrolling back up
            if (scrolled <= studiesTrigger) {
                studiesTitle.classList.remove('visible');
                studiesCards.forEach(card => card.classList.remove('visible'));
            }
            
            if (scrolled <= experienceTrigger) {
                experienceTitle.classList.remove('visible');
                experienceCards.forEach(card => card.classList.remove('visible'));
            }
            
            return;
        }
        
        if (scrolled > 100 && scrolled <= 1200) {
            // Show studies section
            rightContent.classList.add('visible');
            studiesSection.style.display = 'flex';
            experienceSection.style.display = 'none';
            
            // Animate studies content
            setTimeout(() => {
                studiesTitle.classList.add('visible');
            }, 200);
            studiesCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, 400 + (index * 200));
            });
            
            // Reset experience animations
            experienceTitle.classList.remove('visible');
            experienceCards.forEach(card => {
                card.classList.remove('visible');
            });
            
        } else if (scrolled > 1200) {
            // Show experience section
            rightContent.classList.add('visible');
            studiesSection.style.display = 'none';
            experienceSection.style.display = 'flex';
            
            // Animate experience content
            setTimeout(() => {
                experienceTitle.classList.add('visible');
            }, 200);
            experienceCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, 400 + (index * 200));
            });
            
            // Reset studies animations
            studiesTitle.classList.remove('visible');
            studiesCards.forEach(card => {
                card.classList.remove('visible');
            });
            
        } else {
            // Desktop behavior - reset any mobile color changes
            navbar.style.backgroundColor = '';
            navMenu.style.backgroundColor = '';
            rightContent.style.backgroundColor = '';
            
            // Hide everything
            rightContent.classList.remove('visible');
            studiesSection.style.display = 'flex';
            experienceSection.style.display = 'none';
            studiesTitle.classList.remove('visible');
            experienceTitle.classList.remove('visible');
            studiesCards.forEach(card => {
                card.classList.remove('visible');
            });
            experienceCards.forEach(card => {
                card.classList.remove('visible');
            });
        }
    }, { passive: true });
    
    // Check on initial load
    if (window.innerWidth <= 768) {
        // Display sections but don't trigger animations until scroll
        studiesSection.style.display = 'flex';
        experienceSection.style.display = 'flex';
        
        // Set initial colors for mobile
        navbar.style.backgroundColor = '#EBEAE4';
        navMenu.style.backgroundColor = '#EBEAE4';
        rightContent.style.backgroundColor = '#EBEAE4';
    } else {
        // Reset styles for desktop
        navbar.style.backgroundColor = '';
        navMenu.style.backgroundColor = '';
        rightContent.style.backgroundColor = '';
    }
});