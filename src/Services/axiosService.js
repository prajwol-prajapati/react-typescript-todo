import axios from 'axios';

let badToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbmNyeXB0ZWREYXRhIjp7ImVtYWlsIjoicHJhandvbEBnbWFpbC5jb20iLCJwYXNzd29yZCI6InBhc3N3b3JkIiwiaWQiOjIsImxhc3ROYW1lIjoicHJhandvbCIsImZpcnN0TmFtZSI6InByYWp3b2wifSwiaWF0IjoxNTE2OTUwMTQwLCJleHAiOjE1MTcwNTAxNDB9.n-EPxFo9858bvd1-eUnAheOo0z9Zgme0usYu2s1JLLQ';
let refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbmNyeXB0ZWREYXRhIjp7ImVtYWlsIjoicHJhandvbEBnbWFpbC5jb20iLCJwYXNzd29yZCI6InBhc3N3b3JkIiwiaWQiOjIsImxhc3ROYW1lIjoicHJhandvbCIsImZpcnN0TmFtZSI6InByYWp3b2wifSwiaWF0IjoxNTE2NTkzNzk2LCJleHAiOjE1MTczOTM3OTZ9.Gf5uQka9sj3TAHmGuAtFrEKAY0I7y0ZFNOtbiUGF7Gc';

let axiosService = axios.create({
    baseURL: 'http://localhost:8848/api/',
    timeout: 1000,
    header: { 'Authorization': badToken }
});

function getRefreshToken() {
    console.log('getting refresh token');
    return axiosService({
        url: '/refresh',
        method: 'get',
        headers: { 'Authorization': refreshToken }
    });
}

axiosService.interceptors.response.use(undefined, err => {
    let res = err.response;
    console.log(err.response);

    if(res.status === 401){
        let tempConfig = res.config;

        return getRefreshToken()
        .then(data => {
            console.log('getting access token');
            axiosService.defaults.headers['Authorization'] = data.data.accessToken;
            tempConfig.headers.Authorization = data.data.accessToken;

            return axiosService.request(tempConfig)
            .then(response => response)
            .catch(err => err);
        });

    }

    return Promise.reject(err);
} );

export default axiosService;