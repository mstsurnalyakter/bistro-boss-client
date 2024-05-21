
import axios from 'axios'
import PropTypes from 'prop-types'

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
    return axiosSecure
}

useAxiosSecure.propTypes = {}

export default useAxiosSecure