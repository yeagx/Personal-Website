// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP is available
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero section animation
        gsap.from(".hero-content", {
            duration: 1.5,
            y: 100,
            opacity: 0,
            ease: "power3.out",
            delay: 0.5,
            onComplete: () => {
                gsap.set(".hero-content", { opacity: 1, y: 0 });
            }
        });
        
        // About section animation
        gsap.from(".about-content", {
            scrollTrigger: {
                trigger: ".about",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power2.out",
            onComplete: () => {
                gsap.set(".about-content", { opacity: 1, y: 0 });
            }
        });
        
        // Projects section animation
        gsap.from(".box", {
            scrollTrigger: {
                trigger: ".projects",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            },
            duration: 0.8,
            y: 60,
            opacity: 0,
            stagger: 0.2,
            ease: "power2.out",
            onComplete: () => {
                gsap.set(".box", { opacity: 1, y: 0 });
            }
        });
        
        // DA Projects section animation
        gsap.from(".da-project-card", {
            scrollTrigger: {
                trigger: ".da-projects",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power2.out",
            onComplete: () => {
                gsap.set(".da-project-card", { opacity: 1, y: 0 });
            }
        });
        
        // Contact section animation
        gsap.from(".contact .container", {
            scrollTrigger: {
                trigger: ".contact",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power2.out",
            onComplete: () => {
                gsap.set(".contact .container", { opacity: 1, y: 0 });
            }
        });
        
        // Footer animation
        gsap.from("footer", {
            scrollTrigger: {
                trigger: "footer",
                start: "top 90%",
                toggleActions: "play none none none"
            },
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: "power2.out",
            onComplete: () => {
                gsap.set("footer", { opacity: 1, y: 0 });
            }
        });
    }
    
    // Services section animation with Intersection Observer
    const servicesSection = document.querySelector('.services');
    if (servicesSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });
        
        observer.observe(servicesSection);
    }
    
    // YouTube section animation with Intersection Observer
    const youtubeSection = document.querySelector('.youtube');
    if (youtubeSection) {
        const youtubeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    youtubeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });
        
        youtubeObserver.observe(youtubeSection);
    }
    
    // Clash Royale section animation - Fixed to work on first view
    const clashRoyaleSection = document.querySelector('.clash-royale');
    if (clashRoyaleSection && typeof gsap !== 'undefined') {
        // Set initial opacity to 0 for animated elements
        gsap.set(".clash-royale h1", { opacity: 0, y: -50 });
        gsap.set(".player-info, .main-deck", { opacity: 0, y: 80 });
        gsap.set(".stat-item", { opacity: 0, y: 40 });
        gsap.set(".deck-card", { opacity: 0, scale: 0.8 });
        gsap.set(".achievements-chips .chip", { opacity: 0, y: 20 });
        
        const clashObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate the clash royale title
                    gsap.to(".clash-royale h1", {
                        duration: 1,
                        y: 0,
                        opacity: 1,
                        ease: "power3.out"
                    });
                    
                    // Animate the player info and main deck containers
                    gsap.to(".player-info, .main-deck", {
                        duration: 1.2,
                        y: 0,
                        opacity: 1,
                        stagger: 0.2,
                        ease: "power3.out",
                        delay: 0.3
                    });
                    
                    // Animate the stat items
                    gsap.to(".stat-item", {
                        duration: 0.8,
                        y: 0,
                        opacity: 1,
                        stagger: 0.1,
                        ease: "power2.out",
                        delay: 0.6
                    });
                    
                    // Animate the deck cards
                    gsap.to(".deck-card", {
                        duration: 0.6,
                        scale: 1,
                        opacity: 1,
                        stagger: 0.1,
                        ease: "back.out(1.7)",
                        delay: 0.9
                    });
                    
                    // Animate the achievements chips
                    gsap.to(".achievements-chips .chip", {
                        duration: 0.5,
                        y: 0,
                        opacity: 1,
                        stagger: 0.1,
                        ease: "power2.out",
                        delay: 1.2
                    });
                    
                    clashObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px'
        });
        
        clashObserver.observe(clashRoyaleSection);
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Special handling for DA projects section to center it
                if (target.id === 'da-projects') {
                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight;
                    const viewportHeight = window.innerHeight;
                    const targetHeight = target.offsetHeight;
                    const scrollPosition = targetPosition - (viewportHeight - targetHeight) / 2;
                    
                    window.scrollTo({
                        top: Math.max(0, scrollPosition),
                        behavior: 'smooth'
                    });
                } else {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Back to top button functionality
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Active nav link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.items a[href^="#"]');
    
    function updateActiveNavLink() {
        let current = '';
        const scrollY = window.pageYOffset;
        const navHeight = document.querySelector('.nav').offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        // Handle hero section (when at top of page)
        if (scrollY < 100) {
            current = 'hero';
        }
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Update on page load
    updateActiveNavLink();
});