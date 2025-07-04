// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Navbar animation
    gsap.from('.nav', {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Mobile menu toggle
    const toggleBtn = document.querySelector('.toggle-btn');
    const closeBtn = document.querySelector('.close-btn');
    const menuContainer = document.querySelector('.menu-container');
    const menuItems = document.querySelectorAll('.items a');
    let isOpen = false;

    toggleBtn.addEventListener('click', () => {
        if (!isOpen) {
            // Open menu
            gsap.to(menuContainer, {
                left: 0,
                duration: 0.6,
                ease: 'power3.inOut'
            });

            gsap.fromTo(menuItems,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'power3.out',
                    delay: 0.2
                }
            );

            document.querySelector('.nav').classList.add('active');
            isOpen = true;
        }
    });

    closeBtn.addEventListener('click', () => {
        if (isOpen) {
            // Close menu
            gsap.to(menuContainer, {
                left: '-100%',
                duration: 0.6,
                ease: 'power3.inOut'
            });

            gsap.to(menuItems, {
                y: 30,
                opacity: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: 'power3.out'
            });

            document.querySelector('.nav').classList.remove('active');
            isOpen = false;
        }
    });

    // Close menu when clicking a navigation link
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            if (isOpen) {
                gsap.to(menuContainer, {
                    left: '-100%',
                    duration: 0.6,
                    ease: 'power3.inOut'
                });

                gsap.to(menuItems, {
                    y: 30,
                    opacity: 0,
                    duration: 0.4,
                    stagger: 0.1,
                    ease: 'power3.out'
                });

                document.querySelector('.nav').classList.remove('active');
                isOpen = false;
            }
        });
    });
    
    // Hero section animations
    gsap.from('.hero-img', {
        scale: 0.9, // Slight scale for a subtle zoom-in effect (optional)
        opacity: 0, // Start fully transparent
        duration: 1.2,
        ease: 'power3.out', // Smooth easing for fade-in
        delay: 0.5
    });

    // Animate the gradient ring separately
    gsap.from('.gradient-ring', {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.7
    });

    gsap.from('.hero-content h1', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.8
    });

    gsap.from('.hero-content p', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 1
    });

    gsap.from('.hero-buttons a', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 1.2
    });

    // About section animations (scroll triggered)
    gsap.from('.about h1', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%'
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.about-content .left', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%'
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3
    });

    gsap.from('.about-content .right', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%'
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3
    });

    // Skills bars animation (replacing the current window.load event)
    gsap.from('.skill-bar', {
        scrollTrigger: {
            trigger: '.skills',
            start: 'top 80%'
        },
        width: 0,
        duration: 1.5,
        ease: 'power3.out',
        stagger: 0.2,
        delay: 0.5
    });

    // Projects section animations
    gsap.from('.projects h1', {
        scrollTrigger: {
            trigger: '.projects',
            start: 'top 80%'
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.box', {
        scrollTrigger: {
            trigger: '.projects',
            start: 'top 80%'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2
    });

    // Add hover animation for .box elements
    document.querySelectorAll('.box').forEach(box => {
        box.addEventListener('mouseenter', () => {
            gsap.to(box, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power3.out'
            });
        });

        box.addEventListener('mouseleave', () => {
            gsap.to(box, {
                scale: 1,
                duration: 0.3,
                ease: 'power3.out'
            });
        });
    });

    // Contact section animations
    gsap.from('.contact h2', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%'
        },
        y: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%'
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3
    });

    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%'
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.3
    });

    // Footer animation
    gsap.from('footer', {
        scrollTrigger: {
            trigger: 'footer',
            start: 'top bottom', // Trigger when footer top hits viewport bottom
            toggleActions: 'play none none none' // Play once when entering
        },
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Animate YouTube section on scroll
    function animateOnScroll(selector, animationClass = 'in-view') {
        const el = document.querySelector(selector);
        if (!el) return;
        const observer = new window.IntersectionObserver(
            ([entry], obs) => {
                if (entry.isIntersecting) {
                    el.classList.add(animationClass);
                    obs.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        observer.observe(el);
    }

    animateOnScroll('.youtube');
});

gsap.registerPlugin(ScrollTrigger);