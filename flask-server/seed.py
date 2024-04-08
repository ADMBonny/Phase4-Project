from server import app, db 
from flask import Flask, jsonify
from models import db, Event, Comment
from faker import Faker
import random

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///events.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

fake = Faker()

def generate_data(num_events):
    with app.app_context():
        # Generate events
        for _ in range(num_events):
            event = Event(
                title=fake.sentence(),
                description=fake.paragraph(),
                date=fake.date_time(),
                location=fake.city()
            )
            db.session.add(event)
        
        # Generate comments separately
        events = Event.query.all()
        for event in events:
            num_comments = random.randint(1, 3)  # Generate 1 to 3 comments for each event
            for _ in range(num_comments):
                comment = Comment(
                    event_id=event.id,
                    content=fake.text(),
                )
                db.session.add(comment)
        
        db.session.commit()

@app.route('/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    event_data = [{'title': event.title, 'description': event.description, 'date': event.date, 'location': event.location, 'comments': [{'content': comment.content} for comment in event.comments]} for event in events]
    return jsonify(event_data)

if __name__ == '__main__':
    num_events_to_generate = 10  # Specify the number of events you want to generate
    generate_data(num_events_to_generate)
    app.run(debug=True)
