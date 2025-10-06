# app.py (Flask-based backend for NovexaKart)
from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
import hashlib, jwt, datetime

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'your_secret_key'

client = MongoClient("mongodb+srv://<username>:<password>@cluster.mongodb.net/")
db = client['novexakart']

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    hashed_pw = hashlib.sha256(data['password'].encode()).hexdigest()
    db.users.insert_one({'email': data['email'], 'password': hashed_pw})
    return jsonify({"message": "User registered successfully!"})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = db.users.find_one({'email': data['email']})
    if not user:
        return jsonify({"error": "User not found"}), 404
    hashed_pw = hashlib.sha256(data['password'].encode()).hexdigest()
    if user['password'] != hashed_pw:
        return jsonify({"error": "Invalid credentials"}), 401
    token = jwt.encode({'email': data['email'], 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=3)}, app.config['SECRET_KEY'])
    return jsonify({"token": token})

@app.route('/api/products', methods=['GET'])
def get_products():
    products = list(db.products.find({}, {"_id": 0}))
    return jsonify(products)

if __name__ == "__main__":
    app.run(debug=True)
