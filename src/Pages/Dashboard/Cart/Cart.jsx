import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart"
import { MdDeleteForever } from "react-icons/md";
import { useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosCommon from "../../../hooks/useAxiosCommon";

const Cart = () => {
    const [cart,refetch] = useCart();
    const totalPrice = cart?.reduce((total,item)=>total + item.price,0);

    const axiosCommon = useAxiosCommon();



    const {mutateAsync} = useMutation({
        mutationKey:['cart'],
       mutationFn: async ({id}) =>{
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
                const { data } = await axiosCommon.delete(`/carts/${id}`);

                   if (data.deletedCount > 0) {
                     Swal.fire({
                       title: "Deleted!",
                       text: "Craft Item has been deleted.",
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

    const handleDelete = async id =>{
        try {
            await mutateAsync({id})
        } catch (error) {
            toast.error(error.message);
        }
    }
  return (
    <div className="shadow p-5 border-2 space-y-5">
      <div className="flex justify-evenly">
        <h2 className="text-3xl">Items: {cart?.length}</h2>
        <h2 className="text-3xl">Total Price: {totalPrice.toFixed(3)}</h2>
        <button className="px-5 text-2xl py-1 rounded-md text-white bg-rose-400">
          Pay
        </button>
      </div>
      <div>
        <div className="overflow-x-auto ">
          <table className="table w-full">
            {/* head */}
            <thead className="shadow bg-slate-200">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart?.length > 0 &&
                cart?.map((item, index) => (
                  <tr key={item?._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={item?.image}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item?.name}</td>
                    <td>${item?.price}</td>
                    <th>
                      <button
                        onClick={() => handleDelete(item?._id)}
                        className="text-2xl text-red-500"
                      >
                        <MdDeleteForever />
                      </button>
                    </th>
                  </tr>
                ))}
              {/* row 1 */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Cart