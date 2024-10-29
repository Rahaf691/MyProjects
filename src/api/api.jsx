import axios from "axios";
import { axiosInstance } from "./axiosInstance";
const BASE_URL = import.meta.env.VITE_API_URL;
const BASE_URL_Login = import.meta.env.VITE_API_URL_Login;

export const getProducts = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}products`)
      .then((response) => {
        resolve(response.data)
      })
      .catch(err => reject(err))
  });
};

export const getProduct = (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`products/${id}`)
      .then((response) => {
        resolve(response.data)
        console.log(response.data)
      })
      .catch(err => reject(err));
  });
};

export const postProduct = async (data) => {
  try {
    return await axiosInstance.post(
      '/products',
      { data },
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
  } catch (error) {
    console.log("Error in POST product", error);
  }
};

export const putProduct = async (id, data) => {
  try {
    return await axiosInstance.put(
      `products/${id}`,
      {
        data,
      },
      {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
  } catch (error) {
    console.log("Error in POST product", error);
  }
};

export const deleteProduct = async (id) => {
  try {

    return await axiosInstance.delete(`products/${id}`);
  } catch (error) {
    console.log("Error in delete product", error);
  }
};


export const LoginToken = async (user) => {
  try {
    return await axios.post(
      BASE_URL_Login,
      {
        user
      },

    ).then((response) => {
      localStorage.setItem('token', response.data.token)
    })

  } catch (error) {
    console.log("Error in POST product", error);
  }
};
