import axios from "axios";

const http = axios.create({
  timeout: 5000
})

http.interceptors.request.use(
  config => config,
  error => {
    console.log(error)
    return Promise.reject()
  }
)

http.interceptors.response.use(
  response => {
    if (response.status == 200) {
      return response.data
    }
  },
  error => {
    console.log(error)
    return Promise.reject()
  }
)

export default http