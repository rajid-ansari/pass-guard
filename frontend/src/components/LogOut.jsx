import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const BASE_URI = import.meta.env.VITE_BASE_URI;

const LogOut = async () => {
	const navigate = useNavigate();

	// try {
	// 	const res = await axios.get(`${BASE_URI}/user/logout`, {withCredentials: true});

	// 	if(res.status === 200) {
	// 		localStorage.removeItem("user");
	// 		navigate("/login");
	// 	}
	// } catch (error) {
		// console.log(`logout errr :: ${error}`);
	// }

  return (
	<button>Log out</button>
  )
}

export default LogOut