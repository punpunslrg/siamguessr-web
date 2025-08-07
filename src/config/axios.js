import axios from 'axios';
import authStore from '../stores/authStore.js';
import useUserStore from '../stores/userStore.js';


const axiosInstance = axios.create({
    // baseURL: import.meta.env.VITE_API_BASE_URL,
    baseURL: "http://localhost:8890",
    withCredentials: true,
});


let csrfToken = null;


// export const fetchCsrfToken = async () => {
//     try {
//         const { data } = await axiosInstance.get('/csrf-token');
//         csrfToken = data.csrfToken;
//         console.log('CSRF Token has been fetched.');
//     } catch (error) {
//         console.error('Could not fetch CSRF token:', error);
//     }
// };



axiosInstance.interceptors.request.use(
    (config) => {
        let token = authStore.getState().token;

        console.log("first token",token)
        if(!token) {
         token = useUserStore.getState().token;           
        }
        console.log("second token",token)
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        const methodsToProtect = ['post', 'put', 'patch', 'delete'];
        if (csrfToken && methodsToProtect.includes(config.method.toLowerCase())) {
            config.headers['X-CSRF-Token'] = csrfToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;


        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                console.log('Access token expired. Attempting to refresh...');


                const { data } = await axiosInstance.post('/api/auth/refresh');
                const { accessToken } = data;


                authStore.getState().setAuth({ accessToken, user: authStore.getState().user });
                console.log('Token refreshed successfully.');


                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);

            } catch (refreshError) {

                console.error('Session expired. Could not refresh token. Logging out.', refreshError);
                authStore.getState().logout();
                return Promise.reject(refreshError);
            }
        }


        return Promise.reject(error);
    }
);

export default axiosInstance;