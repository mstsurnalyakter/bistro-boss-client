
// import useAxiosCommon from '../hooks/useAxiosCommon';
import { axiosCommon } from '../hooks/useAxiosCommon';

const imageUpload  = async image => {

 const formData = new FormData();
 formData.append('image',image);
 const { data } = axiosCommon.post(
   `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
   formData
 );
 return data?.data?.display_url;
}

export default imageUpload 