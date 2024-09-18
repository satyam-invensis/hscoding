document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('predictionForm');
    const loading = document.getElementById('loading');
    const tryAnotherBtn = document.querySelector('.try-another-btn');

    // Event listener for the "Try Another" button
    if (tryAnotherBtn) {
        tryAnotherBtn.addEventListener('click', () => {
            window.location.href = `${window.location.origin}/Frontend/index.html`;
        });
    } else {
        console.error('Button with class "try-another-btn" not found.');
    }

    // Event listener for the prediction form
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            const formData = new FormData(form);
            loading.style.display = 'block'; // Show loading indicator

            fetch(`${window.location.origin}/predict`, {
                method: 'POST',
                body: new URLSearchParams(formData)
            })
            .then(response => {
                loading.style.display = 'none'; // Hide loading indicator

                if (!response.ok) {
                    throw new Error('Failed to get prediction results');
                }
                return response.text(); // Get HTML response
            })
            .then(html => {
                // Create a new window and insert the HTML
                const newWindow = window.open('', '_blank');
                newWindow.document.open();
                newWindow.document.write(html);
                newWindow.document.close();
            })
            .catch(error => {
                loading.style.display = 'none'; // Hide loading indicator
                console.error('Error:', error);
                alert('There was an error processing your request.');
            });
        });
    } else {
        console.error('Form with id "predictionForm" not found.');
    }
});
