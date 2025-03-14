import React from 'react';
import ImageSlider from './ImageSlider';
import Card from './Card';
import Banner2 from './Banner2';
import Footer from '../global-components/footer';
import NavBar from '../NavBar';

const Home = () => {
  return (
    <div>
<NavBar/>
      <div className="relative bg-white text-white h-1/2 flex items-center justify-center">
        {/* Image Slider */}
        <div className="absolute inset-0 h-1/2">
          <ImageSlider />
          
        </div>

        <div className="absolute top-0 right-0 z-10 text-right p-4">
          <h1 className="text-5xl font-bold mb-2">Bold Looks for the</h1>
          <h2 className="text-4xl font-semibold mb-4">Modern You.</h2>
          <button className="bg-white text-black px-6 py-3 font-semibold rounded-md hover:bg-gray-200 transition">
            Shop Now
          </button>
        </div>
      </div>
      

      <div className="bg-white py-24 sm:py-32 mt-80">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
          Explore Our Curated Collection of Top Brands
          </h2>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/plus/img/logos/158x48/transistor-logo-gray-900.svg"
              alt="Transistor"
              width="158"
              height="48"
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/plus/img/logos/158x48/reform-logo-gray-900.svg"
              alt="Reform"
              width="158"
              height="48"
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/plus/img/logos/158x48/tuple-logo-gray-900.svg"
              alt="Tuple"
              width="158"
              height="48"
            />
            <img
              className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
              src="https://tailwindui.com/plus/img/logos/158x48/savvycal-logo-gray-900.svg"
              alt="SavvyCal"
              width="158"
              height="48"
            />
            <img
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
              src="https://tailwindui.com/plus/img/logos/158x48/statamic-logo-gray-900.svg"
              alt="Statamic"
              width="158"
              height="48"
            />
          </div>
        </div>
      </div>
      <div class="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
            <div role="alert" class="relative block w-full text-base font-regular px-4 py-4 rounded-lg bg-gray-900 text-white flex">
                <div class=" mr-12">
                    <p class="font-bold text-red-500">Black Friday Sale
                    <span class="text-red-300">
                        - Up to 50% off on fashion items!
                    </span>
                    <span title="" class="inline-flex items-center justify-center text-sm font-bold text-red-500 transition-all ml-4 duration-200 rounded-md hover:text-red-700" role="button">
                        Get Now<svg class="w-4 h-4 ml-1" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                    </span>
                    </p>
                </div>
                <button class="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 !absolute top-3 right-3" type="button">
                    <span class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </span>
                </button>
            </div>
        </div>
      
      <Card />
      <Banner2/>
      <Footer />
    </div>
  );
};

export default Home;
