import Cover from "../../Shared/Cover/Cover"
import DynamicTitle from "../../Shared/DynamicTitle/DynamicTitle"
import menuImg from '../../../assets/menu/banner3.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import useMenu from "../../../hooks/useMenu"
import SectionTitle from "../../../components/SectionTitle/SectionTitle"
import MenuCategory from "../MenuCategory/MenuCategory"

const Menu = () => {
  const [menu] = useMenu();
  const offered = menu?.filter((item) => item.category === "offered");
  const desserts = menu?.filter((item) => item.category === "dessert");
  const soup = menu?.filter((item) => item.category === "soup");
  const salad = menu?.filter((item) => item.category === "salad");
  const pizza = menu?.filter((item) => item.category === "pizza")
  return (
    <div>
      <DynamicTitle title="Menu" />

      {/* main cover */}
      <Cover img={menuImg} title="Our Menu" />

      {/* offered */}
        <SectionTitle heading={"Today's Offer"} subHeading={"Don't Miss"} />
        <MenuCategory item={offered} />


        {/* dessert menu items */}
        <MenuCategory item={desserts} title={'dessert'} img={dessertImg} />

        {/* pizza menu items */}
        <MenuCategory item={pizza} title={'pizza'} img={pizzaImg} />
        {/* soup menu items */}
        <MenuCategory item={soup} title={'soup'} img={soupImg} />
        {/* salad menu items */}
        <MenuCategory item={salad} title={'salad'} img={saladImg} />


    </div>
  );
}

export default Menu