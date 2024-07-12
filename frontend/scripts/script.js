// scripts/script.js

document.addEventListener('DOMContentLoaded', () => {
    fetchReviews();

    const reviewForm = document.getElementById('review-form');
    reviewForm.addEventListener('submit', (event) => {
        event.preventDefault();
        submitReview();
    });
});

function fetchReviews() {
    fetch('/api/get_reviews') // Update with your API endpoint
        .then(response => response.json())
        .then(reviews => {
            const reviewsContainer = document.getElementById('reviews-container');
            reviewsContainer.innerHTML = '';
            reviews.forEach(review => {
                const reviewElement = document.createElement('div');
                reviewElement.className = 'review';
                reviewElement.innerHTML = `
                    <p>Anonymous User</p>
                    <p>${review.content}</p>
                    <div class="vote-buttons">
                        <button onclick="vote(${review.id}, true)">Upvote</button>
                        <button onclick="vote(${review.id}, false)">Downvote</button>
                        <span class="score">${review.net_score}</span>
                    </div>
                `;
                reviewsContainer.appendChild(reviewElement);
            });
        });
}

function submitReview() {
    const userId = document.getElementById('user_id').value;
    const bookId = document.getElementById('book_id').value;
    const review = document.getElementById('review').value;

    fetch('/api/submit_review', { // Update with your API endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userId, book_id: bookId, review: review })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            fetchReviews();
        } else {
            alert('Failed to submit review');
        }
    });
}

function vote(reviewId, isUpvote) {
    fetch('/api/submit_vote', { // Update with your API endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ review_id: reviewId, vote_type: isUpvote })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            fetchReviews();
        } else {
            alert('Failed to submit vote');
        }
    });
}
