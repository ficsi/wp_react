import React from 'react'
import {Link} from "react-router-dom";

export default function NavInfo() {
	console.log('here')
	return (
		<Link to="/login">
			<button id="btn">Вход за фирми</button>
		</Link>
	)
}
