document.addEventListener('DOMContentLoaded', function () {
    // Check if user is signed in
    function isUserSignedIn() {
        return localStorage.getItem('token') !== null;
    }

    // Handle login
    function login() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                window.location.reload();
            } else {
                alert(data.message);
            }
        });
    }

    // Handle signup
    function signup() {
        const username = document.getElementById('signupUsername').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            if (data.message === 'User registered successfully!') {
                window.location.href = 'auth.html'; // Redirect to login page
            }
        });
    }

    // Handle logout
    function logout() {
        localStorage.removeItem('token');
        window.location.reload();
    }

    // Update UI based on sign-in status
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

    // Event listeners for forms
    document.getElementById('logout').addEventListener('click', logout);

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            login();
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            signup();
        });
    }

    // Fetch and render reviews
    async function fetchReviews() {
        const response = await fetch('/api/reviews');
        const reviews = await response.json();
        renderReviews(reviews);
    }

    function renderReviews(reviews) {
        const container = document.getElementById('reviewsContainer');
        container.innerHTML = '';
        reviews.forEach(review => {
            const reviewItem = document.createElement('div');
            reviewItem.classList.add('review-item');
            reviewItem.innerHTML = `
                <img src="${review.bookIcon}" alt="Book Icon">
                <strong>${review.user.username}</strong>
                <p>${review.review}</p>
            `;
            container.appendChild(reviewItem);
        });
    }

    fetchReviews();

    // Display review form if user is signed in
    const reviewFormSection = document.getElementById('reviewFormSection');
    if (isUserSignedIn() && reviewFormSection) {
        reviewFormSection.style.display = 'block';
    }

    // Handle review form submission
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const bookId = document.getElementById('bookId').value;
            const reviewText = document.getElementById('reviewText').value;

            if (bookId && reviewText) {
                fetch('/api/reviews', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({ bookId, reviewText })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.message === 'Review added successfully!') {
                        fetchReviews();
                        reviewForm.reset();
                    } else {
                        alert(data.message);
                    }
                });
            }
        });
    }
});
