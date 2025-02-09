from flask import Flask, request, jsonify
from ai_utils import classify_website, generate_advice

app = Flask(__name__)

@app.route("/insight", methods=["POST"])
def insight():
    data = request.json
    insights = generate_advice(data)
    return jsonify({"insights": insights})

@app.route("/classify", methods=["POST"])
def classify():
    data = request.json
    disturb = classify_website(data)
    return jsonify({"disturb": disturb})
    
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
