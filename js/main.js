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
        nav.classList.add('mt-4', 'mx-[5%]', 'rounded-full', 'bg-white/90', 'dark:bg-black/80', 'backdrop-blur-md', 'shadow-xl', 'border', 'border-gray-200', 'dark:border-gray-800');
        nav.classList.remove('px-[5%]');
    } else {
        nav.classList.remove('mt-4', 'mx-[5%]', 'rounded-full', 'bg-white/90', 'dark:bg-black/80', 'backdrop-blur-md', 'shadow-xl', 'border', 'border-gray-200', 'dark:border-gray-800');
        nav.classList.add('px-[5%]');
    }
});

// Function to handle form submission
function handleFormSubmission(event) {
    event.preventDefault(); // Stop the page from reloading

    // 1. Collect form data using FormData API
    const formData = new FormData(event.target);
    const data = {};

    // 2. Convert FormData entries to a simple object
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // 3. Simple feedback (console log for developers, alert for user)
    console.log("Form Submitted Successfully!", data);
    alert(`Thank you, ${data.firstName}! We will contact you soon.`);

    // 4. Optionally, you can clear the form
    event.target.reset();
}

// Attach the event listener to the form element
document.getElementById('contactSalesForm').addEventListener('submit', handleFormSubmission);