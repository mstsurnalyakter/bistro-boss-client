
import PropTypes from 'prop-types'
import FoodCard from '../../../components/FoodCard/FoodCard';

const OrderTabPanel = ({items}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items?.map((item) => (
        <FoodCard item={item} key={item?._id} />
      ))}
    </div>
  );
}

OrderTabPanel.propTypes = {
    items:PropTypes.array.isRequired
}

export default OrderTabPanel