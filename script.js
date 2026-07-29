$(window).on('load', function() {
    // Hide Preloader
    setTimeout(function() {
        $('#preloader').fadeOut('slow');
    }, 500);

    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
});

$(document).ready(function() {
    // Current Year for Footer
    $('#year').text(new Date().getFullYear());

    // Typed.js Initialization
    if ($('#typed').length) {
        new Typed('#typed', {
            strings: ['Python Developer', 'Django Developer', 'Web Developer'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1500,
            loop: true
        });
    }

    // Particles.js Initialization
    if ($('#particles-js').length) {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#4f46e5", "#ec4899", "#818cf8"]
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#64748b",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Scroll Progress Bar & Navbar Sticky
    $(window).scroll(function() {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        $('#scroll-progress').css('width', scrolled + '%');

        if ($(this).scrollTop() > 50) {
            $('.glass-navbar').addClass('scrolled');
        } else {
            $('.glass-navbar').removeClass('scrolled');
        }

        // Back to Top Button visibility
        if ($(this).scrollTop() > 300) {
            $('#backToTop').addClass('show');
        } else {
            $('#backToTop').removeClass('show');
        }
    });

    // Back to Top Click
    $('#backToTop').click(function() {
        $('html, body').animate({scrollTop: 0}, 'smooth');
        return false;
    });

    // Theme Toggle
    const htmlElement = $('html');
    const themeToggle = $('#theme-toggle');
    const themeIcon = $('#theme-icon');
    
    // Check local storage for theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    themeToggle.click(function() {
        const currentTheme = htmlElement.attr('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        htmlElement.attr('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            themeIcon.removeClass('fa-moon').addClass('fa-sun');
        } else {
            themeIcon.removeClass('fa-sun').addClass('fa-moon');
        }
    }

    // Formspree Integration
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        const form = $(this);
        const btn = form.find('button[type="submit"]');
        const originalText = btn.html();
        
        btn.html('<i class="fas fa-spinner fa-spin me-2"></i>Sending...');
        btn.prop('disabled', true);
        
        // Submit using AJAX
        $.ajax({
            url: form.attr('action'),
            method: form.attr('method'),
            data: form.serialize(),
            dataType: 'json',
            success: function() {
                btn.html('<i class="fas fa-check me-2"></i>Sent Successfully');
                btn.removeClass('btn-primary').addClass('btn-success');
                form[0].reset();
                
                setTimeout(function() {
                    btn.html(originalText);
                    btn.removeClass('btn-success').addClass('btn-primary');
                    btn.prop('disabled', false);
                }, 3000);
            },
            error: function() {
                btn.html('<i class="fas fa-exclamation-circle me-2"></i>Error Sending');
                btn.removeClass('btn-primary').addClass('btn-danger');
                
                setTimeout(function() {
                    btn.html(originalText);
                    btn.removeClass('btn-danger').addClass('btn-primary');
                    btn.prop('disabled', false);
                }, 3000);
            }
        });
    });
});
