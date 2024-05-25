import { MdDeleteForever } from 'react-icons/md';
import SectionTitle from '../../../components/SectionTitle/SectionTitle'
import useMenu from '../../../hooks/useMenu'
import { HiPencilAlt } from "react-icons/hi";
import {  useMutation } from "@tanstack/react-query";
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const ManageItems = () => {
  const [menu, refetch, loading] = useMenu();
  const axiosSecure = useAxiosSecure();



   const { mutateAsync } = useMutation({
     mutationKey: "menu",
     mutationFn: async ({ id }) => {
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
           const { data } = await axiosSecure.delete(`/menu/${id}`);

           if (data.deletedCount > 0) {
              refetch();
             Swal.fire({
               title: "Deleted!",
               text: "Menu has been deleted.",
               icon: "success",
             });
           }
         }
       } catch (error) {
         toast.error(error.message);
       }
     },
   });


     const handleDelete = async (id) => {
       try {
         mutateAsync({ id });
       } catch (error) {
         toast.error(error.message);
       }
     };


       if (loading) {
         return <p>Loading.................</p>;
       }

  return (
    <div>
      <SectionTitle heading="Mange All Items" subHeading="Hurry Up" />
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {menu?.length > 0 &&
                menu?.map((item, index) => (
                  <tr key={item?._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={item?.image} alt="" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item?.name}</td>
                    <td className="text-right">${item?.price}</td>
                    <td>
                      <Link to={`/dashboard/updateItem/${item?._id}`}>
                        <button className="text-2xl text-red-500">
                          <HiPencilAlt />
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(item?._id)}
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
      </div>
    </div>
  );
}

ManageItems.propTypes = {}

export default ManageItems