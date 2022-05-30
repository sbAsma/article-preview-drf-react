import axios from 'axios';

var baseURL

if (window.location.origin === "http://localhost:3000") {
  baseURL = "http://127.0.0.1:8000"; // development address
} else {
  baseURL = window.location.origin; // production address
}

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		Authorization: localStorage.getItem('access_token')
			? 'JWT ' + localStorage.getItem('access_token')
			: null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
});

// axiosInstance.interceptors.request.use(
// 	(request) => {
// 		if (request.method == "post"){
// 			console.log(request)
// 		}
// 		return request
// 	}
// )

const noInterceptAxios = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		Authorization: null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
});

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;
		console.log(error.response.data.code)
		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
					'Looks like CORS might be the problem. ' +
					'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
			originalRequest.url === baseURL + 'token/refresh/'
		) {
			// this will be executed only if I do a get request from http://127.0.0.1:8000/
			// and it is happening in "plop"
			window.location.href = '/login/';
			return Promise.reject(error);
		}
		
		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			const refreshToken = localStorage.getItem('refresh_token');

			if (refreshToken) {
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

				// exp date in token is expressed in seconds, while now() returns milliseconds:
				const now = Math.ceil(Date.now() / 1000);
				console.log("access token expired, refresh token is being updated")
				console.log(tokenParts.exp);

				if (tokenParts.exp > now) {
					// plop
					console.log("plop")
					return noInterceptAxios
						.post('token/refresh/', {
							refresh: refreshToken,
						})
						.then((response) => {
							localStorage.setItem('access_token', response.data.access);
							localStorage.setItem('refresh_token', response.data.refresh);

							axiosInstance.defaults.headers['Authorization'] =
								'JWT ' + response.data.access;
							originalRequest.headers['Authorization'] =
								'JWT ' + response.data.access;

							return axiosInstance(originalRequest);
						})
						.catch((err) => {
							console.log(err);
						});
				} else {
					console.log('Refresh token is expired', tokenParts.exp, now);
					localStorage.removeItem('access_token')
					localStorage.removeItem('refresh_token')
					localStorage.removeItem('current_user')
					axiosInstance.defaults.headers['Authorization'] = null
					
					window.location.href = '/user/'; 
					// There is no login page and this line created an infinit loop
				}
			} else {
				console.log('Refresh token not available.');
				localStorage.removeItem('access_token')
				localStorage.removeItem('refresh_token')
				localStorage.removeItem('current_user')
				axiosInstance.defaults.headers['Authorization'] = null
				window.location.href = '/user/';
				// took this one off because no login page
			}
		}
		
		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);

export default axiosInstance;
