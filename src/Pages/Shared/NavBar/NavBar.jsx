import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { FaCartPlus } from "react-icons/fa";
import useCart from "../../../hooks/useCart";


const NavBar = () => {

  const {logOut,user} = useAuth();
  const  [cart] = useCart()
 

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      toast.error(error.message)
    }
  }

    const navOption = (
      <>
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>

        <li>
          <NavLink to={"/menu"}>Our Menu</NavLink>
        </li>

        <li>
          <NavLink to={"/order/salad"}>Order</NavLink>
        </li>
        <li>
          <NavLink to={"/secret"}>Secret</NavLink>
        </li>
        <li>
          <NavLink>
            <button className="flex items-center gap-2">
              <FaCartPlus/>
              <div className="badge badge-secondary">+{cart?.length}</div>
            </button>
          </NavLink>
        </li>

        {user ? (
          <li className="flex gap-3 justify-center flex-row items-center">
            {/* <img
              className="border-2 h-24 w-24 rounded-full border-[#d80343]"
              src={user?.photoURL}
              title={user?.displayName}
              alt=""
            /> */}

            <button
              onClick={handleLogOut}
              className="px-3 py2 ml-2 bg-[#d80343] text-white hover:bg-[#d80343]"
            >
              LogOut
            </button>
          </li>
        ) : (
          <>
            <li>
              <NavLink to={"/login"}>Login</NavLink>
            </li>
          </>
        )}
      </>
    );
  return (
    <div>
      <div className="navbar opacity-30 max-w-screen-xl fixed z-10 bg-black text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
                {navOption}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Bistro Boss</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
          {navOption}
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    </div>
  );
}

export default NavBar