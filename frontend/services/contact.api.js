// frontend/services/contact.api.js
const BASE_URL = "http://localhost:5000/api/contact";

export async function sendContactMessage(formData) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to send contact message");
  }

  return data;
}
