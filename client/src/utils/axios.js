import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:7500",
});


// api interceptors admin token

export const api2=axios.create({
    baseURL: "http://localhost:5000",
})


// api2 interceptors normal token