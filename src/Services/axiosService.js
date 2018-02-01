import axios from 'axios';

let badToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbmNyeXB0ZWREYXRhIjp7ImVtYWlsIjoicHJhandvbEBnbWFpbC5jb20iLCJwYXNzd29yZCI6InBhc3N3b3JkIiwiaWQiOjEsIm5hbWUiOiJQcmFqd29sIFByYWphcGF0aSIsImNyZWF0ZWRBdCI6IjIwMTgtMDEtMjFUMDQ6MTk6MjQuMDA5WiIsInVwZGF0ZWRBdCI6IjIwMTgtMDEtMjFUMDQ6MTk6MjQuMDA5WiJ9LCJpYXQiOjE1MTczOTYwOTEsImV4cCI6MTUxNzQ5NjA5MX0._wG-ZC1xOYAL8dDNZV6zKY8ilHQ9Td180X5bIP9yZWw';
let refreshToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbmNyeXB0ZWREYXRhIjp7ImVtYWlsIjoicHJhandvbEBnbWFpbC5jb20iLCJwYXNzd29yZCI6InBhc3N3b3JkIiwiaWQiOjEsIm5hbWUiOiJQcmFqd29sIFByYWphcGF0aSIsImNyZWF0ZWRBdCI6IjIwMTgtMDEtMjFUMDQ6MTk6MjQuMDA5WiIsInVwZGF0ZWRBdCI6IjIwMTgtMDEtMjFUMDQ6MTk6MjQuMDA5WiJ9LCJpYXQiOjE1MTczOTYwOTEsImV4cCI6MTUxODE5NjA5MX0.JCNIG7GJB1zRiYgPU90DG8q-7kBPQ344O7kZdghstZU';

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