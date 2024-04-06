import os
from flask import Flask
from faker import Faker
from models import db, Comment

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///event_planning.db'
db.init_app(app)

# Function to create database tables
def create_tables():
    with app.app_context():
        db.create_all()

fake = Faker()

def generate_fake_comments(num_comments=10):
    with app.app_context():
        create_tables()  # Create tables if they don't exist
        event_id = 1
        for _ in range(num_comments):
            comment = Comment(
                event_id=event_id,  # Use sequential event IDs
                user_id=fake.random_int(min=1, max=50),  # Assuming user IDs range from 1 to 50
                content=fake.paragraph()
            )
            db.session.add(comment)
            event_id += 1  # Increment event ID for the next comment
        db.session.commit()

if __name__ == '__main__':
    generate_fake_comments()
