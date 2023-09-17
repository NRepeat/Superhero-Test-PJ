import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api/index";

const SLICE_NAME = "superhero";

export const getAllSuperheros = createAsyncThunk(
	`${SLICE_NAME}/allSuperheros`,
	async (thunkApi) => {
		try {
			const superheroData = await API.SuperheroAPI.getAllSuperheros();
			return superheroData
		} catch (error) {
			thunkApi.rejectWithValue(error);
		}
	}
);

export const createSuperhero = createAsyncThunk(
	`${SLICE_NAME}/createSuperhero`,
	async ({ formData, values }, thunkApi) => {
		try {
			const superheroResponse = await API.SuperheroAPI.createSuperhero(values)
			const { id } = superheroResponse.data.data
			await API.SuperheroAPI.addSuperheroImg({ id, formData })
		} catch (error) {
			thunkApi.rejectWithValue(error);
		}
	}
)
export const deleteSuperhero = createAsyncThunk(`${SLICE_NAME}/createSuperhero`,
	async ({ heroId, imgsId }, thunkApi) => {
		try {

			await API.SuperheroAPI.deleteSuperhero({ heroId, imgsId })
		} catch (error) {
			thunkApi.rejectWithValue(error);
		}
	})

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
