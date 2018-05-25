from server import create_app, db
from flask import render_template, jsonify

app = create_app()

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/tv", methods=["GET"])
def tv_list():
    response_object = {
        'status': 'success',
        'data': {
            'videos': [tv.to_json() for tv in TV.query.all()]
        }
    }
    return jsonify(response_object), 200


@app.route("/fridge", methods=["GET"])
def fridge_list():
    response_object = {
        'status': 'success',
        'data': {
            'videos': [fridge.to_json() for fridge in Fridges.query.all()]
        }
    }
    return jsonify(response_object), 200

if __name__ == "__main__":
    app.run()