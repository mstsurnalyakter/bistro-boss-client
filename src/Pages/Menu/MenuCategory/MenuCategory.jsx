import PropTypes from 'prop-types'
import MenuItem from '../../Shared/MenuItem/MenuItem';
import Cover from '../../Shared/Cover/Cover';
import { Link } from 'react-router-dom';

const MenuCategory = ({item,title, img}) => {
  return (
    <div className="pt-8">
      {title && <Cover img={img} title={title} />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-16">
        {item?.map((item) => (
          <MenuItem key={item?._id} item={item} />
        ))}
      </div>
      <Link to={`/order/${title}`}>
        <button className="btn btn-outline border-0 border-b-4 mt-4">
          Order Now
        </button>
      </Link>
    </div>
  );
}

MenuCategory.propTypes = {
  item:PropTypes.array,
  title:PropTypes.string,
  img:PropTypes.string
}

export default MenuCategory