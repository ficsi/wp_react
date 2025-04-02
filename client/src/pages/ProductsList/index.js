import React, {useEffect, useState} from 'react'
import './item.scss';
import {createPortal} from "react-dom";

export default function ProductsList(data) {
	const {loading, products} = data;
	const [modalData, setModalData] = useState(null);

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
	const Item = (data) => {
		return (
			<div className="card shadow">
				<div className="card-body">
					<h5 className="card-title">{data.item.name}</h5>
				</div>
				<div className="span text-center" onClick={() => setModalData(data)}>Бърз преглед
				</div>
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
			{modalData && <ModalRender data={modalData} />}
		</div>
	)
}
