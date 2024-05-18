import MenuItem from "../../Shared/MenuItem/MenuItem";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";


const PopularMenu = () => {
  const [menu] = useMenu()

    console.log(menu);
  return (
    <section className="mb-12">
      <SectionTitle heading="From Our Menu" subHeading="Popular Items" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {menu
          ?.filter((item) => item?.category === "popular")
          ?.map((item) => (
            <MenuItem key={item?._id} item={item} />
          ))}
      </div>
    </section>
  );
}

export default PopularMenu