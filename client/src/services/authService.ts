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
