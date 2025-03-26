import os
import hashlib
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET', 'jwtsecretkey')
jwt = JWTManager(app)
mongo = MongoClient(os.getenv('MONGO_URI', 'mongo'))

user_database = mongo.user_db
users = user_database.users

@app.route('/helloworld')
def index():
	return jsonify({'hello': 'world'}), 200

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
	return jsonify(packet), 200

@app.route('/create_user', methods=['POST'])
def create_user():
	data = request.json
	email = data.get('email')
	password = str(data.get('password'))
	if users.find_one({'email': email}):
		return jsonify({'message': 'User already exists!'}), 400
	sha256 = hashlib.sha256()
	sha256.update(password.encode())
	hashed_password = sha256.hexdigest()
	users.insert_one({'email': email, 'password': hashed_password})
	return jsonify({'message': 'Success'}), 200

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5000)