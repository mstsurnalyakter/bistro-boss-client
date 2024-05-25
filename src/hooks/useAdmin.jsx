import {
  useQuery,
} from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
 const {
   data: isAdmin = [],
   refetch:adminRefetch,
   isLoading: isAdminLoading,
 } = useQuery({
   queryKey: ["isAdmin", user?.email],
   queryFn: async () => {
     const { data } = await axiosSecure.get(`/users/admin/${user?.email}`);
     return data?.admin;
   },
 });
 return { isAdmin, adminRefetch, isAdminLoading };
}

export default useAdmin