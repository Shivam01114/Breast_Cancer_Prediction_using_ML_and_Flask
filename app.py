from flask import Flask, render_template, request, jsonify
import numpy as np
import pickle

app = Flask(__name__)

# Load trained model
with open("breast_cancer_model.pkl", "rb") as file:
    model = pickle.load(file)

# ---------------- HOME PAGE ----------------
@app.route("/")
def home():
    return render_template("index.html")

# ---------------- PREDICT PAGE ----------------
@app.route("/predict", methods=["GET"])
def predict_page():
    return render_template("predict.html")

# ---------------- PREDICTION API ----------------
@app.route("/predict-result", methods=["POST"])
def predict_result():
    try:
        data = request.get_json()

        if not data or "features" not in data:
            return jsonify({"error": "No input data received"}), 400

        features = data["features"]

        if len(features) != 30:
            return jsonify({"error": "Exactly 30 input values are required"}), 400

        input_data = np.array(features, dtype=float).reshape(1, -1)
        prediction = model.predict(input_data)[0]

        result = "Benign 🟢" if prediction == 1 else "Malignant 🔴"

        return jsonify({"prediction": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---------------- ABOUT PAGE ----------------
@app.route("/about")
def about():
    return render_template("about.html")

# ---------------- TEAM PAGE ----------------
@app.route("/team")
def team():
    return render_template("team.html")

# ---------------- REPORT FORM PAGE ----------------
@app.route("/report", methods=["GET"])
def report_form():
    return render_template("report_form.html")

# ---------------- REPORT VIEW PAGE ----------------
@app.route("/report-view", methods=["POST"])
def report_view():
    data = request.form.to_dict()
    return render_template("report_view.html", data=data)

# ---------------- RUN SERVER (MUST BE LAST) ----------------
if __name__ == "__main__":
    app.run(debug=True)
