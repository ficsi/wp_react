import './styles/normalize.scss';
import React, {useEffect, useState, Suspense} from "react";
import Home from "./pages/Home";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Login from "./pages/Login";
import ProductsList from "./pages/ProductsList";
import Navbar from "./component/navigation";

function App() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true); // Track loading state

	useEffect(() => {
		fetch("https://private.local/wp-json/wc/v3/products", {
			method: "GET",
			headers: {
				Authorization: "Basic " + btoa("ck_9504c8271e58bf3d0cbca700dbf57cda2b88f2e3:cs_8be53dbeb47b8b6bf14f80515dccbf9173e6fde3"),
			},
		})
			.then(response => response.json())
			.then(data => {
				setProducts(data);
				setLoading(false);
			})
			.catch(error => console.error("Error fetching products:", error));
	}, []);
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="/login" element={<Login/>}/>
				<Route path="/products" element={<ProductsList loading={loading} products={products}/>}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
