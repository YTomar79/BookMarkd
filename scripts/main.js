document.addEventListener('DOMContentLoaded', function () {
    // Check if the user is signed in
    function isUserSignedIn() {
        // Replace this with real authentication check logic
        return localStorage.getItem('userSignedIn') === 'true';
    }

    // Function to handle login
    function login() {
        localStorage.setItem('userSignedIn', 'true');
        window.location.reload();
    }

    // Function to handle logout
    function logout() {
        localStorage.removeItem('userSignedIn');
        window.location.reload();
    }

    // Toggle dashboard and homepage based on user's sign-in status
    if (isUserSignedIn()) {
        document.getElementById('dashboard').style.display = 'block';
        document.getElementById('homepage').style.display = 'none';
        document.getElementById('auth-links').style.display = 'none';
        document.getElementById('dashboard-link').style.display = 'flex';
    } else {
        document.getElementById('dashboard').style.display = 'none';
        document.getElementById('homepage').style.display = 'block';
        document.getElementById('auth-links').style.display = 'flex';
        document.getElementById('dashboard-link').style.display = 'none';
    }

    // Set up the logout button
    document.getElementById('logout').addEventListener('click', logout);
    
    // Sample reviews data
    const reviews = [
        { user: 'John Doe', review: 'Great app! Really helps me organize my bookmarks.' },
        { user: 'Jane Smith', review: 'Very useful tool, easy to use.' },
        { user: 'Sam Wilson', review: 'I love the features and the UI is fantastic.' },
    ];

    // Function to render reviews
    function renderReviews(containerId, limit) {
        const container = document.getElementById(containerId);
        container.innerHTML = ''; // Clear the container first
        const reviewsToRender = limit ? reviews.slice(0, limit) : reviews;

        reviewsToRender.forEach(review => {
            const reviewItem = document.createElement('div');
            reviewItem.classList.add('review-item');
            reviewItem.innerHTML = `<strong>${review.user}</strong><p>${review.review}</p>`;
            container.appendChild(reviewItem);
        });
    }

    // Render reviews if the container exists
    if (document.getElementById('reviewsContainer')) {
        renderReviews('reviewsContainer');
    }

    if (document.getElementById('reviews-preview-container')) {
        renderReviews('reviews-preview-container', 2);
    }

    // Check if user is logged in for displaying the review form section
    const isLoggedIn = isUserSignedIn();

    const reviewFormSection = document.getElementById('reviewFormSection');
    if (isLoggedIn && reviewFormSection) {
        reviewFormSection.style.display = 'block';
    }

    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            login();
        });
    }

    // Handle sign up form submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Handle sign up logic here
            alert('Sign up form submitted');
        });
    }

    // Handle review form submission
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const bookId = document.getElementById('bookId').value;
            const reviewText = document.getElementById('reviewText').value;

            if (bookId && reviewText) {
                // Add the new review to the reviews array
                reviews.unshift({ user: `User ${bookId}`, review: reviewText });

                // Re-render the reviews
                renderReviews('reviewsContainer');
                renderReviews('reviews-preview-container', 2);

                // Clear the form
                reviewForm.reset();
            }
        });
    }
});
