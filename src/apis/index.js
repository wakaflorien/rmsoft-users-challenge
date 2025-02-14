const BASE_URL = "http://197.243.43.226:5001";

export const getAllUsers = async (token) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
};

export const login = async (payload) => {
  const response = await fetch(`${BASE_URL}/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Failed to login");
  return response.json();
};

export const register = async (payload) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error("Failed to register");
  return response.json();
};

export const logout = async () => {
  localStorage.clear();
};
