import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:5000',
})
//User
export const getUser = (user) => API.post('/user/signin', user)
export const register = (userData) => API.post('/user/signup', userData)
export const updateProfile = (userInfo) =>
    API.post('/user/updateprofile', userInfo)

export const getAllUser = () => API.get('/user/getAll')

//conversation
export const addConversation = (data) => API.post('/conversation', data)
export const getAllConversation = () => API.get('/conversation')
export const getUserById = (id) => API.post('/user/getById', id)
