import { FaUtensils } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle"
import { useForm } from "react-hook-form";




const AddItems = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
      console.log(data);
    };
  return (
    <div>
      <SectionTitle heading="add an item" subHeading="What's new?" />
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Recipe Name*</span>
            </div>
            <input
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
                defaultValue="default"
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
            Add Item
            <FaUtensils />
          </button>
        </form>
      </div>
    </div>
  );
}


export default AddItems