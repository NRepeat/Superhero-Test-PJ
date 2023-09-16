import axios from "axios";

const httpClient = axios.create({
	baseURL: "http://localhost:5000",
});

const SuperheroAPI = {
	getAllSuperheros: async () => {
		try {
			const response = await httpClient.get("/superhero/all");
			return response.data.data;
		} catch (error) {
			console.error("Error fetching superhero data:", error);
			throw error;
		}
	},
	createSuperhero: async (payload) => {
		try {
			const data = await httpClient.post('/superhero/createSuperhero', payload)
			console.log("🚀 ~ file: index.js:20 ~ createSuperhero: ~ data:", data)
			return data
		} catch (error) {
			console.error("Error fetching superhero data:", error);
			throw error;
		}
	},
	addSuperheroImg: async (payload) => {
		console.log("🚀 ~ file: index.js:28 ~ addSuperheroImg: ~ payload:", payload
		)
		try {
			await httpClient.post(`/superheroImg/${payload.id}/img`, payload.formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
		} catch (error) {
			console.error("Error fetching superhero data:", error);
			throw error;
		}
	},
	addSuperheroByID: async (payload) => {


		try {
			await httpClient.get(`'/superhero/`)
		} catch (error) {

		}
	}
};



export { SuperheroAPI };
