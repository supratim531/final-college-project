import axios from "axios";

const baseURL = "https://rythmxchange.onrender.com";

export default axios.create({
  baseURL: baseURL,
});
