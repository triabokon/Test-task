from server import create_app, db, create_db, fill_db
from flask import render_template, jsonify

app = create_app()

from models import TV,Fridges

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/tv", methods=["GET"])
def tv_list():
    response_object = {
        'status': 'success',
        'data': {
            'tvs': [tv.to_json() for tv in TV.query.all()]
        }
    }
    return jsonify(response_object), 200


@app.route("/fridge", methods=["GET"])
def fridge_list():
    response_object = {
        'status': 'success',
        'data': {
            'fridges': [fridge.to_json() for fridge in Fridges.query.all()]
        }
    }
    return jsonify(response_object), 200

if __name__ == "__main__":
    app.run()