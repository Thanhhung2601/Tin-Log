import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:5000',
})

export const getUser = (user) => API.post('/user/signin', user)
export const register = (userData) => API.post('/user/signup', userData)
export const updateProfile = (userInfo) =>
    API.post('/user/updateprofile', userInfo)

export const getAllUser = () => API.get('/user/getAll')
