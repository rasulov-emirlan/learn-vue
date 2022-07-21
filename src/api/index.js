import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;

const api = axios.create({
	baseURL: "https://api.weatherapi.com/v1/",
});

export const getWeather = (name) => {
	return api.get(`current.json?key=${apiKey}&q=${name}&aqi=no`);
};
