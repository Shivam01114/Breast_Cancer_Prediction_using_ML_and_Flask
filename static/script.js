function predict() {
  let inputs = document.querySelectorAll("input");
  let features = [];

  for (let input of inputs) {
    if (input.value === "") {
      alert("Please fill all 30 fields");
      return;
    }
    features.push(parseFloat(input.value));
  }

  fetch("/predict-result", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ features })
  })
  .then(res => res.json())
  .then(data => {
    showPopup(data.prediction);
  })
  .catch(() => {
    alert("Prediction failed. Check server.");
  });
}

/* POPUP FUNCTIONS */
function showPopup(result) {
  const popup = document.getElementById("popup");
  const title = document.getElementById("popup-title");
  const text = document.getElementById("popup-text");

  popup.style.display = "flex";

  if (result.includes("Benign")) {
    title.innerText = "🟢 Benign Tumor";
    title.style.color = "#00ff88";
    text.innerText = "The tumor is NON-CANCEROUS.";
  } else {
    title.innerText = "🔴 Malignant Tumor";
    title.style.color = "#ff4444";
    text.innerText = "The tumor is CANCEROUS.";
  }
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

/* DEMO DATA */
function fillBenign() {
  fillInputs([
    13.54,14.36,87.46,566.3,0.09779,0.08129,0.06664,0.04781,
    0.1885,0.05766,0.2699,0.7886,2.058,23.56,0.008462,
    0.0146,0.02387,0.01315,0.0198,0.0023,15.11,19.26,
    99.7,711.2,0.144,0.1773,0.239,0.1288,0.2977,0.07259
  ]);
}

function fillMalignant() {
  fillInputs([
    20.57,17.77,132.9,1326,0.08474,0.07864,0.0869,0.07017,
    0.1812,0.05667,0.5435,0.7339,3.398,74.08,0.005225,
    0.01308,0.0186,0.0134,0.01389,0.003532,24.99,23.41,
    158.8,1956,0.1238,0.1866,0.2416,0.186,0.275,0.08902
  ]);
}

function fillInputs(values) {
  let inputs = document.querySelectorAll("input");
  inputs.forEach((input, i) => input.value = values[i]);
}

function clearInputs() {
  document.querySelectorAll("input").forEach(i => i.value = "");
}
function goToReport() {
  sessionStorage.setItem("features", JSON.stringify(
    Array.from(document.querySelectorAll("input")).map(i => i.value)
  ));
  window.location.href = "/report";
}
