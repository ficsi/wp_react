import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"; 
import orderReducer from "./slices/orderReducer";

export const store = configureStore({
	reducer: {
		//add reducers:
		user: userReducer,
		order: orderReducer
	},
});