function setTheme(isDark) {

    const htmlTag = document.documentElement;

    htmlTag.classList.toggle('dark', !!isDark);

    try {

        localStorage.setItem('theme', isDark ? 'dark' : 'light');

    } catch {

        // no-op

    }

}
 
function toggleTheme() {

    setTheme(!document.documentElement.classList.contains('dark'));

}
 
// 2. Navbar Scroll Effect

// 2. Navbar Scroll Effect
window.addEventListener('scroll', () => {

    const nav = document.getElementById('navbar');

    if (!nav) return;

    if (window.scrollY > 50) {

        // ضفنا هنا p-3 أو py-3 px-6 عشان يدي مساحة داخلية

        nav.classList.add(

            'mt-4',

            'mx-4',

            'md:mx-[5%]',

            'rounded-full',

            'bg-white/90',

            'dark:bg-[#1a1d21]/90',

            'backdrop-blur-md',

            'shadow-2xl',

            'border',

            'border-gray-200',

            'dark:border-gray-800',

            'py-3', // الـ padding الرأسي عند الـ scroll

            'px-8'  // الـ padding الأفقي عند الـ scroll

        );

        nav.classList.remove('px-[5%]', 'py-4');

    } else {

        nav.classList.remove(

            'mt-4',

            'mx-4',

            'md:mx-[5%]',

            'rounded-full',

            'bg-white/90',

            'dark:bg-[#1a1d21]/90',

            'backdrop-blur-md',

            'shadow-2xl',

            'border',

            'border-gray-200',

            'dark:border-gray-800',

            'py-3',

            'px-8'

        );

        nav.classList.add('px-[5%]', 'py-4');

    }

});
 
function setAccordionActive(section, index, durationMs) {

    const items = section.querySelectorAll('.acc-item');

    items.forEach((item, i) => {

        const isActive = i === index;

        item.classList.toggle('active', isActive);
 
        // Opacity state

        item.classList.toggle('opacity-60', !isActive);

        item.classList.toggle('opacity-100', isActive);
 
        // Content expand/collapse

        const content = item.querySelector('.acc-content');

        if (content) {

            content.classList.toggle('max-h-48', isActive);

            content.classList.toggle('opacity-100', isActive);

            content.classList.toggle('mt-4', isActive);

            content.classList.toggle('max-h-0', !isActive);

            content.classList.toggle('opacity-0', !isActive);

            content.classList.toggle('mt-0', !isActive);

        }
 
        // Reset progress bars

        const bar = item.querySelector('.p-bar');

        if (bar) {

            bar.style.transition = 'none';

            bar.style.width = '0%';

        }

    });
 
    // Animate active progress bar

    const active = items[index];

    const activeBar = active?.querySelector?.('.p-bar');

    if (activeBar) {

        setTimeout(() => {

            activeBar.style.transition = `width ${durationMs}ms linear`;

            activeBar.style.width = '100%';

        }, 50);

    }

}
 
// 3. General Carousel Function (Works for all sections)

function initSlackCarousel(sectionId) {

    const section = document.getElementById(sectionId);

    if (!section) return;
 
    const items = section.querySelectorAll('.acc-item');

    const mainImg = section.querySelector('.carousel-img');

    let currentIndex = 0;

    let timer;

    const duration = 8000;
 
    function update(index) {

        setAccordionActive(section, index, duration);

        const activeItem = items[index];
 
        // Update Image

        if (mainImg && activeItem.dataset.image) {

            mainImg.style.opacity = '0.5';

            setTimeout(() => {

                mainImg.src = activeItem.dataset.image;

                mainImg.style.opacity = '1';

            }, 200);

        }

        currentIndex = index;

    }
 
    function start() {

        clearInterval(timer);

        update(currentIndex);

        timer = setInterval(() => {

            currentIndex = (currentIndex + 1) % items.length;

            update(currentIndex);

        }, duration);

    }
 
    items.forEach((item, idx) => {

        item.addEventListener('click', () => {

            currentIndex = idx;

            start();

        });

    });
 
    start();

}
 
// 4. Initialize Everything on Load

document.addEventListener('DOMContentLoaded', () => {

    // Theme toggle button (theme is already applied in <head> to avoid flash)

    const themeBtns = document.querySelectorAll('[data-theme-toggle]');

    themeBtns.forEach((btn) => btn.addEventListener('click', toggleTheme));
 
    // Mobile menu

    const mobileMenu = document.getElementById('mobileMenu');

    const mobileMenuBtn = document.getElementById('mobileMenuBtn');

    const mobileMenuClose = document.getElementById('mobileMenuClose');

    const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
 
    function openMobileMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.remove('hidden');

        mobileMenu.setAttribute('aria-hidden', 'false');

        mobileMenuBtn?.setAttribute('aria-expanded', 'true');

        document.body.classList.add('overflow-hidden');

    }
 
    function closeMobileMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.add('hidden');

        mobileMenu.setAttribute('aria-hidden', 'true');

        mobileMenuBtn?.setAttribute('aria-expanded', 'false');

        document.body.classList.remove('overflow-hidden');

    }
 
    mobileMenuBtn?.addEventListener('click', openMobileMenu);

    mobileMenuClose?.addEventListener('click', closeMobileMenu);

    mobileMenuBackdrop?.addEventListener('click', closeMobileMenu);
 
    window.addEventListener('keydown', (e) => {

        if (e.key === 'Escape') closeMobileMenu();

    });

    window.addEventListener('resize', () => {

        if (window.innerWidth >= 768) closeMobileMenu();

    });
 
    // Initialize all Carousels

    const sections = ['section-knowledge', 'section-people', 'section-process', 'section-platform'];

    sections.forEach(id => initSlackCarousel(id));
 
    // Logic for Top Navigation Tabs

    const tabBtns = document.querySelectorAll('.nav-tab-btn');

    function setActiveTab(targetId) {

        tabBtns.forEach(b => {

            const isActive = b.dataset.target === targetId;

            b.classList.toggle('bg-white', isActive);

            b.classList.toggle('dark:bg-white/10', isActive);

            b.classList.toggle('shadow', isActive);

            b.classList.toggle('text-[#4a154b]', isActive);

            b.classList.toggle('dark:text-white', isActive);

            b.classList.toggle('text-[#4a154b]/60', !isActive);

            b.classList.toggle('dark:text-white/70', !isActive);

        });
 
        document.querySelectorAll('.carousel-section').forEach(s => s.classList.add('hidden'));

        const activeSection = document.getElementById(targetId);

        activeSection?.classList.remove('hidden');

    }
 
    // Default active tab

    setActiveTab('section-knowledge');
 
    tabBtns.forEach(btn => {

        btn.addEventListener('click', () => {

            const target = btn.dataset.target;

            if (target) setActiveTab(target);

        });

    });
 
    // AI feature list video switcher

    const featureItems = document.querySelectorAll('.ai-feature-item');

    const featureVideo = document.getElementById('feature-video');
 
    featureItems.forEach(item => {

        item.addEventListener('click', () => {

            featureItems.forEach(i => i.classList.remove('active'));

            item.classList.add('active');
 
            const newVideoSrc = item.getAttribute('data-video');

            if (!featureVideo || !newVideoSrc) return;
 
            featureVideo.style.opacity = '0';

            setTimeout(() => {

                featureVideo.src = newVideoSrc;

                featureVideo.play?.();

                featureVideo.style.opacity = '1';

            }, 300);

        });

    });

});
 
