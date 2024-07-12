from flask import Blueprint, request, jsonify
from models import db, Review, Vote

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/api/get_reviews', methods=['GET'])
def get_reviews():
    reviews = Review.query.all()
    reviews_list = [{"id": review.id, "content": review.content, "net_score": review.net_score} for review in reviews]
    return jsonify(reviews=reviews_list)

@review_routes.route('/api/submit_review', methods=['POST'])
def submit_review():
    data = request.json
    new_review = Review(book_id=data['book_id'], content=data['review'])
    db.session.add(new_review)
    db.session.commit()
    return jsonify(success=True)

@review_routes.route('/api/submit_vote', methods=['POST'])
def submit_vote():
    data = request.json
    vote = Vote(review_id=data['review_id'], vote_type=data['vote_type'])
    db.session.add(vote)
    review = Review.query.get(data['review_id'])
    review.net_score += 1 if data['vote_type'] else -1
    db.session.commit()
    return jsonify(success=True)
