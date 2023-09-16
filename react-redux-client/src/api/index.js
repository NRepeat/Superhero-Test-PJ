import axios from "axios";

const httpClient = axios.create({
	baseURL: "http://localhost:5000",
});

const SuperheroAPI = {
	getSuperheroAll: async () => {
		try {
			const response = await httpClient.get("/superhero/all");
			return response.data.data;
		} catch (error) {
			console.error("Error fetching superhero data:", error);
			throw error;
		}
	},
};



export { SuperheroAPI };
