import React, {useEffect, useState} from 'react'
import './item.scss';
import {createPortal} from "react-dom";
import {useDispatch, useSelector} from "react-redux";
import {createOrder} from "../../store/slices/orderReducer";

export default function ProductsList(data) {
	const {loading, products} = data;
	const [modalData, setModalData] = useState(null);

	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user);
	const orderStatus = useSelector((state) => state.order.status);

	useEffect(() => {
		console.log(loading);
	}, [data]);

	const ModalRender = (data) => {
		return (
			createPortal(
				<div>
					<span className={'close'} onClick={closeModal}>X</span>
					{data.data.item.name}
				</div>,
				document.querySelector('.listing-container'))
		)
	}

	const handlePurchase = (productId) => {
		if (!user) {
			alert("Please log in first!");
			return;
		}
		console.log(user)
		dispatch(createOrder(user.id, productId));
	};

	const Item = (data) => {
		console.log(data)
		return (
			<div className="card shadow">
				<div className="card-body">
					<h5 className="card-title">{data.item.name}</h5>
				</div>
				<div className="span text-center" onClick={() => setModalData(data)}>Бърз преглед
				</div>
				<span onClick={() => handlePurchase(data.item.id)} disabled={orderStatus === "loading"}>
					{orderStatus === "loading" ? "Processing..." : "Buy Now"}
				</span>
			</div>
		)
	}
	const closeModal = () => {
		setModalData(null);
		console.log(modalData)
	}
	return (
		<div className={'listing-container'}>
			{loading ? <div>Loading...</div> :
				products.map((item, index) =>
					<div className={'flex container'} key={item.id} data-order={index}>
						<Item item={item}/>
					</div>,
				)}
			{modalData && <ModalRender data={modalData}/>}
		</div>
	)
}
