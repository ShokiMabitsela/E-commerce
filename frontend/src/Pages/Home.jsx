import Banner from '../assets/Banner.png'
const Home = () => {
  return (
    <div className=" flex-col lg:text-center ">
      <h1 className="py-5 lg:text-4xl text-6xl text-wrap ">Our latest arrivals</h1>
 <p className="pb-5 text-1xl sm:text-1xl text-center">Celia styled Boutique known for quality and elegancy </p>
   <img src={Banner} className=' md:h-[100rem] w-full px-32 lg:h-[40rem] ' alt=''/>
   <button  className=''>Shop</button>
    </div>
  )
}

export default Home
