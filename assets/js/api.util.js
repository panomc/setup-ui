const NETWORK_ERROR = "NETWORK_ERROR"

const config = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
}

const ApiUtil = {

  init() {
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  },

  get(resource) {
    return axios.get(resource, config)
  },

  post(resource, data) {
    return axios.post(resource, data, config)
  },

  put(resource, data) {
    return axios.put(resource, data, config)
  },

  delete(resource) {
    return axios.delete(resource, config)
  },

  /**
   * Perform a custom Axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   *  - auth (optional)
   *    - username
   *    - password
   **/
  customRequest(data) {
    return axios(data)
  }
}
