import axios from "axios";

export const gameApi = axios.create({
	baseURL : 'http://localhost:8890/api/game',
}) 

export const getRandomLocation = () => gameApi.get("/random-location");