document.addEventListener('DOMContentLoaded', function() {
    // Determine current page
    const isWorkPage = document.body.classList.contains('work-page');
    const isHomePage = !isWorkPage;
    const rightContent = document.querySelector('.right-content');
    const studiesSection = document.getElementById('studies-section');
    const experienceSection = document.getElementById('experience-section');
    const projectsSection = document.getElementById('projects-section');
    const studiesTitle = studiesSection ? studiesSection.querySelector('.section-title') : null;
    const experienceTitle = experienceSection ? experienceSection.querySelector('.section-title') : null;
    const projectsTitle = projectsSection ? projectsSection.querySelector('.section-title') : null;
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
    
    // Handle logo click
    const logoLink = document.querySelector('.logo a');
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            // Only prevent default if it's a hash link
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
            // Otherwise, let it navigate normally to index.html
        });
    }
    
    // Handle click on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for contact modal
            if (href === '#contact') {
                e.preventDefault();
                contactModal.classList.add('active');
                navMenu.classList.remove('active');
                menuToggle.querySelector('span').textContent = '[ + ]';
            }
            // Let other links navigate normally
        });
    });
    
    // Mobile menu toggle with smooth animation
    menuToggle.addEventListener('click', function() {
        const span = menuToggle.querySelector('span');
        const isOpen = navMenu.classList.contains('active');
        
        // Animate the toggle button
        span.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            navMenu.classList.toggle('active');
            span.textContent = !isOpen ? '[ - ]' : '[ + ]';
            span.style.transform = 'scale(1)';
        }, 150);
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
    
    // Page-specific initialization
    if (isWorkPage) {
        // Work page specific setup
        const galleryItems = document.querySelectorAll('.gallery-item');
        const projectCards = document.querySelectorAll('.project-card');
        const projectsTitle = projectsSection ? projectsSection.querySelector('.section-title') : null;
        
        // Animate gallery items on load
        galleryItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
                setTimeout(() => {
                    item.classList.add('floating');
                }, 500);
            }, 200 + (index * 150));
        });
        
        // Animate project cards on load
        if (projectsTitle) {
            setTimeout(() => {
                projectsTitle.classList.add('visible');
            }, 400);
        }
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, 600 + (index * 200));
        });
    }
    
    // Toggle animation based on scroll position (only for home page)
    window.addEventListener('scroll', function() {
        if (isWorkPage) return; // No scroll animations on work page
        
        const scrolled = window.scrollY;
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Update active nav link for mobile based on scroll position
            const mobileGallery = document.getElementById('floating-gallery-mobile');
            const galleryTop = mobileGallery ? mobileGallery.offsetTop : 0;
            const projectsTop = projectsSection ? projectsSection.offsetTop : 0;
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const maxScroll = documentHeight - windowHeight;
            
            if (scrolled > galleryTop - 200) {
                updateActiveLink('work');
            } else if (scrolled > 50) {
                updateActiveLink('about');
            } else {
                updateActiveLink('');
            }
            
            // On mobile, display sections that exist on current page
            if (studiesSection) studiesSection.style.display = 'flex';
            if (experienceSection) experienceSection.style.display = 'flex';
            if (projectsSection) projectsSection.style.display = 'flex';
            if (floatingGalleryMobile) floatingGalleryMobile.style.display = 'block';
            if (textContent) textContent.style.display = 'block';
            // Hide desktop gallery on mobile
            if (floatingGallery) floatingGallery.style.display = 'none';
            
            
            // Calculate trigger points for mobile
            const studiesSectionTop = studiesSection ? studiesSection.offsetTop : 0;
            const mobileGalleryTop = floatingGalleryMobile ? floatingGalleryMobile.offsetTop : 0;
            
            // Get experience section position for transition
            const experienceSectionTop = experienceSection ? experienceSection.offsetTop : 0;
            
            // Determine background color based on scroll position
            if (scrolled < 50) {
                // Very top - navbar transparent
                navbar.style.backgroundColor = 'transparent';
                rightContent.style.backgroundColor = '#EBEAE4';
            } else if (scrolled >= 50 && scrolled < studiesSectionTop - 200) {
                // Fade from transparent to original background
                const transitionStart = 50;
                const transitionEnd = 150;
                let factor = Math.max(0, Math.min(1, (scrolled - transitionStart) / (transitionEnd - transitionStart)));
                const opacity = factor;
                navbar.style.backgroundColor = `rgba(235, 234, 228, ${opacity})`;
                rightContent.style.backgroundColor = '#EBEAE4';
            } else if (scrolled >= studiesSectionTop - 200 && scrolled < experienceSectionTop - 200) {
                // Studies section - fade to F4F3F1 background
                const transitionStart = studiesSectionTop - 200;
                const transitionEnd = studiesSectionTop + 100;
                let factor = Math.max(0, Math.min(1, (scrolled - transitionStart) / (transitionEnd - transitionStart)));
                const interpolatedColor = interpolateColor('#EBEAE4', '#F4F3F1', factor);
                navbar.style.backgroundColor = interpolatedColor;
                rightContent.style.backgroundColor = interpolatedColor;
            } else if (scrolled >= experienceSectionTop - 200 && scrolled < mobileGalleryTop - 300) {
                // Experience section - fade back to EBEAE4
                const transitionStart = experienceSectionTop - 200;
                const transitionEnd = experienceSectionTop + 100;
                let factor = Math.max(0, Math.min(1, (scrolled - transitionStart) / (transitionEnd - transitionStart)));
                const interpolatedColor = interpolateColor('#F4F3F1', '#EBEAE4', factor);
                navbar.style.backgroundColor = interpolatedColor;
                rightContent.style.backgroundColor = interpolatedColor;
            } else {
                // Gallery and beyond - maintain EBEAE4
                navbar.style.backgroundColor = '#EBEAE4';
                rightContent.style.backgroundColor = '#EBEAE4';
            }
            
            // Calculate trigger points based on actual content position
            const studiesTrigger = 100;
            const experienceTrigger = experienceSection ? Math.max(400, experienceSectionTop - window.innerHeight + 200) : 400;
            const desktopGalleryTop = floatingGallery ? floatingGallery.offsetTop : 0;
            const galleryTrigger = floatingGallery ? Math.max(600, desktopGalleryTop - window.innerHeight + 200) : 600;
            const projectsTrigger = projectsSection ? Math.max(800, projectsTop - window.innerHeight + 200) : 800;
            
            // Trigger animations based on scroll position
            if (scrolled > studiesTrigger && studiesTitle) {
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
            
            if (scrolled > experienceTrigger && experienceTitle) {
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
            
            if (scrolled > projectsTrigger && projectsTitle) {
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
                if (studiesTitle) studiesTitle.classList.remove('visible');
                studiesCards.forEach(card => card.classList.remove('visible'));
            }
            
            if (scrolled <= experienceTrigger) {
                if (experienceTitle) experienceTitle.classList.remove('visible');
                experienceCards.forEach(card => card.classList.remove('visible'));
            }
            
            if (scrolled <= galleryTrigger) {
                galleryItems.forEach(item => item.classList.remove('visible', 'floating'));
            }
            
            if (scrolled <= projectsTrigger) {
                if (projectsTitle) projectsTitle.classList.remove('visible');
                projectCards.forEach(card => card.classList.remove('visible'));
            }
            
            return;
        }
        
        // Desktop behavior - only for home page
        if (!isWorkPage) {
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
        }
        
        if (scrolled > 100 && scrolled <= 1600) {
            // Show studies section
            if (rightContent) rightContent.classList.add('visible');
            if (studiesSection) studiesSection.style.display = 'flex';
            if (experienceSection) experienceSection.style.display = 'none';
            if (projectsSection) projectsSection.style.display = 'none';
            
            // Show text content, hide gallery, reset background
            if (textContent) textContent.style.display = 'block';
            if (floatingGallery) {
                floatingGallery.style.display = 'none';
                floatingGallery.classList.remove('visible');
            }
            if (leftContent) leftContent.style.backgroundColor = ''; // Reset to original color
            
            
            // Animate studies content
            if (studiesTitle) {
                setTimeout(() => {
                    studiesTitle.classList.add('visible');
                }, 200);
            }
            studiesCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, 400 + (index * 200));
            });
            
            // Reset other animations
            if (experienceTitle) experienceTitle.classList.remove('visible');
            experienceCards.forEach(card => card.classList.remove('visible'));
            galleryItems.forEach(item => {
                item.classList.remove('visible', 'floating');
            });
            
        } else if (scrolled > 1600 && scrolled <= 2600) {
            // Show experience section with text content
            if (rightContent) rightContent.classList.add('visible');
            if (studiesSection) studiesSection.style.display = 'none';
            if (experienceSection) experienceSection.style.display = 'flex';
            if (projectsSection) projectsSection.style.display = 'none';
            
            // Keep text content visible, reset left background
            if (textContent) textContent.style.display = 'block';
            if (floatingGallery) {
                floatingGallery.style.display = 'none';
                floatingGallery.classList.remove('visible');
            }
            if (leftContent) leftContent.style.backgroundColor = ''; // Reset to original color
            
            
            // Animate experience content
            if (experienceTitle) {
                setTimeout(() => {
                    experienceTitle.classList.add('visible');
                }, 200);
            }
            
            experienceCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, 400 + (index * 150));
            });
            
            // Reset other animations
            if (studiesTitle) studiesTitle.classList.remove('visible');
            studiesCards.forEach(card => card.classList.remove('visible'));
            galleryItems.forEach(item => item.classList.remove('visible', 'floating'));
            if (projectsTitle) projectsTitle.classList.remove('visible');
            projectCards.forEach(card => card.classList.remove('visible'));
            
        } else if (scrolled > 2600 && scrolled <= 3400) {
            // Keep experience section, switch to gallery
            if (rightContent) rightContent.classList.add('visible');
            if (studiesSection) studiesSection.style.display = 'none';
            if (experienceSection) experienceSection.style.display = 'flex';
            if (projectsSection) projectsSection.style.display = 'none';
            
            // Switch to gallery and change left background to match right
            if (textContent) textContent.style.display = 'none';
            if (floatingGallery) {
                floatingGallery.style.display = 'flex';
                // Add visible class for fade-in effect
                setTimeout(() => {
                    floatingGallery.classList.add('visible');
                }, 50);
            }
            if (leftContent) leftContent.style.backgroundColor = '#F4F3F1'; // Match right content background
            
            // Keep experience content visible
            if (experienceTitle) experienceTitle.classList.add('visible');
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
            if (studiesTitle) studiesTitle.classList.remove('visible');
            studiesCards.forEach(card => card.classList.remove('visible'));
            if (projectsTitle) projectsTitle.classList.remove('visible');
            projectCards.forEach(card => card.classList.remove('visible'));
            
        } else if (scrolled > 3400 && scrolled <= 4500) {
            // Show projects section
            if (rightContent) rightContent.classList.add('visible');
            if (studiesSection) studiesSection.style.display = 'none';
            if (experienceSection) experienceSection.style.display = 'none';
            if (projectsSection) projectsSection.style.display = 'flex';
            
            // Keep gallery visible and background color
            if (textContent) textContent.style.display = 'none';
            if (floatingGallery) {
                floatingGallery.style.display = 'flex';
                floatingGallery.classList.add('visible'); // Ensure visible class
            }
            if (leftContent) leftContent.style.backgroundColor = '#F4F3F1'; // Keep matching background
            
            
            // Ensure gallery is fully visible with floating
            galleryItems.forEach(item => {
                item.classList.add('visible', 'floating');
            });
            
            // Animate projects content
            if (projectsTitle) {
                setTimeout(() => {
                    projectsTitle.classList.add('visible');
                }, 200);
            }
            
            projectCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, 400 + (index * 200));
            });
            
            // Reset other animations
            if (studiesTitle) studiesTitle.classList.remove('visible');
            studiesCards.forEach(card => card.classList.remove('visible'));
            if (experienceTitle) experienceTitle.classList.remove('visible');
            experienceCards.forEach(card => card.classList.remove('visible'));
            
        } else {
            // Initial state when at the very top of the page (scroll < 100)
            // Desktop behavior - reset any mobile color changes
            if (navbar) navbar.style.backgroundColor = '';
            if (navMenu) navMenu.style.backgroundColor = '';
            if (rightContent) rightContent.style.backgroundColor = '';
            if (leftContent) leftContent.style.backgroundColor = ''; // Reset left background
            
            // Hide right content when at the very top
            if (rightContent) rightContent.classList.remove('visible');
            if (studiesSection) studiesSection.style.display = 'flex';
            if (experienceSection) experienceSection.style.display = 'none';
            if (projectsSection) projectsSection.style.display = 'none';
            
            // Show text content, hide gallery
            if (textContent) textContent.style.display = 'block';
            if (floatingGallery) {
                floatingGallery.style.display = 'none';
                floatingGallery.classList.remove('visible');
            }
            
            
            // Reset all animations
            if (studiesTitle) studiesTitle.classList.remove('visible');
            if (experienceTitle) experienceTitle.classList.remove('visible');
            if (projectsTitle) projectsTitle.classList.remove('visible');
            studiesCards.forEach(card => card.classList.remove('visible'));
            experienceCards.forEach(card => card.classList.remove('visible'));
            galleryItems.forEach(item => item.classList.remove('visible', 'floating'));
            projectCards.forEach(card => card.classList.remove('visible'));
        }
    }, { passive: true });
    
    // Check on initial load
    if (window.innerWidth <= 768) {
        // Display sections but don't trigger animations until scroll
        if (studiesSection) studiesSection.style.display = 'flex';
        if (experienceSection) experienceSection.style.display = 'flex';
        if (projectsSection) projectsSection.style.display = 'flex';
        
        // Show mobile gallery after experience on mobile
        if (floatingGalleryMobile) floatingGalleryMobile.style.display = 'block';
        // Hide desktop gallery
        if (floatingGallery) floatingGallery.style.display = 'none';
        
        // Set initial colors for mobile
        if (isWorkPage) {
            navbar.style.backgroundColor = '#F4F3F1';
            if (rightContent) rightContent.style.backgroundColor = '#F4F3F1';
        } else {
            navbar.style.backgroundColor = 'transparent';
            if (rightContent) rightContent.style.backgroundColor = '#EBEAE4';
        }
    } else {
        // Reset styles for desktop
        navbar.style.backgroundColor = '';
        navMenu.style.backgroundColor = '';
        rightContent.style.backgroundColor = '';
        
        // Hide mobile gallery on desktop
        if (floatingGalleryMobile) floatingGalleryMobile.style.display = 'none';
        // Ensure desktop gallery is absolutely positioned
        if (floatingGallery) floatingGallery.style.position = 'absolute';
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
                if (floatingGalleryMobile) floatingGalleryMobile.style.display = 'none';
                
                // Re-trigger scroll to set correct desktop state
                window.dispatchEvent(new Event('scroll'));
            } else if (isNowMobile) {
                // Ensure mobile styles are applied
                if (floatingGalleryMobile) floatingGalleryMobile.style.display = 'block';
                // Set navbar to transparent if at top on home page
                if (!isWorkPage && window.scrollY < 50) {
                    navbar.style.backgroundColor = 'transparent';
                }
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
    const galleryContainer = document.querySelector('.modal-gallery-container');
    
    // Gallery data structure
    const projectGalleries = {
        'Vogue HK x Anya Taylor Joy': [
            'projects/project2.jpg',
            'projects/anya/VHK_066_IG_Coverstory-1280x800.jpg',
            'projects/anya/VHK_066_IG_Coverstory2.jpg',
            'projects/anya/VHK_066_IG_Coverstory3-1280x800.jpg',
            'projects/anya/VHK_066_IG_Coverstory5.jpg',
            'projects/anya/VHK_066_IG_Coverstory6.jpg',
            'projects/anya/VHK_066_IG_Coverstory7.jpg',
            'projects/anya/VHK_066_IG_Coverstory8-1280x800.jpg',
            'projects/anya/VHK_066_IG_Coverstory9-1280x800.jpg',
            'projects/anya/VHK_066_IG_Coverstory10.jpg',
            'projects/anya/VHK_066_IG_Coverstory11.jpg'
        ],
        'Vogue HK x Rory Van Millingen': [
            'projects/project6.jpg'
            // Add more images to projects/hongkong/ folder to expand this gallery
        ]
    };
    
    let currentGalleryIndex = 0;
    let currentProjectImages = [];
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Gallery navigation functions
    function updateGalleryImage(index) {
        if (currentProjectImages.length === 0) return;
        
        currentGalleryIndex = index;
        modalImage.src = currentProjectImages[currentGalleryIndex];
        
        // Add subtle animation on mobile when changing images
        if (window.innerWidth <= 768 && currentProjectImages.length > 1) {
            modalImage.style.opacity = '0.8';
            setTimeout(() => {
                modalImage.style.opacity = '1';
            }, 150);
        }
    }
    
    function nextImage() {
        if (currentProjectImages.length > 1) {
            currentGalleryIndex = (currentGalleryIndex + 1) % currentProjectImages.length;
            updateGalleryImage(currentGalleryIndex);
        }
    }
    
    function previousImage() {
        if (currentProjectImages.length > 1) {
            currentGalleryIndex = (currentGalleryIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
            updateGalleryImage(currentGalleryIndex);
        }
    }
    
    
    // Desktop click navigation with left/right zones
    if (galleryContainer) {
        galleryContainer.addEventListener('click', (e) => {
            if (e.target === modalImage && window.innerWidth > 768) {
                // Get click position relative to image
                const rect = modalImage.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const width = rect.width;
                
                // If clicked on left half, go to previous image
                if (x < width / 2) {
                    previousImage();
                } else {
                    // If clicked on right half, go to next image
                    nextImage();
                }
            }
        });
        
        // Add hover effect to show different cursors
        if (modalImage) {
            modalImage.addEventListener('mousemove', (e) => {
                if (window.innerWidth > 768 && currentProjectImages.length > 1) {
                    const rect = modalImage.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const width = rect.width;
                    
                    if (x < width / 2) {
                        modalImage.style.cursor = 'w-resize';
                    } else {
                        modalImage.style.cursor = 'e-resize';
                    }
                }
            });
        }
    }
    
    // Mobile swipe functionality
    if (galleryContainer) {
        galleryContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        galleryContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextImage(); // Swipe left
        }
        if (touchEndX > touchStartX + 50) {
            previousImage(); // Swipe right
        }
    }
    
    // Contact Modal elements
    const contactModal = document.getElementById('contact-modal');
    const contactModalClose = document.querySelector('.contact-modal-close');
    const contactForm = document.getElementById('contact-form');
    
    // Gallery interactions
    galleryItems.forEach(item => {
        const projectName = item.getAttribute('data-project-name');
        let floatingTween = null;
        const floatDelay = parseFloat(item.getAttribute('data-float')) * 0.5;
        
        // Setup floating animation with GSAP for desktop
        function startFloating() {
            if (window.innerWidth > 768 && item.classList.contains('floating')) {
                floatingTween = gsap.to(item, {
                    y: -15,
                    duration: 2,
                    ease: "power1.inOut",
                    yoyo: true,
                    repeat: -1,
                    delay: floatDelay
                });
            }
        }
        
        // Check if item should float and start animation
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class' && item.classList.contains('floating')) {
                    startFloating();
                }
            });
        });
        observer.observe(item, { attributes: true });
        
        // Desktop hover interactions with GSAP
        item.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                // Kill floating animation during hover
                if (floatingTween) {
                    floatingTween.kill();
                }
                
                // Smooth scale animation with GSAP
                gsap.to(this, {
                    scale: 1.05,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out",
                    overwrite: true
                });
                
                // Remove all highlights first
                projectLinks.forEach(link => {
                    link.classList.remove('highlight');
                });
                // Then add highlight to the corresponding project link
                projectLinks.forEach(link => {
                    if (link.getAttribute('data-project-name') === projectName) {
                        link.classList.add('highlight');
                    }
                });
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                // Smooth scale back with GSAP
                gsap.to(this, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out",
                    overwrite: true,
                    onComplete: () => {
                        // Restart floating animation after hover
                        if (item.classList.contains('floating')) {
                            startFloating();
                        }
                    }
                });
                
                // Remove highlight from this specific project if modal is not open
                if (!modal.classList.contains('active')) {
                    projectLinks.forEach(link => {
                        if (link.getAttribute('data-project-name') === projectName) {
                            link.classList.remove('highlight');
                        }
                    });
                }
            }
        });
        
        // Click functionality for modal (both desktop and mobile)
        item.addEventListener('click', function() {
            const projectName = this.getAttribute('data-project-name');
            
            // Check if this project has a gallery
            if (projectGalleries[projectName]) {
                currentProjectImages = projectGalleries[projectName];
                currentGalleryIndex = 0;
            } else {
                // Single image project
                currentProjectImages = [this.src];
                currentGalleryIndex = 0;
            }
            
            // Set modal content
            modalImage.src = currentProjectImages[0];
            modalImage.alt = this.alt;
            photographerName.textContent = this.getAttribute('data-photographer') || 'Unknown';
            stylistName.textContent = this.getAttribute('data-stylist') || 'Unknown';
            
            // Add class for mobile gallery hint animation
            if (window.innerWidth <= 768 && currentProjectImages.length > 1) {
                modalImage.classList.add('has-gallery');
                // Remove class after animation completes
                setTimeout(() => {
                    modalImage.classList.remove('has-gallery');
                }, 1100);
            }
            
            // Show modal
            modal.classList.add('active');
            
            // Remove all highlights first, then add to the corresponding project
            projectLinks.forEach(link => {
                link.classList.remove('highlight');
            });
            projectLinks.forEach(link => {
                if (link.getAttribute('data-project-name') === projectName) {
                    link.classList.add('highlight');
                }
            });
        });
    });
    
    // Add hover and click functionality to project titles
    projectLinks.forEach(link => {
        const projectName = link.getAttribute('data-project-name');
        
        // Hover effect - scale corresponding image with GSAP
        link.addEventListener('mouseenter', function() {
            // Find and scale the corresponding image
            galleryItems.forEach(item => {
                if (item.getAttribute('data-project-name') === projectName) {
                    // Trigger the same hover effect as direct image hover
                    item.dispatchEvent(new MouseEvent('mouseenter'));
                }
            });
        });
        
        link.addEventListener('mouseleave', function() {
            // Remove scale from corresponding image
            galleryItems.forEach(item => {
                if (item.getAttribute('data-project-name') === projectName) {
                    // Trigger the same leave effect as direct image hover
                    item.dispatchEvent(new MouseEvent('mouseleave'));
                }
            });
            // Remove highlight if modal is not open
            if (!modal.classList.contains('active')) {
                this.classList.remove('highlight');
            }
        });
        
        // Click functionality for modal
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Find the corresponding image
            const correspondingImage = Array.from(galleryItems).find(item => 
                item.getAttribute('data-project-name') === projectName
            );
            
            if (correspondingImage) {
                // Check if this project has a gallery
                if (projectGalleries[projectName]) {
                    currentProjectImages = projectGalleries[projectName];
                    currentGalleryIndex = 0;
                } else {
                    // Single image project
                    currentProjectImages = [correspondingImage.src];
                    currentGalleryIndex = 0;
                }
                
                // Set modal content
                modalImage.src = currentProjectImages[0];
                modalImage.alt = correspondingImage.alt;
                photographerName.textContent = correspondingImage.getAttribute('data-photographer') || 'Unknown';
                stylistName.textContent = correspondingImage.getAttribute('data-stylist') || 'Unknown';
                
                // Add class for mobile gallery hint animation
                if (window.innerWidth <= 768 && currentProjectImages.length > 1) {
                    modalImage.classList.add('has-gallery');
                    // Remove class after animation completes
                    setTimeout(() => {
                        modalImage.classList.remove('has-gallery');
                    }, 1100);
                }
                
                // Show modal
                modal.classList.add('active');
                
                // Remove all highlights first, then highlight this project
                projectLinks.forEach(link => {
                    link.classList.remove('highlight');
                });
                this.classList.add('highlight');
            }
        });
    });
    
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
        if (e.key === 'Escape') {
            if (modal.classList.contains('active')) {
                modal.classList.remove('active');
                // Remove highlight from all project links
                projectLinks.forEach(link => {
                    link.classList.remove('highlight');
                });
                currentHighlightedProject = null;
            }
            if (contactModal.classList.contains('active')) {
                contactModal.classList.remove('active');
            }
        }
    });
    
    // Contact modal handlers
    contactModalClose.addEventListener('click', function() {
        contactModal.classList.remove('active');
    });
    
    // Close contact modal when clicking outside
    contactModal.addEventListener('click', function(e) {
        if (e.target === contactModal) {
            contactModal.classList.remove('active');
        }
    });
    
    // Handle contact form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would normally send the form data to a server
        // For now, just close the modal
        contactModal.classList.remove('active');
        // Reset form
        contactForm.reset();
    });
});