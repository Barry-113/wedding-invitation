document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const openBtn = document.getElementById('open-invitation-btn');
    const audioToggleBtn = document.getElementById('audio-toggle-btn');
    const bgAudio = document.getElementById('bg-audio');
    const guestGreeting = document.getElementById('guest-greeting');

    // Parse URL query parameter for guest name
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    if (guestName) {
        const decodedName = decodeURIComponent(guestName.replace(/\+/g, ' '));
        guestGreeting.textContent = `Thân Mời: ${decodedName}`;
    }

    // Open invitation action with cinematic auto-scroll
    openBtn.addEventListener('click', () => {
        splashScreen.classList.add('opacity-0', 'pointer-events-none');
        
        setTimeout(() => {
            splashScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            
            // Initialize 3D Album Slider
            if (typeof Swiper !== 'undefined') {
                new Swiper('.album-swiper', {
                    effect: 'coverflow',
                    grabCursor: true,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    coverflowEffect: {
                        rotate: 15,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false,
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    loop: true,
                });
            }

            // Cinematic Auto-Scroll Logic
            let autoScroll = setInterval(() => {
                window.scrollBy({ top: 1, left: 0, behavior: 'auto' });
            }, 30); // Scrolls 1px every 30ms

            // Stop auto-scroll the moment a user interacts (scrolls, touches, or clicks)
            const stopScroll = () => {
                if (autoScroll) {
                    clearInterval(autoScroll);
                    autoScroll = null;
                }
            };
            window.addEventListener('touchstart', stopScroll, { passive: true });
            window.addEventListener('wheel', stopScroll, { passive: true });
            window.addEventListener('mousedown', stopScroll, { passive: true });

        }, 700);

        // Play Audio
        bgAudio.play().then(() => {
            audioToggleBtn.style.borderColor = '#113821';
        }).catch(err => {
            console.log("Audio autoplay restricted by browser:", err);
        });
    });

    // Toggle audio button
    audioToggleBtn.addEventListener('click', () => {
        if (bgAudio.paused) {
            bgAudio.play();
            audioToggleBtn.style.borderColor = '#113821';
        } else {
            bgAudio.pause();
            audioToggleBtn.style.borderColor = 'rgba(17,56,33,0.4)';
        }
    });
});