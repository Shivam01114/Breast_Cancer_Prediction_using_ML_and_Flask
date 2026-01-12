/* ================================
   REPORT.JS – CancerAI
   ================================ */

/* ---------- ON LOAD ---------- */
document.addEventListener("DOMContentLoaded", () => {
  // Auto-fill features if present
  const features = sessionStorage.getItem("features");
  if (features) {
    const featureInput = document.getElementById("features");
    if (featureInput) {
      featureInput.value = features;
    }
  }
});

/* ---------- FORM VALIDATION ---------- */
function validateReportForm() {
  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();
  const gender = document.getElementById("gender").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !age || !gender || !phone || !email) {
    alert("Please fill all patient details");
    return false;
  }

  return true;
}

/* ---------- DISPLAY FEATURES ---------- */
function displayFeatureTable(featureArray) {
  const container = document.getElementById("feature-table");
  if (!container) return;

  const featureNames = [
    "Tumor Size (Avg Radius)",
    "Surface Roughness (Avg Texture)",
    "Tumor Boundary Length",
    "Tumor Area",
    "Surface Smoothness",
    "Tumor Density",
    "Tissue Spread",
    "Sharp Edge Points",
    "Tumor Symmetry",
    "Shape Complexity",

    "Size Variation",
    "Texture Variation",
    "Boundary Variation",
    "Area Variation",
    "Smoothness Variation",
    "Density Variation",
    "Spread Variation",
    "Edge Variation",
    "Symmetry Variation",
    "Complexity Variation",

    "Max Tumor Size",
    "Worst Texture",
    "Max Boundary Length",
    "Max Tumor Area",
    "Worst Smoothness",
    "Worst Density",
    "Worst Spread",
    "Max Sharp Edges",
    "Worst Symmetry",
    "Worst Complexity"
  ];

  let html = "<table style='width:100%; border-collapse:collapse;'>";

  featureArray.forEach((value, i) => {
    html += `
      <tr>
        <td style="padding:8px; border-bottom:1px solid #333;">
          ${featureNames[i]}
        </td>
        <td style="padding:8px; border-bottom:1px solid #333; color:#ffd000;">
          ${value}
        </td>
      </tr>
    `;
  });

  html += "</table>";
  container.innerHTML = html;
}

/* ---------- LOAD REPORT VIEW ---------- */
function loadReportView() {
  const features = sessionStorage.getItem("features");
  if (!features) return;

  const parsedFeatures = JSON.parse(features);
  displayFeatureTable(parsedFeatures);
}
