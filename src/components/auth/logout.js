// not currently used, only active on http://localhost:3000/logout

import React, { useEffect } from 'react'
import axiosInstance from '../../axios'
import { useHistory } from 'react-router-dom'

export default function Logout(){
	const history = useHistory()

	useEffect(() => {
		const response = axiosInstance.post('user/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token')
		})
		localStorage.removeItem('access_token')
		localStorage.removeItem('refresh_token')
		localStorage.removeItem('current_user')
		axiosInstance.defaults.headers['Authorization'] = null
		history.push('/admin')
		// window.location.reload();
	})

	return(
		<div margin="300px">Loggin out</div>
	)
}