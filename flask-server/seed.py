from flask import Flask
from faker import Faker
from models import db, Comment
from random import randint

app = Flask(__name__)  # Create a Flask application
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///event_planning.db'  # Replace with your actual database URI
db.init_app(app)

# Function to create database tables
def create_tables():
    with app.app_context():  # Use the application context
        db.create_all()

fake = Faker()

def generate_fake_comments(num_comments=10):
    with app.app_context():  # Use the application context
        create_tables()  # Create tables if they don't exist
        for _ in range(num_comments):
            comment = Comment(
                event_id=randint(1, 100),  # Assuming event IDs range from 1 to 100
                user_id=randint(1, 50),     # Assuming user IDs range from 1 to 50
                content=fake.paragraph()
            )
            db.session.add(comment)
        db.session.commit()

if __name__ == '__main__':
    generate_fake_comments()
