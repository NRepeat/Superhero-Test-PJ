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
			alert("Hero created successfully");
			return data;
		} catch (error) {
			alert("Error creating superhero:", error);
			throw error;
		}
	},
	addSuperheroImg: async (id, formData) => {
		try {
			await httpClient.post(`/superheroImg/${id}/img`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			alert("Superhero image uploaded successfully");
		} catch (error) {
			alert("Error uploading superhero image:", error);
			throw error;
		}
	},

	deleteSuperhero: async ({ heroId, imgsId }) => {
		try {
			await httpClient.delete(`/superheroImg/${heroId}/img`, {
				data: { superheroIds: imgsId },
			});
			await httpClient.delete(`/superhero/${heroId}`);
			alert("Superhero deleted successfully");
		} catch (error) {
			alert("Error deleting superhero:", error);
			throw error;
		}
	},
	updateSuperhero: async (payload) => {
		const { superpower } = payload;
		try {
			await httpClient.put(`/superhero/${payload.id}`, payload);
			await httpClient.put(`/superpower/${payload.superpowerid}`, { superpower });
			alert("Superhero updated successfully");
		} catch (error) {
			alert("Error updating superhero:", error);
			throw error;
		}
	},
	deleteSuperheroImg: async ({ superheroId, imageId }) => {
		try {
			await httpClient.delete(`/superheroImg/${superheroId}/img`, {
				data: { superheroIds: [imageId] },
			});
			alert("Superhero image deleted successfully");
		} catch (error) {
			alert("Error deleting superhero image:", error);
		}
	},
};

export { SuperheroAPI };
