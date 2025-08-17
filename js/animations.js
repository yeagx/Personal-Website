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
    
    // Clash Royale section animation - Only runs once on first view
    let clashRoyaleAnimated = false;
    const clashRoyaleSection = document.querySelector('.clash-royale');
    if (clashRoyaleSection) {
        const clashObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !clashRoyaleAnimated) {
                    clashRoyaleAnimated = true;
                    
                    if (typeof gsap !== 'undefined') {
                        // Animate the clash royale title
                        gsap.from(".clash-royale h1", {
                            duration: 1,
                            y: -50,
                            opacity: 0,
                            ease: "power3.out",
                            onComplete: () => {
                                gsap.set(".clash-royale h1", { opacity: 1, y: 0 });
                            }
                        });
                        
                        // Animate the player info and main deck containers
                        gsap.from(".player-info, .main-deck", {
                            duration: 1.2,
                            y: 80,
                            opacity: 0,
                            stagger: 0.2,
                            ease: "power3.out",
                            delay: 0.3,
                            onComplete: () => {
                                gsap.set(".player-info, .main-deck", { opacity: 1, y: 0 });
                            }
                        });
                        
                        // Animate the stat items
                        gsap.from(".stat-item", {
                            duration: 0.8,
                            y: 40,
                            opacity: 0,
                            stagger: 0.1,
                            ease: "power2.out",
                            delay: 0.6,
                            onComplete: () => {
                                gsap.set(".stat-item", { opacity: 1, y: 0 });
                            }
                        });
                        
                        // Animate the deck cards
                        gsap.from(".deck-card", {
                            duration: 0.6,
                            scale: 0.8,
                            opacity: 0,
                            stagger: 0.1,
                            ease: "back.out(1.7)",
                            delay: 0.9,
                            onComplete: () => {
                                gsap.set(".deck-card", { opacity: 1, scale: 1 });
                            }
                        });
                        
                        // Animate the achievements chips
                        gsap.from(".achievements-chips .chip", {
                            duration: 0.5,
                            y: 20,
                            opacity: 0,
                            stagger: 0.1,
                            ease: "power2.out",
                            delay: 1.2,
                            onComplete: () => {
                                gsap.set(".achievements-chips .chip", { opacity: 1, y: 0 });
                            }
                        });
                    }
                    
                    clashObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });
        
        clashObserver.observe(clashRoyaleSection);
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
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
});