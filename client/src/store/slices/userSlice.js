import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
	user: null,
	status: "idle",
	error: null,
};
export const fetchUser = createAsyncThunk("user/fetchUser", async (token) => {
	const response = await fetch("https://private.local/wp-json/wp/v2/users/me", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`,
		},
		credentials: "include", // Required to send cookies for authentication
	});
	if (!response.ok) throw new Error("Failed to fetch user");
	return await response.json(); // Return user data
});
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// setUser: (state, action) => {
		// 	console.log(state, action)
		// 	state.user = action.payload;
		// },
		// setUserLogStatus: (state, action) => {
		// 	state.isLogged = action.payload;
		// },
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUser.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.user = action.payload;
				state.isLogged = true;
				state.status = 'succeeded';
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;

			})
	},
});

export const {setUserLogStatus, setUser} = userSlice.actions;
export default userSlice.reducer;