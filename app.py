from scraping.place import Place
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

google_api_key = 'AIzaSyDkG702RFFEEm08CP87sLK_amm-ru_eUVs'

@app.route('/', methods=['GET'])
def home():
    return render_template('/index.html', google_api_key = google_api_key)

@app.route('/dashboard', methods=['GET'])
def dashboard():
    
    return render_template('/dashboard.html', google_api_key=google_api_key)

@app.route('/place', methods=['GET'])
def get_tasks():
    placeName = request.args['name']
    place = Place(placeName)
    place.set_props()
    place.google_api()
    # place.set_general_hours()
#     alerts = list(get_alerts(fromDate, toDate).apply(lambda x: x.to_json(force_ascii=False), axis=1))
    
    return place.get_props()

app.run(debug=True, port=9090, use_reloader=True)