from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api')
def index():
    return 'Hello world'

if __name__ == '__main__':
	app.run(port=5000)