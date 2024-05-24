import { NavLink, Outlet } from "react-router-dom";
import { FaCalendarAlt, FaCartPlus, FaHome, FaShoppingBag } from "react-icons/fa";
import { RiHeartAddFill } from "react-icons/ri";
import { TbBrandBooking } from "react-icons/tb";
import { CiMenuBurger } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import useCart from "../hooks/useCart";

const Dashboard = () => {
    const [cart] = useCart();
  return (
    <div className="flex">
      {/* dashboard side bar */}
      <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu p-4">
          <li>
            <NavLink to="/dashboard/userHome">
              <FaHome />
              User Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/reservation">
              <FaCalendarAlt />
              Reservation
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/cart">
              <FaCartPlus />
              My Cart
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/review">
              <RiHeartAddFill />
              Add a Review ({cart?.length})
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/bookings">
              <TbBrandBooking />
              My Booking
            </NavLink>
          </li>
          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu">
              <CiMenuBurger />
              menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/order/salad">
              <FaShoppingBag />
              Order
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact">
              <MdEmail />
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
      {/* dashboard content */}
      <div className="flex-1 p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
