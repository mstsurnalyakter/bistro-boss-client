import { Link, useNavigate} from "react-router-dom";
import login from "../../assets/others/authentication2.png";
import useAuth from "../../hooks/useAuth";
import { useForm} from "react-hook-form";
import DynamicTitle from "../Shared/DynamicTitle/DynamicTitle";
import toast from "react-hot-toast";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const SignUp = () => {
    const {  currentUser,updateUserProfile } = useAuth();
    const axiosCommon = useAxiosCommon();

  const navigate = useNavigate();
    const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()


  const onSubmit = async (data) =>{
    const {name,image, email, password} = data;
    console.log(data);
    try {

    const result = await currentUser(email, password);
    console.log(result.user);

    await updateUserProfile(name,image);
    const userInfo = {
      name,
      email
    }

    const { data } = await axiosCommon.post("/users", userInfo);

    if (data.insertedId) {
      reset();
      toast.success("Sign up successful");
      navigate("/");
    }


    } catch (error) {
      toast.error(error.message)
    }
  }



  return (
    <>
      <DynamicTitle title="Sign Up" />
      <div className="flex flex-col md:flex-row justify-center items-center min-h-screen">
        <div className="">
          <img src={login} alt="" />
        </div>
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm">
                  Name
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  {...register("name", { required: true })}
                  placeholder="Enter Your name Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                />
                {errors.name && (
                  <span className="text-red-500">Name is required</span>
                )}
              </div>

              <div>
                <label htmlFor="image" className="block mb-2 text-sm">
                  Photo URL
                </label>
                <input
                  type="url"
                  name="image"
                  id="image"
                  {...register("image", { required: true })}
                  required
                  placeholder="Photo URL"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                />
                {errors.image && (
                  <span className="text-red-500">Photo URL is required</span>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  {...register("email", { required: true })}
                  placeholder="Enter Your Email Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  data-temp-mail-org="0"
                />
                {errors.email && (
                  <span className="text-red-500">Email is required</span>
                )}
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
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 25,
                    pattern:
                      /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                  })}
                  placeholder="*******"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                />
                {errors.password?.type === "required" && (
                  <span className="text-red-500">Password is required</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-500">
                    Password must be greater than 5 character
                  </span>
                )}
                {errors.password?.type === "maxLength" && (
                  <span className="text-red-500">
                    Password must be less than 20 character
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="text-red-500">
                    Password must have one upper case, one lower case, one
                    number , and one special character
                  </span>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="bg-rose-500 disabled:bg-rose-400 disabled:cursor-not-allowed w-full rounded-md py-3 text-white"
              >
                Sign Up
              </button>
            </div>
          </form>
        
          <div className="text-center my-5">
            <SocialLogin />
          </div>
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            <p className="px-3 text-sm dark:text-gray-400">
              Login with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          </div>
          <p className="px-6 text-sm text-center text-gray-400">
            Already have an account{" "}
            <Link
              to="/login"
              className="hover:underline hover:text-rose-500 text-gray-600"
            >
              Login
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}

export default SignUp