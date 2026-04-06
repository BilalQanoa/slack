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