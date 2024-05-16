import { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";


import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const Testimonials = () => {
    const [reviews,setReviews] = useState();
    useEffect(()=>{
        fetch('reviews.json')
        .then(res=>res.json())
        .then(data=>setReviews(data))
        .catch(error=>console.error(error))
    },[])
    console.log(reviews);
  return (
    <section className="my-20">
      <SectionTitle heading="Testimonials" subHeading="What Our Client Say" />
      <div>
        <Swiper
          pagination={{
            type: "fraction",
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Pagination, Navigation,Autoplay]}
          className="mySwiper"
        >
          {reviews?.map((review) => (
            <SwiperSlide key={review?._id}>
              <div className="flex flex-col items-center py-16  mx-24">
                <Rating
                  style={{ maxWidth: 180 }}
                  value={review?.rating}
                  readOnly
                />
                <p className="py-8">{review?.details}</p>
                <h3 className="text-2xl text-orange-400">{review?.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Testimonials