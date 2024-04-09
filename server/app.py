from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from config import Config
from models import db, Event
from datetime import datetime

app = Flask(__name__)
app.config.from_object(Config)

app.debug = True

CORS(app)

db.init_app(app)
with app.app_context():
    db.create_all()

migrate = Migrate(app, db)

def format_date(date):
    """Convert a datetime.date object into 'YYYY-MM-DD' string format."""
    return date.strftime('%Y-%m-%d') if date else ''

@app.route('/events', methods=['POST'])
def create_event():
    data = request.json
    try:
        # Directly parse the incoming date string in 'YYYY-MM-DD' format
        date_obj = datetime.strptime(data['date'], '%Y-%m-%d').date()
        event = Event(name=data['name'], description=data['description'], date=date_obj)
        db.session.add(event)
        db.session.commit()
        return jsonify({"message": "Event added successfully", "id": event.id}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/events', methods=['GET'])
def list_events():
    events = Event.query.all()
    events_data = [{"id": event.id, "name": event.name, "description": event.description, "date": format_date(event.date)} for event in events]
    return jsonify(events_data), 200

@app.route('/events/<int:event_id>', methods=['GET'])
def get_event(event_id):
    event = Event.query.get_or_404(event_id)
    event_data = {"id": event.id, "name": event.name, "description": event.description, "date": format_date(event.date)}
    return jsonify(event_data), 200

@app.route('/events/<int:event_id>', methods=['PUT'])
def update_event(event_id):
    event = Event.query.get_or_404(event_id)
    data = request.json
    try:
        # Directly parse the incoming date string in 'YYYY-MM-DD' format
        event.date = datetime.strptime(data['date'], '%Y-%m-%d').date()
        event.name = data['name']
        event.description = data['description']
        db.session.commit()
        return jsonify({"message": "Event updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@app.route('/events/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    event = Event.query.get_or_404(event_id)
    try:
        db.session.delete(event)
        db.session.commit()
        return jsonify({"message": "Event deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
