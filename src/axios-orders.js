import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilderreact-9ae33.firebaseio.com/'
})


export default instance;