function toggleTheme() {
    const htmlTag = document.documentElement;
    htmlTag.classList.toggle('dark');
    const isDark = htmlTag.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
}

window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add(
            'mt-4',           
            'mx-4',           
            'md:mx-[5%]',      
            'rounded-full',   
            'px-6',           
            'py-3',          
            'bg-white/90',
            'dark:bg-[#1a1d21]/90',
            'backdrop-blur-md',
            'shadow-2xl',
            'border',
            'border-gray-200',
            'dark:border-gray-800'
        );
        nav.classList.remove('px-[5%]', 'py-4', 'top-0');
    } else {
        nav.classList.remove(
            'mt-4',
            'mx-4',
            'md:mx-[5%]',
            'rounded-full',
            'px-6',
            'py-3',
            'bg-white/90',
            'dark:bg-[#1a1d21]/90',
            'backdrop-blur-md',
            'shadow-2xl',
            'border',
            'border-gray-200',
            'dark:border-gray-800'
        );
        nav.classList.add('px-[5%]', 'py-4', 'top-0');
    }
});