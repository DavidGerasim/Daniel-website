// frontend/services/stats.api.js
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchUsersCount() {
  try {
    const res = await fetch(`${API_URL}/api/stats/users-count`);

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch users count");
    }

    return data.count;
  } catch (err) {
    console.error("fetchUsersCount error:", err);
    throw err;
  }
}

// const API_URL = "https://daniel-backend-3dgc.onrender.com/api/stats";

// export async function fetchUsersCount() {
//   const res = await fetch(`${API_URL}/users-count`);
//   const data = await res.json();
//   return data.count;
// }
