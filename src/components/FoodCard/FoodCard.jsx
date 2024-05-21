import PropTypes from 'prop-types'
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const FoodCard = ({item}) => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();
  const location = useLocation()
  const navigate = useNavigate()
    const { name, image, price, recipe} = item || {};


    const handleAddToCart = async food =>{
       const { name, image, price, _id } = food|| {};
      if (user && user?.email) {
        const cartItem = {
          menuId:_id,
          email:user?.email,
          name,
          image,
          price

        }
     const {data} = await axiosSecure.post("/carts", cartItem);
     if (data?.insertedId) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${name} added to your cart`,
        showConfirmButton: false,
        timer: 1500,
      });
     }
      }else{
        Swal.fire({
          title: "You are not Logged In",
          text: "Please login to add to cart.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, login",
        }).then((result) => {
          if (result.isConfirmed) {
           //send the user to the login page
            navigate("/login",{state:location?.pathname})
            // navigate("/login",{state:{from:location}})
          }
        });
      }
    }


  return (
    <div className="">
      <div className="card relative bg-base-100 shadow-xl">
        <figure>
          <img className="w-full" src={image} alt={`${name} image`} />
        </figure>
        <div className="card-body flex flex-col items-center">
          <h2 className="card-title">{name}</h2>
          <p className="bg-slate-900 text-white px-3 absolute top-4 right-2">
            ${price}
          </p>
          <p>{recipe}</p>
          <div className="card-actions justify-end">
            <button onClick={()=>handleAddToCart(item)} className="btn btn-outline border-orange-400 bg-slate-100 border-0 border-b-4 mt-4">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
FoodCard.propTypes = {
    item:PropTypes.object.isRequired
};

export default FoodCard
