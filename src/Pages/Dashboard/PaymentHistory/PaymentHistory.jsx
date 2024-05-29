import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth"
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const PaymentHistory = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure()
    const {data:payments=[],refetch} = useQuery({
        queryKey:['payments',user?.email],
        queryFn: async () =>{
            const { data } = await axiosSecure.get(`/payments/${user?.email}`);

            return data;
        }
    })
    console.log(payments);
  return (
    <div>
      <h2 className="text-3xl">Total Payments:{payments?.length}</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Price</th>
              <th>Transaction Id</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments?.length > 0 &&
              payments?.map((payment, index) => (
                <tr key={payment?._id}>
                  <th>{index+1}</th>
                  <td>${payment?.price}</td>
                  <td>{payment?.transactionId}</td>
                  <td>{payment?.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentHistory