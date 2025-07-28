const API_KEY = "ak_7f393d33e36ed3ecb73cf08a5fd3b7580dc0d2876fac0a1c";
const BASE_URL = "https://assessment.ksensetech.com/api";

export const getPatients = async (page = 1, limit = 5) => {
  const url = `${BASE_URL}/patients?page=${page}&limit=${limit}`;
  try {
    const response = await fetch(url, {
      headers: { "x-api-key": API_KEY },
    });
    if (!response.ok) throw new Error("API error");
    const data = await response.json();
    return data.data || [];
  } catch (err) {
    throw err;
  }
};

export const submitResults = async (results) => {
  const url = `${BASE_URL}/submit-assessment`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify(results),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Submit failed (${response.status}): ${text}`);
  }

  return response.json();
};
