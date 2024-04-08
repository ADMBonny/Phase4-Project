from flask import Flask, jsonify, request
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///events.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Configure CORS manually
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

db = SQLAlchemy(app)
migrate = Migrate(app, db)

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(100), nullable=False)
    comments = db.relationship('Comment', backref='event', lazy=True)

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Function to create initial database
def create_initial_database():
    with app.app_context():
        db.create_all()

# Define route for /events
# Define route for /events
@app.route('/events', methods=['GET', 'POST'])
def events():
    if request.method == 'GET':
        # Handle GET request to fetch events with comments
        events = Event.query.order_by(Event.id.desc()).all()  # Sort events by ID in descending order
        event_data = []
        for event in events:
            comments = [{'id': comment.id, 'content': comment.content, 'created_at': comment.created_at}
                        for comment in event.comments]
            event_data.append({'id': event.id, 'title': event.title, 'description': event.description,
                               'date': event.date.isoformat(), 'location': event.location,
                               'comments': comments})
        return jsonify(event_data)
    elif request.method == 'POST':
        # Handle POST request to create a new event
        data = request.json
        new_event = Event(title=data['title'], description=data['description'],
                          date=datetime.strptime(data['date'], '%Y-%m-%dT%H:%M:%S'),
                          location=data['location'])
        db.session.add(new_event)
        db.session.commit()
        return jsonify({'message': 'Event created successfully', 'id': new_event.id}), 201


# Routes and other Flask code...

if __name__ == '__main__':
    create_initial_database()  # Create initial database if running as main script
    app.run(debug=True)
