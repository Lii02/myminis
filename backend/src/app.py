from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api')
def index():
    return 'Hello world'

@app.route('/api/test')
def test():
	return 'Test2'

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5000)