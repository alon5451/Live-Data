from scraping.place import Place
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__, static_url_path='/public')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods=['GET'])
def home():
    
    return render_template('/index.html', title="Lame Site")

@app.route('/place', methods=['GET'])
def get_tasks():
    placeName = request.args['name']

    livePop = Place(placeName).live_pop()
#     alerts = list(get_alerts(fromDate, toDate).apply(lambda x: x.to_json(force_ascii=False), axis=1))
    
    return livePop

app.run(debug=True, port=9090, use_reloader=False)