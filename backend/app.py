from flask import Flask
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route('/api/')
def index():
    return json.dumps({'hello': 'world'})

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5000)