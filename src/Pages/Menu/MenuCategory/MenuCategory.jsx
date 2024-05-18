import PropTypes from 'prop-types'
import MenuItem from '../../Shared/MenuItem/MenuItem';
import Cover from '../../Shared/Cover/Cover';

const MenuCategory = ({item,title, img}) => {
  return (
    <div className='pt-8'>
      {title && <Cover img={img} title={title} />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-16">
        {item?.map((item) => (
            <MenuItem key={item?._id} item={item} />
          ))}
      </div>
    </div>
  );
}

MenuCategory.propTypes = {
  item:PropTypes.array,
  title:PropTypes.string,
  img:PropTypes.string
}

export default MenuCategory