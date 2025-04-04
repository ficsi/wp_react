import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState = {
	order: null,
	status: "idle",
	error: null,
}


export const createOrder = createAsyncThunk(
	'order/createOrder',
	async (userId, productId) => {
		const response = await fetch("https://private.local/wp-json/wc/v3/orders", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Basic " + btoa("ck_9504c8271e58bf3d0cbca700dbf57cda2b88f2e3:cs_8be53dbeb47b8b6bf14f80515dccbf9173e6fde3"),
			},
			body: JSON.stringify({
				customer_id: userId,
				line_items: [{product_id: productId, quantity: 1}],
			}),
		});
		if (response.ok) {
			throw new Error("Failed to create order")
		}
		return await response.json();
	})

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createOrder.pending, (state) => {
				state.status = "loading";
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				state.order = action.payload;
				state.status = "succeeded";
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
	},
});

export default orderSlice.reducer;
