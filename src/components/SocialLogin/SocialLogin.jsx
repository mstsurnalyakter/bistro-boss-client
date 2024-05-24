import { FcGoogle } from "react-icons/fc";
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const {googleSignIn}= useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state || "/";

    const handleGoogleSignIn = async () =>{
        try {
         const {user} =  await googleSignIn();
         console.log(user);
            toast.success("Sign in with Google successful.");
            navigate(from,{replace:true})
        } catch (error) {
            toast.error(error.message);
        }
    }

  return (
    <div>
      <div className="divider"></div>
      <div>
        <button onClick={handleGoogleSignIn} className="btn bg-gray-300">
          <FcGoogle />
          Sign In with Google
        </button>
      </div>
    </div>
  );
}

SocialLogin.propTypes = {}

export default SocialLogin