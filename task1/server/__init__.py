import os
import json

from flask import Flask
from flask import request
import psycopg2

from flask_sqlalchemy import SQLAlchemy

from config import DATABASE_URL

project_dir = os.path.dirname(os.path.abspath(__file__))
database_file = "sqlite:///{}".format(os.path.join(project_dir, "tv_and_fridge.db"))

db = SQLAlchemy()
import models


def create_app():
    app = Flask(__name__, static_folder="../static/dist", template_folder="../static")
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    conn = psycopg2.connect(DATABASE_URL, sslmode='require')
    db.init_app(app)
    if db is not None:
        print('Successfully connecting to database')
    return app

def create_db():
    db.create_all()

def fill_db():
    with open('./data.json', 'r') as data:
        json_data = json.load(data)
        tvs = json_data.get('tv')
        fridges = json_data.get('fridges')
        for t in tvs:
            item = models.TV(title=t['title'], cost=t['cost'], screen_size=t['screen_size'], clicks = 0)
            db.session.add(item)
        for f in fridges:
            item = models.Fridges(title=f['title'], cost=f['cost'], capacity=f['capacity'], clicks = 0)
            db.session.add(item)
        db.session.commit()

def drop_db():
    db.drop_all()
