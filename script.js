document.addEventListener('DOMContentLoaded', function() {
    const rightContent = document.querySelector('.right-content');
    const studiesSection = document.getElementById('studies-section');
    const experienceSection = document.getElementById('experience-section');
    const projectsSection = document.getElementById('projects-section');
    const studiesTitle = studiesSection.querySelector('.section-title');
    const experienceTitle = experienceSection.querySelector('.section-title');
    const projectsTitle = projectsSection.querySelector('.section-title');
    const studiesCards = document.querySelectorAll('.studies-card');
    const experienceCards = document.querySelectorAll('.experience-card');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const textContent = document.getElementById('text-content');
    const floatingGallery = document.getElementById('floating-gallery');
    const floatingGalleryMobile = document.getElementById('floating-gallery-mobile');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const leftContent = document.querySelector('.left-content');
    const projectCategories = document.querySelectorAll('.category-title');
    const projectItems = document.querySelectorAll('.project-list li');
    
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
        console.log('Current scroll:', scrolled, 'Is mobile:', isMobile);
        
        // Update active nav link based on scroll position
        // Since all main content belongs to "about" section as mentioned
        if (scrolled > 50) {
            updateActiveLink('about');
        } else {
            updateActiveLink(''); // Remove active state when at top
        }
        
        if (isMobile) {
            // On mobile, all sections are displayed vertically
            studiesSection.style.display = 'flex';
            experienceSection.style.display = 'flex';
            projectsSection.style.display = 'flex';
            floatingGalleryMobile.style.display = 'block';
            textContent.style.display = 'block';
            // Hide desktop gallery on mobile
            floatingGallery.style.display = 'none';
            
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
            const galleryTop = floatingGallery.offsetTop;
            const galleryTrigger = Math.max(600, galleryTop - window.innerHeight + 200);
            const projectsTop = projectsSection.offsetTop;
            const projectsTrigger = Math.max(800, projectsTop - window.innerHeight + 200);
            
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
            
            if (scrolled > galleryTrigger) {
                // Animate gallery items
                galleryItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                        // Add floating animation after fade in
                        setTimeout(() => {
                            item.classList.add('floating');
                        }, 500);
                    }, 200 + (index * 150));
                });
            }
            
            if (scrolled > projectsTrigger) {
                // Animate projects content
                setTimeout(() => {
                    projectsTitle.classList.add('visible');
                }, 200);
                
                projectCategories.forEach((cat, index) => {
                    setTimeout(() => {
                        cat.classList.add('visible');
                    }, 400 + (index * 100));
                });
                
                projectItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, 600 + (index * 50));
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
            
            if (scrolled <= galleryTrigger) {
                galleryItems.forEach(item => item.classList.remove('visible', 'floating'));
            }
            
            if (scrolled <= projectsTrigger) {
                projectsTitle.classList.remove('visible');
                projectCategories.forEach(cat => cat.classList.remove('visible'));
                projectItems.forEach(item => item.classList.remove('visible'));
            }
            
            return;
        }
        
        if (scrolled > 100 && scrolled <= 1200) {
            // Show studies section
            rightContent.classList.add('visible');
            studiesSection.style.display = 'flex';
            experienceSection.style.display = 'none';
            projectsSection.style.display = 'none';
            
            // Show text content, hide gallery, reset background
            textContent.style.display = 'block';
            floatingGallery.style.display = 'none';
            floatingGallery.classList.remove('visible');
            leftContent.style.backgroundColor = ''; // Reset to original color
            
            // Animate studies content
            setTimeout(() => {
                studiesTitle.classList.add('visible');
            }, 200);
            studiesCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, 400 + (index * 200));
            });
            
            // Reset other animations
            experienceTitle.classList.remove('visible');
            experienceCards.forEach(card => card.classList.remove('visible'));
            galleryItems.forEach(item => {
                item.classList.remove('visible', 'floating');
            });
            
        } else if (scrolled > 1200 && scrolled <= 1800) {
            // Show experience section with text content
            rightContent.classList.add('visible');
            studiesSection.style.display = 'none';
            experienceSection.style.display = 'flex';
            projectsSection.style.display = 'none';
            
            // Keep text content visible, reset left background
            textContent.style.display = 'block';
            floatingGallery.style.display = 'none';
            floatingGallery.classList.remove('visible');
            leftContent.style.backgroundColor = ''; // Reset to original color
            
            // Animate experience content
            setTimeout(() => {
                experienceTitle.classList.add('visible');
            }, 200);
            
            experienceCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, 400 + (index * 150));
            });
            
            // Reset other animations
            studiesTitle.classList.remove('visible');
            studiesCards.forEach(card => card.classList.remove('visible'));
            galleryItems.forEach(item => item.classList.remove('visible', 'floating'));
            projectsTitle.classList.remove('visible');
            projectCategories.forEach(cat => cat.classList.remove('visible'));
            projectItems.forEach(item => item.classList.remove('visible'));
            
        } else if (scrolled > 1800 && scrolled <= 2400) {
            // Keep experience section, switch to gallery
            console.log('Gallery should show now, scrolled:', scrolled);
            rightContent.classList.add('visible');
            studiesSection.style.display = 'none';
            experienceSection.style.display = 'flex';
            projectsSection.style.display = 'none';
            
            // Switch to gallery and change left background to match right
            textContent.style.display = 'none';
            floatingGallery.style.display = 'flex';
            // Add visible class for fade-in effect
            setTimeout(() => {
                floatingGallery.classList.add('visible');
            }, 50);
            leftContent.style.backgroundColor = '#F4F3F1'; // Match right content background
            console.log('Gallery display:', floatingGallery.style.display);
            
            // Keep experience content visible
            experienceTitle.classList.add('visible');
            experienceCards.forEach(card => card.classList.add('visible'));
            
            // Animate gallery items
            galleryItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                    // Add floating animation after fade in
                    setTimeout(() => {
                        item.classList.add('floating');
                    }, 500);
                }, 200 + (index * 150));
            });
            
            // Reset other animations
            studiesTitle.classList.remove('visible');
            studiesCards.forEach(card => card.classList.remove('visible'));
            projectsTitle.classList.remove('visible');
            projectCategories.forEach(cat => cat.classList.remove('visible'));
            projectItems.forEach(item => item.classList.remove('visible'));
            
        } else if (scrolled > 2400) {
            // Show projects section
            rightContent.classList.add('visible');
            studiesSection.style.display = 'none';
            experienceSection.style.display = 'none';
            projectsSection.style.display = 'flex';
            
            // Keep gallery visible and background color
            textContent.style.display = 'none';
            floatingGallery.style.display = 'flex';
            floatingGallery.classList.add('visible'); // Ensure visible class
            leftContent.style.backgroundColor = '#F4F3F1'; // Keep matching background
            
            // Ensure gallery is fully visible with floating
            galleryItems.forEach(item => {
                item.classList.add('visible', 'floating');
            });
            
            // Animate projects content
            setTimeout(() => {
                projectsTitle.classList.add('visible');
            }, 200);
            
            projectCategories.forEach((cat, index) => {
                setTimeout(() => {
                    cat.classList.add('visible');
                }, 400 + (index * 100));
            });
            
            projectItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, 600 + (index * 50));
            });
            
            // Reset other animations
            studiesTitle.classList.remove('visible');
            studiesCards.forEach(card => card.classList.remove('visible'));
            experienceTitle.classList.remove('visible');
            experienceCards.forEach(card => card.classList.remove('visible'));
            
        } else {
            // Desktop behavior - reset any mobile color changes
            navbar.style.backgroundColor = '';
            navMenu.style.backgroundColor = '';
            rightContent.style.backgroundColor = '';
            leftContent.style.backgroundColor = ''; // Reset left background
            
            // Hide everything
            rightContent.classList.remove('visible');
            studiesSection.style.display = 'flex';
            experienceSection.style.display = 'none';
            projectsSection.style.display = 'none';
            
            // Show text content, hide gallery
            textContent.style.display = 'block';
            floatingGallery.style.display = 'none';
            floatingGallery.classList.remove('visible');
            
            // Reset all animations
            studiesTitle.classList.remove('visible');
            experienceTitle.classList.remove('visible');
            projectsTitle.classList.remove('visible');
            studiesCards.forEach(card => card.classList.remove('visible'));
            experienceCards.forEach(card => card.classList.remove('visible'));
            galleryItems.forEach(item => item.classList.remove('visible', 'floating'));
            projectCategories.forEach(cat => cat.classList.remove('visible'));
            projectItems.forEach(item => item.classList.remove('visible'));
        }
    }, { passive: true });
    
    // Check on initial load
    if (window.innerWidth <= 768) {
        // Display sections but don't trigger animations until scroll
        studiesSection.style.display = 'flex';
        experienceSection.style.display = 'flex';
        projectsSection.style.display = 'flex';
        
        // Show mobile gallery after experience on mobile
        floatingGalleryMobile.style.display = 'block';
        // Hide desktop gallery
        floatingGallery.style.display = 'none';
        
        // Set initial colors for mobile
        navbar.style.backgroundColor = '#EBEAE4';
        navMenu.style.backgroundColor = '#EBEAE4';
        rightContent.style.backgroundColor = '#EBEAE4';
    } else {
        // Reset styles for desktop
        navbar.style.backgroundColor = '';
        navMenu.style.backgroundColor = '';
        rightContent.style.backgroundColor = '';
        
        // Hide mobile gallery on desktop
        floatingGalleryMobile.style.display = 'none';
        // Ensure desktop gallery is absolutely positioned
        floatingGallery.style.position = 'absolute';
    }
});