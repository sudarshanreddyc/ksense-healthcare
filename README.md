# 🩺 Ksense Healthcare Risk Assessment

This project is a frontend application built using **React.js** to complete the Ksense Take Home Assignment. It consumes a simulated healthcare API, processes patient data, calculates health risk scores, and submits categorized results.

---

## 📌 Objective

- Integrate with the **Ksense Healthcare API**
- Analyze patient data across:
  - Blood Pressure
  - Temperature
  - Age
- Compute a **total risk score**
- Submit categorized alerts to the API

---

## 🛠️ Tech Stack

- React (via `create-react-app`)
- Fetch API (`window.fetch`)
- JavaScript (ES6+)
- Functional Components & Hooks

---

## 📊 Risk Scoring Criteria

### ✅ Blood Pressure
| Category | Criteria | Score |
|----------|----------|-------|
| Normal | Systolic <120 & Diastolic <80 | 0 |
| Elevated | Systolic 120–129 & Diastolic <80 | 1 |
| Stage 1 | Systolic 130–139 or Diastolic 80–89 | 2 |
| Stage 2 | Systolic ≥140 or Diastolic ≥90 | 3 |
| Invalid/Missing | -- | 0 |

### 🌡️ Temperature
| Temp (°F) | Score |
|-----------|-------|
| ≤ 99.5 | 0 |
| 99.6–100.9 | 1 |
| ≥ 101.0 | 2 |
| Invalid/Missing | 0 |

### 👵 Age
| Age | Score |
|-----|-------|
| < 40 | 0 |
| 40–65 | 1 |
| > 65 | 2 |
| Invalid/Missing | 0 |

---

## ✅ Outputs

The app returns three patient categories:

1. **High Risk Patients** – Total score ≥ 4
2. **Fever Patients** – Temperature ≥ 99.6°F
3. **Data Quality Issues** – Any invalid/missing values in BP, temp, or age

---

## 📦 How to Run

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/ksense-healthcare.git
   cd ksense-healthcare
