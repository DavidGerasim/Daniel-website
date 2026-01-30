// frontend/services/stats.api.js
const BASE_URL = "http://localhost:5000/api/stats";

export async function fetchUsersCount() {
  const res = await fetch(`${BASE_URL}/users-count`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch users count");
  }

  return data.count;
}
