import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, setUserLogStatus} from "../../store/slices/userSlice";

export default function NavInfo() {
	const [userName, setUserName] = useState(null);
	const userData = useSelector((state) => state.user.user);
	useEffect(() => {
		if(userData !== null) {
			setUserName(userData.name);
		}
	}, [userData]);

	return (
		!userName ?
		<Link to="/login">
			<button id="btn">Вход за фирми</button>
		</Link>
		: <span id="btn">{userName}</span>
	)
}
