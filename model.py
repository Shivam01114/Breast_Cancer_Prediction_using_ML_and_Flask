# model.py
import numpy as np
import pandas as pd
import sklearn.datasets
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import pickle

# Load dataset
breast_cancer_dataset = sklearn.datasets.load_breast_cancer()

# Create DataFrame
df = pd.DataFrame(breast_cancer_dataset.data, columns=breast_cancer_dataset.feature_names)
df['label'] = breast_cancer_dataset.target

X = df.drop(columns='label')
Y = df['label']

# Train Test Split
X_train, X_test, Y_train, Y_test = train_test_split(
    X, Y, test_size=0.2, random_state=2
)

# Train Model
model = LogisticRegression(max_iter=5000)
model.fit(X_train, Y_train)

# Save Model
with open("breast_cancer_model.pkl", "wb") as file:
    pickle.dump(model, file)

print("✅ Model saved as breast_cancer_model.pkl")
