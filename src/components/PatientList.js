import React, { useState, useEffect } from "react";
import { getPatients, submitResults } from "../services/api";
import { calculateScore, hasDataIssue } from "../utils/scoring";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllPages = async () => {
      setLoading(true);
      let allPatients = [];
      let pagesToFetch = Array.from({ length: 10 }, (_, i) => i + 1);

      while (pagesToFetch.length > 0) {
        const nextRound = [];

        for (const page of pagesToFetch) {
          let attempts = 0;
          let success = false;

          while (attempts < 5 && !success) {
            try {
              const data = await getPatients(page, 5);
              allPatients = [...allPatients, ...data];
              success = true;
              await delay(5000);
            } catch (err) {
              attempts++;
              const wait = 1000 * attempts;
              console.warn(
                `Retrying page ${page} in ${wait}ms (attempt ${attempts})`
              );
              await delay(wait);
            }
          }

          if (!success) {
            nextRound.push(page); // Try again in the next loop
          }
        }

        if (nextRound.length === pagesToFetch.length) {
          console.error(`Failed to fetch all pages after max retries`);
          break;
        }

        pagesToFetch = nextRound;
      }

      setPatients(allPatients);
      setLoading(false);
    };

    fetchAllPages();
  }, []);

  const processAndSubmit = async () => {
    setSubmitting(true);
    setResults(null);
    setError("");

    try {
      const highRisk = [];
      const fever = [];
      const dataIssues = [];

      patients.forEach((p) => {
        if (hasDataIssue(p)) dataIssues.push(p.patient_id);
        const score = calculateScore(p);
        if (score >= 4) highRisk.push(p.patient_id);
        if (p.temperature >= 99.6) fever.push(p.patient_id);
      });

      const payload = {
        high_risk_patients: highRisk,
        fever_patients: fever,
        data_quality_issues: dataIssues,
      };

      const res = await submitResults(payload);
      setResults(payload);
      console.log("Submission response:", res);
    } catch (err) {
      setError(`Submission failed: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Ksense Healthcare Risk Assessment</h2>

      {loading ? (
        <p>Loading patients...</p>
      ) : (
        <button onClick={processAndSubmit} disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Assessment"}
        </button>
      )}

      {error && (
        <div style={{ color: "red", marginTop: 16 }}>
          <strong>{error}</strong>
        </div>
      )}

      {results && (
        <div style={{ marginTop: 20 }}>
          <h4>Submitted Results</h4>
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PatientList;
