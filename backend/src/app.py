import os
import json
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from pymongo.errors import ConnectionFailure
from flask import Flask, request, make_response
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)
mongo = MongoClient(os.getenv('MONGO_URI', 'mongo'))

@app.route('/helloworld')
def index():
	resp = make_response(json.dumps({ 'hello': 'world' }), 200)
	resp.headers['Content-Type'] = 'application/json'
	return resp

@app.route('/ping')
def ping():
	try:
		mongo.admin.command('ping')
		mongo_info = {
			'host': mongo.address,
			'dbs': mongo.list_database_names()
		}
	except ConnectionFailure:
		mongo_info = 'not found'
	packet = {
		'mongo': mongo_info
	}
	resp = make_response(json.dumps(packet), 200)
	resp.headers['Content-Type'] = 'application/json'
	return resp

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5000)