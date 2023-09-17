import axios from "axios";

const httpClient = axios.create({
	baseURL: "http://localhost:5001",
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
			return data
		} catch (error) {
			console.error("Error fetching superhero data:", error);
			throw error;
		}
	},
	addSuperheroImg: async ( id, formData) => {
		try {
			await httpClient.post(`/superheroImg/${id}/img`, formData,
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
	getSuperheroByID: async (payload) => {
		try {
			await httpClient.get(`'/superhero/`)
		} catch (error) {
		}
	},
	deleteSuperhero: async ({ heroId, imgsId }) => {
		try {
			await httpClient.delete(`/superheroImg/${heroId}/img`, {
				data: { superheroIds: imgsId },
			})
			await httpClient.delete(`/superhero/${heroId}`);
		} catch (error) {
			console.error("Error fetching superhero data:", error);
			throw error;
		}
	},
	updateSuperhero: async (payload) => {

		try {
			await httpClient.put(`/superhero/${payload.id}`, payload)
		} catch (error) {
			console.error("Error fetching superhero data:", error);
			throw error;
		}
	},
	deleteSuperheroImg: async ({ superheroId, imageId }) => {


		try {
			await httpClient.delete(`/superheroImg/${superheroId}/img`, {
				data: { superheroIds: [imageId] },
			})
		} catch (error) {

		}
	}
};



export { SuperheroAPI };
