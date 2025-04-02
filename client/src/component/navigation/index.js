import './index.scss';
import React, {useState} from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom";
import NavInfo from "../render_nav_login_box/NavInfo";

export default function Navbar() {
	const [state, setState] = useState(false)
	const navigate = useNavigate();
	const current = useLocation();


	return (
		<div className={'nav-wrapper '}>
			<div className="radio-inputs">
				<label className="radio">
					<input type="radio" name="radio"/>
					<Link to="/products" className="name">Продаръци</Link>
				</label>
				<label className="radio">
					<input type="radio" name="radio"/>
					<Link to="/order" className="name">За Нас</Link>
				</label>

			</div>
			<NavInfo />
		</div>
	)
}
