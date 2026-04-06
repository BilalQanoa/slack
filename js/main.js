// 1. Theme Toggle Logic
function toggleTheme() {
    const htmlTag = document.documentElement;
    htmlTag.classList.toggle('dark');
    const isDark = htmlTag.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// 2. Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
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
        items.forEach(item => {
            item.classList.remove('active');
            const bar = item.querySelector('.p-bar');
            if (bar) {
                bar.style.transition = 'none';
                bar.style.width = '0%';
            }
        });

        const activeItem = items[index];
        activeItem.classList.add('active');

        // Update Image
        if (mainImg && activeItem.dataset.image) {
            mainImg.style.opacity = '0.5';
            setTimeout(() => {
                mainImg.src = activeItem.dataset.image;
                mainImg.style.opacity = '1';
            }, 200);
        }

        // Animate Progress Bar
        const activeBar = activeItem.querySelector('.p-bar');
        if (activeBar) {
            setTimeout(() => {
                activeBar.style.transition = `width ${duration}ms linear`;
                activeBar.style.width = '100%';
            }, 50);
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
    // Check Theme
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
    }

    // Initialize all Carousels
    const sections = ['section-knowledge', 'section-people', 'section-process', 'section-platform'];
    sections.forEach(id => initSlackCarousel(id));

    // Logic for Top Navigation Tabs
    const tabBtns = document.querySelectorAll('.nav-tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active-tab')); // You can style this in CSS
            btn.classList.add('active-tab');

            const target = btn.dataset.target;
            document.querySelectorAll('.carousel-section').forEach(s => s.classList.remove('active'));
            document.getElementById(target).classList.add('active');
        });
    });
});

const featureItems = document.querySelectorAll('.ai-feature-item');
const featureVideo = document.getElementById('feature-video');

featureItems.forEach(item => {
    item.addEventListener('click', () => {
        // إزالة الكلاس الفعال من الجميع
        featureItems.forEach(i => i.classList.remove('active'));
        // إضافة الكلاس الفعال للعنصر المضغوط
        item.classList.add('active');

        const newVideoSrc = item.getAttribute('data-video');

        // تأثير انتقال بسيط للفيديو
        featureVideo.style.opacity = '0';
        setTimeout(() => {
            featureVideo.src = newVideoSrc;
            featureVideo.play();
            featureVideo.style.opacity = '1';
        }, 300);
    });
});