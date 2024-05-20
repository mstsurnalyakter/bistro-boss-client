
import PropTypes from 'prop-types'
import FoodCard from '../../../components/FoodCard/FoodCard';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const OrderTabPanel = ({items}) => {
   const pagination = {
     clickable: true,
     renderBullet: function (index, className) {
       return '<span class="' + className + '">' + (index + 1) + "</span>";
     },
   };
  return (
    <div>
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper"
      >
          <SwiperSlide>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items?.map((item) => (
              <FoodCard item={item} key={item?._id} />
            ))}
        </div>
          </SwiperSlide>
      </Swiper>
    </div>
  );
}

OrderTabPanel.propTypes = {
    items:PropTypes.array.isRequired
}

export default OrderTabPanel