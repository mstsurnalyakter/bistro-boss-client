import {
  useQuery,
} from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { data } from "autoprefixer";

const useAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
 const {data:isAdmin=[]} = useQuery({
    queryKey:['isAdmin',user?.email],
    queryFn: async () =>{
        const { data } = await axiosSecure.get(`/users/admin/${user?.email}`);
        console.log(data?.admin);
        return data?.admin;
    }
 })
 return {isAdmin}
}

export default useAdmin