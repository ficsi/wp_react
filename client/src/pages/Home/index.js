import React from 'react';
import './index.scss';
import {Link} from "react-router-dom";

function Home() {

	return (
		<div className={'home'}>
			<div className="background-wrapper">
				<div className="--bg-linear"></div>
				<div className="background ">
				</div>
			</div>
			<Link to='/products' className="arrow">
				<div className="arrow-top"></div>
				<div className="arrow-bottom"></div>
			</Link>
		</div>
	)
}

export default Home
