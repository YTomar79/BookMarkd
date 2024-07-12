document.addEventListener('DOMContentLoaded', function () {
    const reviews = [
        { user: 'John Doe', review: 'Great app! Really helps me organize my bookmarks.' },
        { user: 'Jane Smith', review: 'Very useful tool, easy to use.' },
        { user: 'Sam Wilson', review: 'I love the features and the UI is fantastic.' },
    ];

    function renderReviews(containerId, limit) {
        const container = document.getElementById(containerId);
        const reviewsToRender = limit ? reviews.slice(0, limit) : reviews;

        reviewsToRender.forEach(review => {
            const reviewItem = document.createElement('div');
            reviewItem.classList.add('review-item');
            reviewItem.innerHTML = `<strong>${review.user}</strong><p>${review.review}</p>`;
            container.appendChild(reviewItem);
        });
    }

    if (document.getElementById('reviewsContainer')) {
        renderReviews('reviewsContainer');
    }

    if (document.getElementById('reviews-preview-container')) {
        renderReviews('reviews-preview-container', 2);
    }
});
