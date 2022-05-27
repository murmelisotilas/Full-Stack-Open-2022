import axios from "axios";
const baseUrl = 'http://localhost:3010/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newFile => {
    const request = axios.post(baseUrl, newFile)
    return request.then(response => response.data)
} 

const deletion = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response)
}

const update = (id, newFile) => {
    const request = axios.put(`${baseUrl}/${id}`, newFile)
    return request.then((response) => response.data)
}

export default { getAll, create,update ,deletion }