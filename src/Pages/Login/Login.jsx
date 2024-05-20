import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "../../assets/others/authentication2.png";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { useEffect,  useState } from "react";
import useAuth from "../../hooks/useAuth";

import toast from "react-hot-toast";
import DynamicTitle from "../Shared/DynamicTitle/DynamicTitle";

const Login = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";


  const [disabled,setDisabled] = useState(true);
  const { signIn } = useAuth();

  useEffect(()=>{
    loadCaptchaEnginge(6);
  },[])

  const handleLogin = async e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
     const result = await signIn(email, password);
     if (result?.user) {
       toast.success("Login Successful");
       navigate(from);
     }
    } catch (error) {
      toast.error(error.message)
    }

  }

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if(validateCaptcha(user_captcha_value)){
      setDisabled(false)
    }else{
      setDisabled(true)
    }
  }

  return (
    <>
      <DynamicTitle title="Login" />
      <div className="flex flex-col md:flex-row justify-center items-center min-h-screen">
        <div className="">
          <img src={login} alt="" />
        </div>
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Log In</h1>
            <p className="text-sm text-gray-400">
              Sign in to access your account
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Enter Your Email Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm mb-2">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  id="password"
                  required
                  placeholder="*******"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm mb-2">
                    <LoadCanvasTemplate />
                  </label>
                </div>
                <input
                  type="text"
                  name="captcha"
                  id="captcha"
                  onBlur={handleValidateCaptcha}
                  required
                  placeholder="Type the captcha above"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                />
                {/* <button className="btn btn-outline hover:bg-rose-500 btn-xs mt-2">
                  Validate
                </button> */}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={disabled}
                className="bg-rose-500 disabled:bg-gray-500 disabled:cursor-not-allowed w-full rounded-md py-3 text-white"
              >
                Login
              </button>
            </div>
          </form>
          <div className="space-y-1">
            <button className="text-xs hover:underline hover:text-rose-500 text-gray-400">
              Forgot password?
            </button>
          </div>
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            <p className="px-3 text-sm dark:text-gray-400">
              Login with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          </div>

          <p className="px-6 text-sm text-center text-gray-400">
            Don&apos;t have an account yet?{" "}
            <Link
              to="/signUp"
              className="hover:underline hover:text-rose-500 text-gray-600"
            >
              Sign up
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}

export default Login