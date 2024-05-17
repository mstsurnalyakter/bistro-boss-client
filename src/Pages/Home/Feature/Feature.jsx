import featuredImg from '../../../assets/home/featured.jpg';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
// import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import './Feature.css'

const Feature = () => {
  return (
    <section className='featured-item bg-fixed text-white mb-10 pt-8 py-20'>
      <SectionTitle subHeading="Check it out" heading="Feature Item" />
      <div className='md:flex bg-slate-500 bg-opacity-60 items-center justify-center pt-12 pb-20 px-36'>
        <div>
          <img src={featuredImg} alt="" />
        </div>
        <div className='md:ml-10'>
          <p>Aug 20,2028</p>
          <p className="uppercase">Where can I get some?</p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum
            repellendus voluptas, odit et excepturi vero laborum ut odio
            consequuntur facilis cumque. Possimus rem quasi minus voluptate,
            optio sapiente iusto. Veritatis velit quisquam voluptate esse
            eligendi similique odit, rerum repudiandae libero?
          </p>
          <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
        </div>
      </div>
    </section>
  );
}



export default Feature