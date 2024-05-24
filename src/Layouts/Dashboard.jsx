import { NavLink, Outlet } from "react-router-dom";
import { FaBook, FaCalendarAlt, FaCartPlus, FaHome, FaList, FaShoppingBag, FaUsers, FaUtensils } from "react-icons/fa";
import { RiHeartAddFill } from "react-icons/ri";
import { TbBrandBooking } from "react-icons/tb";
import { CiMenuBurger } from "react-icons/ci";
import { MdEmail } from "react-icons/md";
import useCart from "../hooks/useCart";
// import { FaUtensils } from "react-icons/fa";

const Dashboard = () => {
    const [cart] = useCart();

    //TODO: get isAdmin value from the database
  const isAdmin = true;

  return (
    <div className="flex">
      {/* dashboard side bar */}
      <div className="w-64 min-h-screen bg-orange-400">
        <ul className="menu p-4">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <FaHome />
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addItems">
                  <FaUtensils />
                  Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageItems">
                  <FaList />
                  Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageBookings">
                  <FaBook />
                  Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allUsers">
                  <FaUsers />
                  All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
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
                  <FaBook />
                  My Booking
                </NavLink>
              </li>
            </>
          )}
          {/* Shared nav links */}
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
