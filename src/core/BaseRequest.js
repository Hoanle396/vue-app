const axios = require('axios');
const APIUrl = 'https://the1s.tk/api/';
export default {
    getHeaders() {
        let token = window.localStorage.getItem('token');
        if (token == null) {
            return {}
        }
        return { Authorization: 'Bearer ' + token }
    },
    get(url) {
        return axios.get(APIUrl + url, { headers: this.getHeaders() })
    },
    post(url, data) {
        return axios.post(APIUrl + url, data, { headers: this.getHeaders() })
    }
}
