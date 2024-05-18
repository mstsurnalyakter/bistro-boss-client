import PropTypes from 'prop-types'

const FoodCard = ({item}) => {
    const { name, image, price, recipe } = item || {};
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
            <button className="btn btn-outline border-orange-400 bg-slate-100 border-0 border-b-4 mt-4">
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
