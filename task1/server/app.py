from server import create_app, db, fill_db, reset_tables
from flask import render_template, jsonify, request

app = create_app()

from server.models import TV,Fridges

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/tv/", methods=["GET", "POST"])
def tv_list():
    if request.method == "POST":
        resp = request.get_json()
        resp_id = int(resp.get('id'))
        tv = TV.query.filter_by(id=resp_id).first()
        tv.clicks += 1
        db.session.commit()
    response_object = {
        'status': 'success',
        'data': {
            'tvs': [tv.to_json() for tv in TV.query.all()]
        }
    }
    return jsonify(response_object), 200


@app.route("/fridge/", methods=["GET", "POST"])
def fridge_list():
    if request.method == "POST":
        resp = request.get_json()
        resp_id = int(resp.get('id'))
        fridge = Fridges.query.filter_by(id=resp_id).first()
        fridge.clicks += 1
        db.session.commit()
    response_object = {
        'status': 'success',
        'data': {
            'fridges': [fridge.to_json() for fridge in Fridges.query.all()]
        }
    }
    return jsonify(response_object), 200

@app.route("/reset/", methods=["POST"])
def reset_db():
    reset_tables()
    fill_db()
    response_object = {
        'status': 'success',
        'data': {
            'tvs': [tv.to_json() for tv in TV.query.all()],
            'fridges': [fridge.to_json() for fridge in Fridges.query.all()]
        }
    }
    return jsonify(response_object), 200

if __name__ == "__main__":
    app.run(ssl_context='adhoc')