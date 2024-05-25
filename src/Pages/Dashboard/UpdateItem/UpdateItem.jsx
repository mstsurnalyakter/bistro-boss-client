import { useParams } from "react-router"
import SectionTitle from "../../../components/SectionTitle/SectionTitle"
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import toast from "react-hot-toast";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_Key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const UpdateItem = () => {
    const {id} = useParams();
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const axiosCommon = useAxiosCommon();

    // kkkkkkkkkkkkkkkkk


    const onSubmit = async (data) => {
      //image upload to imgbb and then get an url
      const imageFile = { image: data?.image[0] };

      const { name, category, price, recipe } = data;
      try {
        const res = await axiosCommon.post(image_hosting_api, imageFile, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        if (res.data.success) {
          // now send the menu item data to the server with the images
          const menuItem = {
            name,
            category,
            price: parseFloat(price),
            recipe,
            image: res.data?.data?.display_url,
          };

          const menuRes = await axiosSecure.patch(`/menu/${id}`, menuItem);

          console.log("with image url", menuRes?.data);

          if (menuRes?.data?.modifiedCount > 0) {
            toast.success(`${name} is updated successfully.`);
            // reset();
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    // kkkkkkkkkkkkkkkkk

    const {
      data: item = {},
      refetch,
      isLoading
    } = useQuery({
      queryKey: ["menu"],
      queryFn: async () => {
        const { data } = await axiosSecure.get(`/menu/${id}`);
        return data;
      },
    });


    if (isLoading) {
      return <p>Loading...............</p>
    }


    const {name,category,recipe,image,price}= item || {};

  return (
    <div>
      <SectionTitle heading="Update an Item" subHeading="Refresh Info" />
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Recipe Name*</span>
            </div>
            <input
            defaultValue={name}
              {...register("name", { required: true })}
              type="text"
              placeholder="Recipe name"
              className="input input-bordered w-full "
            />
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Category*</span>
              </div>
              <select
                defaultValue={category}
                {...register("category", { required: true })}
                className="select select-bordered w-full"
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">drinks</option>
              </select>
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Price*</span>
              </div>
              <input
              defaultValue={price}
                {...register("price", { required: true })}
                type="number"
                placeholder="Price"
                className="input input-bordered w-full "
              />
            </label>
          </div>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Recipe Details*</span>
            </div>
            <textarea
            defaultValue={recipe}
              {...register("recipe", { required: true })}
              placeholder="Recipe Details"
              className="textarea textarea-bordered w-full "
            ></textarea>
          </label>
          <input
            type="file"

            {...register("image", { required: true })}
            className="file-input file-input-bordered w-full max-w-xs"
          />

          <button type="submit" className="btn w-full">
           Update Menu Item
            {/* <FaUtensils /> */}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateItem