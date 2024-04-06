from flask import Flask, request, jsonify
from models import db, Comment
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///event_planning.db'
db.init_app(app)

migrate = Migrate(app, db)

def create_tables():
    with app.app_context():
        db.create_all()

create_tables()

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route('/comments', methods=['GET'])
def get_comments():
    event_id = request.args.get('event_id')  # Get event ID from query parameters
    if event_id:
        comments = Comment.query.filter_by(event_id=event_id).order_by(Comment.created_at.desc()).all()
    else:
        comments = Comment.query.order_by(Comment.created_at.desc()).all()
    return jsonify([comment.serialize() for comment in comments]), 200


@app.route('/comments', methods=['POST'])
def create_comment():
    data = request.json
    new_comment = Comment(
        event_id=data['event_id'],
        user_id=data['user_id'],
        content=data['content']
    )
    db.session.add(new_comment)
    db.session.commit()
    return jsonify({'message': 'Comment created successfully'}), 201

@app.route('/comments/<int:comment_id>', methods=['PUT', 'DELETE'])
def update_or_delete_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if not comment:
        return jsonify({'error': 'Comment not found'}), 404

    if request.method == 'PUT':
        data = request.json
        comment.content = data['content']
        db.session.commit()
        return jsonify({'message': 'Comment updated successfully'}), 200
    elif request.method == 'DELETE':
        db.session.delete(comment)
        db.session.commit()
        return jsonify({'message': 'Comment deleted successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)
