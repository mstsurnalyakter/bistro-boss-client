import {
  useQuery,
} from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();
 const {
   data: isAdmin = [],
   refetch: adminRefetch,
   isLoading: isAdminLoading,
 } = useQuery({
   queryKey: ["isAdmin", user?.email],
   enabled: !loading && !!user?.email && !!localStorage.getItem("access-token"),
   queryFn: async () => {
     const { data } = await axiosSecure.get(`/users/admin/${user?.email}`);
     return data?.admin;
   },
 });
 return { isAdmin, adminRefetch, isAdminLoading };
}

export default useAdmin