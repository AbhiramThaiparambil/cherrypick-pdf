import api from "@/lib/api";

export const loginUser = async (email: string, password: string) => {
  return await api.post("/auth/login", {
    email,
    password,
  });
};

export const signupUser = async (email: string, password: string) => {
  return await api.post("/auth/signup", {
    email,
    password,
  });
};

export const refreshSession = async () => {
  const res = await api.post("/auth/refresh");
  return res.data;
};

export const getUser = async () => {
  const res = await api.get("/auth/user");
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};
