import os
import json

from flask import Flask
from flask import request
from flask_cors import CORS
import psycopg2
import urllib.request

from flask_sqlalchemy import SQLAlchemy
from flask_sslify import SSLify

from .config import DATABASE_URL

db = SQLAlchemy()
import server.models


def create_app():
    app = Flask(__name__, static_folder="./static/dist", template_folder="./static")
    CORS(app)
    sslify = SSLify(app)
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
    with urllib.request.urlopen('https://api.myjson.com/bins/8mmby') as response:
        json_data = json.load(response)
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
