import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
// import { axiosCommon } from "../../../hooks/useAxiosCommon";

const AllUsers = () => {
     const axiosSecure = useAxiosSecure();
     const axiosCommon = useAxiosCommon();

     const {data:users=[],refetch ,isLoading} = useQuery({
        queryKey:['users'],
        queryFn: async () =>{
            try {
                const { data } = await axiosSecure.get("/users");
                return data;
            } catch (error) {
                toast.error(error.message)
            }
        }
     })

     const {mutateAsync} = useMutation({
        mutationKey:['user'],
        mutationFn: async ({id} )=>{
               try {
                 const result = await Swal.fire({
                   title: "Are you sure?",
                   text: "You won't be able to revert this!",
                   icon: "warning",
                   showCancelButton: true,
                   confirmButtonColor: "#3085d6",
                   cancelButtonColor: "#d33",
                   confirmButtonText: "Yes, delete it!",
                 });

                 if (result.isConfirmed) {
                   const { data } = await axiosCommon.delete(`/users/${id}`);

                   if (data.deletedCount > 0) {
                     Swal.fire({
                       title: "Deleted!",
                       text: "User has been deleted.",
                       icon: "success",
                     });
                     refetch();
                   }
                 }
               } catch (error) {
                 toast.error(error.message);
               }
        }
     })

     const handleMakeAdmin = async user =>{
     try {
         const { data } = await axiosSecure.patch(`/users/admin/${user?._id}`);
         console.log(data);
         if (data.modifiedCount > 0) {
             refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user?.name} is an Admin Now!`,
              showConfirmButton: false,
              timer: 1500,
            });

         }
     } catch (error) {
        toast.error(error.message);
     }

     }

     const handleDelete = async id =>{
        try {
            mutateAsync({id})
        } catch (error) {
            toast.error(error.message)
        }
     }

  return (
    <div>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: {users?.length}</h2>
      </div>
      {/* kkkkkkkkkkkk */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead className="bg-gray-200 border-b-2 border-gray-300">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr
                key={user?._id}
                className="bg-base-200 border-b-2 border-gray-300"
              >
                <th>{index + 1}</th>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td>
                  { user?.role === "admin" ? 'Admin' :
                    <button
                    onClick={() => handleMakeAdmin(user)}
                    className="text-2xl bg-orange-400 px-2 py-1 text-white"
                  >
                    <FaUsers />
                  </button>
                  }
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user?._id)}
                    className="text-2xl text-red-500"
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* kkkkkkkkkkkk */}
    </div>
  );
};

export default AllUsers;
