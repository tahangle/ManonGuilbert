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
    const projectLinks = document.querySelectorAll('.project-link');
    const leftContent = document.querySelector('.left-content');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Function to update active nav link
    function updateActiveLink(activeSection) {
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            if (href === `#${activeSection}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Handle click on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            if (targetId === 'work') {
                // Scroll to gallery section
                const isMobile = window.innerWidth <= 768;
                if (isMobile) {
                    // On mobile, scroll to mobile gallery
                    const mobileGallery = document.getElementById('floating-gallery-mobile');
                    if (mobileGallery) {
                        const galleryTop = mobileGallery.offsetTop;
                        window.scrollTo({
                            top: galleryTop - 100,
                            behavior: 'smooth'
                        });
                    }
                } else {
                    // On desktop, scroll to 2650px for gallery
                    window.scrollTo({
                        top: 2650,
                        behavior: 'smooth'
                    });
                }
            } else if (targetId === 'about') {
                // Scroll to about section
                window.scrollTo({
                    top: 200,
                    behavior: 'smooth'
                });
            } else if (targetId === 'contact') {
                // Scroll to bottom for contact
                window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: 'smooth'
                });
            }
            
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
        
        if (isMobile) {
            // Update active nav link for mobile based on scroll position
            const mobileGallery = document.getElementById('floating-gallery-mobile');
            const galleryTop = mobileGallery ? mobileGallery.offsetTop : 0;
            const projectsTop = projectsSection.offsetTop;
            
            if (scrolled > galleryTop - 200) {
                updateActiveLink('work');
            } else if (scrolled > 50) {
                updateActiveLink('about');
            } else {
                updateActiveLink('');
            }
            
            // On mobile, all sections are displayed vertically
            studiesSection.style.display = 'flex';
            experienceSection.style.display = 'flex';
            projectsSection.style.display = 'flex';
            floatingGalleryMobile.style.display = 'block';
            textContent.style.display = 'block';
            // Hide desktop gallery on mobile
            floatingGallery.style.display = 'none';
            
            // Calculate trigger points for mobile
            const studiesSectionTop = studiesSection.offsetTop;
            const mobileGalleryTop = floatingGalleryMobile.offsetTop;
            
            // Determine background color based on scroll position
            if (scrolled < studiesSectionTop - 200) {
                // Initial state - original background
                navbar.style.backgroundColor = '#EBEAE4';
                navMenu.style.backgroundColor = '#EBEAE4';
                rightContent.style.backgroundColor = '#EBEAE4';
            } else if (scrolled >= studiesSectionTop - 200 && scrolled < mobileGalleryTop - 300) {
                // Studies/Experience section - fade to lighter background
                const transitionStart = studiesSectionTop - 200;
                const transitionEnd = studiesSectionTop + 200;
                let factor = Math.max(0, Math.min(1, (scrolled - transitionStart) / (transitionEnd - transitionStart)));
                const interpolatedColor = interpolateColor('#EBEAE4', '#F4F3F1', factor);
                navbar.style.backgroundColor = interpolatedColor;
                navMenu.style.backgroundColor = interpolatedColor;
                rightContent.style.backgroundColor = interpolatedColor;
            } else if (scrolled >= mobileGalleryTop - 300) {
                // Gallery section - fade back to original background
                const transitionStart = mobileGalleryTop - 300;
                const transitionEnd = mobileGalleryTop;
                let factor = Math.max(0, Math.min(1, (scrolled - transitionStart) / (transitionEnd - transitionStart)));
                const interpolatedColor = interpolateColor('#F4F3F1', '#EBEAE4', factor);
                navbar.style.backgroundColor = interpolatedColor;
                navMenu.style.backgroundColor = interpolatedColor;
                rightContent.style.backgroundColor = interpolatedColor;
            }
            
            // Calculate trigger points based on actual content position
            const studiesTrigger = 100;
            const experienceSectionTop = experienceSection.offsetTop;
            const experienceTrigger = Math.max(400, experienceSectionTop - window.innerHeight + 200);
            const desktopGalleryTop = floatingGallery.offsetTop;
            const galleryTrigger = Math.max(600, desktopGalleryTop - window.innerHeight + 200);
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
                
                projectCards.forEach((card, index) => {
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
            
            if (scrolled <= galleryTrigger) {
                galleryItems.forEach(item => item.classList.remove('visible', 'floating'));
            }
            
            if (scrolled <= projectsTrigger) {
                projectsTitle.classList.remove('visible');
                projectCards.forEach(card => card.classList.remove('visible'));
            }
            
            return;
        }
        
        // Desktop active link logic
        if (scrolled > 2600) {
            // Gallery is visible, we're in "work" section
            updateActiveLink('work');
        } else if (scrolled > 50) {
            // Text content is visible, we're in "about" section
            updateActiveLink('about');
        } else {
            updateActiveLink(''); // Remove active state when at top
        }
        
        if (scrolled > 100 && scrolled <= 1600) {
            console.log('Showing studies section');
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
            
        } else if (scrolled > 1600 && scrolled <= 2600) {
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
            projectCards.forEach(card => card.classList.remove('visible'));
            
        } else if (scrolled > 2600 && scrolled <= 3400) {
            // Keep experience section, switch to gallery
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
            projectCards.forEach(card => card.classList.remove('visible'));
            
        } else if (scrolled > 3400) {
            console.log('Showing projects section');
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
            
            projectCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, 400 + (index * 200));
            });
            
            // Reset other animations
            studiesTitle.classList.remove('visible');
            studiesCards.forEach(card => card.classList.remove('visible'));
            experienceTitle.classList.remove('visible');
            experienceCards.forEach(card => card.classList.remove('visible'));
            
        } else {
            // Initial state when at the very top of the page (scroll < 100)
            // Desktop behavior - reset any mobile color changes
            navbar.style.backgroundColor = '';
            navMenu.style.backgroundColor = '';
            rightContent.style.backgroundColor = '';
            leftContent.style.backgroundColor = ''; // Reset left background
            
            // Hide right content when at the very top
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
            projectCards.forEach(card => card.classList.remove('visible'));
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
    
    // Trigger initial scroll event to set correct state
    window.dispatchEvent(new Event('scroll'));
    
    // Handle window resize to reset styles appropriately
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            const isNowMobile = window.innerWidth <= 768;
            const isNowDesktop = window.innerWidth > 768;
            
            if (isNowDesktop) {
                // Reset desktop styles
                navbar.style.backgroundColor = '';
                navMenu.style.backgroundColor = '';
                rightContent.style.backgroundColor = '';
                leftContent.style.backgroundColor = '';
                
                // Reset mobile-specific display properties
                floatingGalleryMobile.style.display = 'none';
                
                // Re-trigger scroll to set correct desktop state
                window.dispatchEvent(new Event('scroll'));
            } else if (isNowMobile) {
                // Ensure mobile styles are applied
                floatingGalleryMobile.style.display = 'block';
                navbar.style.backgroundColor = '#EBEAE4';
                navMenu.style.backgroundColor = '#EBEAE4';
                rightContent.style.backgroundColor = '#EBEAE4';
                
                // Re-trigger scroll to set correct mobile state
                window.dispatchEvent(new Event('scroll'));
            }
        }, 250); // Debounce resize events
    });
    
    // Modal elements
    const modal = document.getElementById('image-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalImage = document.getElementById('modal-image');
    const photographerName = document.getElementById('photographer-name');
    const stylistName = document.getElementById('stylist-name');
    
    // Gallery interactions
    galleryItems.forEach(item => {
        const projectName = item.getAttribute('data-project-name');
        
        if (window.innerWidth > 768) {
            // Desktop hover interactions
            item.addEventListener('mouseenter', function() {
                // Find and highlight the corresponding project link
                projectLinks.forEach(link => {
                    if (link.getAttribute('data-project-name') === projectName) {
                        link.classList.add('highlight');
                    }
                });
            });
            
            item.addEventListener('mouseleave', function() {
                // Only remove highlight if modal is not open
                if (!modal.classList.contains('active')) {
                    projectLinks.forEach(link => {
                        link.classList.remove('highlight');
                    });
                }
            });
        }
        
        // Click functionality for modal (both desktop and mobile)
        item.addEventListener('click', function() {
            // Set modal content
            modalImage.src = this.src;
            modalImage.alt = this.alt;
            photographerName.textContent = this.getAttribute('data-photographer') || 'Unknown';
            stylistName.textContent = this.getAttribute('data-stylist') || 'Unknown';
            
            // Show modal
            modal.classList.add('active');
            
            // Keep the project highlighted while modal is open
            projectLinks.forEach(link => {
                if (link.getAttribute('data-project-name') === projectName) {
                    link.classList.add('highlight');
                }
            });
        });
    });
    
    // Add click functionality to project titles on mobile
    if (window.innerWidth <= 768) {
        projectLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const projectName = this.getAttribute('data-project-name');
                
                // Find the corresponding image
                const correspondingImage = Array.from(galleryItems).find(item => 
                    item.getAttribute('data-project-name') === projectName
                );
                
                if (correspondingImage) {
                    // Set modal content
                    modalImage.src = correspondingImage.src;
                    modalImage.alt = correspondingImage.alt;
                    photographerName.textContent = correspondingImage.getAttribute('data-photographer') || 'Unknown';
                    stylistName.textContent = correspondingImage.getAttribute('data-stylist') || 'Unknown';
                    
                    // Show modal
                    modal.classList.add('active');
                    
                    // Highlight this project
                    this.classList.add('highlight');
                }
            });
        });
    }
    
    // Store currently highlighted project
    let currentHighlightedProject = null;
    
    modalClose.addEventListener('click', function() {
        modal.classList.remove('active');
        // Remove highlight from all project links
        projectLinks.forEach(link => {
            link.classList.remove('highlight');
        });
        currentHighlightedProject = null;
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            // Remove highlight from all project links
            projectLinks.forEach(link => {
                link.classList.remove('highlight');
            });
            currentHighlightedProject = null;
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            // Remove highlight from all project links
            projectLinks.forEach(link => {
                link.classList.remove('highlight');
            });
            currentHighlightedProject = null;
        }
    });
});