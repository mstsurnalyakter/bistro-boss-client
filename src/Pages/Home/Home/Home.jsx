import Banner from "../Banner/Banner"
import Category from "../Category/Category"
import Feature from "../Feature/Feature"
import PopularMenu from "../PopularMenu/PopularMenu"
import Testimonials from "../Testimonials/Testimonials"


const Home = () => {
  return (
    <div>
      <Banner/>
      <Category/>
      <PopularMenu/>
      <Feature/>
      <Testimonials/>
    </div>
  )
}

export default Home