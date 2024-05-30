import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth"
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi2";
import { MdSell } from "react-icons/md";
import { CiBookmark } from "react-icons/ci";

const AdminHome = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data:stats={},isLoading } = useQuery({
      queryKey: ["admin-stats"],
      queryFn: async () =>{
        const { data } = await axiosSecure.get("/admin-stats");
        return data
      }
    });

    console.log(stats);

    if (isLoading) {
      return <p>Loading..........</p>
    }
  return (
    <div>
      <h2 className="text-3xl">
        <span>Hi,Welcome </span>
        {user?.displayName ? user?.displayName : "Back"}
      </h2>
      {/* kkkkkkkkkkkkkk */}
      <div className="stats shadow mt-5">
        <div className="stat place-items-center flex items-center">
          <div className="stat-desc text-secondary text-3xl">
            <FaMoneyCheckDollar />
          </div>
          <div>
            <div className="stat-title">Revenue</div>
            <div className="stat-value">${stats?.revenue}</div>
          </div>
        </div>

        <div className="stat place-items-center flex items-center">
          <div className="stat-desc text-secondary text-3xl">
            <HiUserGroup />
          </div>
          <div>
            <div className="stat-title">Users</div>
            <div className="stat-value text-secondary">{stats?.users}</div>
          </div>
        </div>

        <div className="stat place-items-center flex items-center">
          <div className="stat-desc text-secondary text-3xl">
            <MdSell />
          </div>
          <div>
            <div className="stat-title">Orders</div>
            <div className="stat-value text-secondary">{stats?.orders}</div>
          </div>
        </div>

        <div className="stat place-items-center flex items-center">
          <div className="stat-desc text-secondary text-3xl">
            <CiBookmark />
          </div>
          <div>
            <div className="stat-title">Menu Items</div>
            <div className="stat-value text-secondary">{stats?.menuItems}</div>
          </div>
        </div>
      </div>
      {/* kkkkkkkkkkkkkk */}
    </div>
  );
}

export default AdminHome