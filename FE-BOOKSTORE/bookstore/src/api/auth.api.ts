import { AuthProps } from "../pages/Signup";
import { httpClient } from "./http";

export const signup = async (userData: AuthProps) => {
  const response = await httpClient.post("/users/signup", userData);
  return response.data;
};

export const resetRequest = async (data: AuthProps) => {
  const response = await httpClient.post("/users/reset", data);
  return response.data;
};

export const changePassword = async (userData: AuthProps) => {
  const response = await httpClient.put("/users/reset", userData);
  return response.data;
};

interface LoginResponse {
  token: string;
}

export const login = async (userData: AuthProps) => {
  const response = await httpClient.post<LoginResponse>(
    "/users/login",
    userData
  );
  return response.data;
};
