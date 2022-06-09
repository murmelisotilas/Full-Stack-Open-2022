import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async newObject => {
    console.log('newObject', newObject)
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    console.log('response', response)
    return response.data
}

const update = async (id, newBlog) => {
    const request = axios.put(`${baseUrl}/${id}`, newBlog)
    return request.then(response => response.data)
}

const remove = async (id) => {
    const config = {
        headers: { Authorization: token },
    }

    const request = axios.delete(`${baseUrl}/${id}`,config)
    return request.then(response => response.data)
}



const blogService = { getAll, create, update, setToken, remove }

export default blogService