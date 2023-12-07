import { axiosInstance } from "./axiosInstance";

// register a user
export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/register", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// login a user
export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/login", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get user details

export const GetLoggedInUserDetails = async () => {
  try {
    const response = await axiosInstance.get("/api/users/get-logged-in-user");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get all users
export const GetAllUsers = async (role) => {
  try {
    const response = await axiosInstance.get(
      `/api/users/get-all-users/${role}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//search user
export const SearchUser = async (role, term) => {
  try {
    const response = await axiosInstance.get(
      `/api/users/search/${role}?term=${term}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//delete user
export const DeleteUser = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/users/delete-user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// get user by id

export const GetUserById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/users/get-user-by-id/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//update user
export const UpdateBook = async (payload) => {
  try {
    const response = await axiosInstance.put(
      `/api/books/update-user/${payload._id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
