import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    console.log('this is the response data from ',response.data)
    return response.data
}

const loginServices = { login }

export default loginServices