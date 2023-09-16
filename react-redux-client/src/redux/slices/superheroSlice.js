import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api/index";

const SLICE_NAME = "superhero";

 export const getAllSuperheros = createAsyncThunk(
	`${SLICE_NAME}/allSuperheros`,
	async (superheroData, thunkApi) => {
		try {
		const superheroData =  await API.SuperheroAPI.getAllSuperheros();
		console.log("🚀 ~ file: superheroSlice.js:11 ~ superheroData:", superheroData)
		return superheroData
		} catch (error) {
			thunkApi.rejectWithValue(error);
		}
	}
);

const initialState = {
	allSuperheros: [],
	isLoading: false,
	error: null,
};

export const superheroSlice = createSlice({
	name: SLICE_NAME,
	initialState,
	reducers: {}, 
	extraReducers: (builder) => {
		builder.addCase(getAllSuperheros.pending, (state) => {
			state.isLoading = true;
		});

		builder.addCase(getAllSuperheros.fulfilled, (state, action) => {
			console.log("🚀 ~ file: superheroSlice.js:34 ~ builder.addCase ~ action:", action)
			state.isLoading = false;
			state.allSuperheros.push(action.payload);
		});

		builder.addCase(getAllSuperheros.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload;
		});
	},
});

const { reducer: superheroReducer } = superheroSlice;

export default superheroReducer;
