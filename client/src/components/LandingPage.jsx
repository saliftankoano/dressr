import './LandingPage.css';
import {Swiper, SwiperSlide} from "swiper/react"
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { Navigation, Autoplay } from 'swiper/modules';
import outfit1 from '../assets/hispanic-woman.png'
import outfit2 from '../assets/asian-man.png'
import outfit3 from '../assets/classy-black.png'
import outfit4 from '../assets/gym-white.png'
import outfit5 from '../assets/white-man.png'

function LandingPage() {

  return (
    <section className="landingPage">
      <div className='top-bar'>
        <div className='logo'>Dressr</div>
        <div className='menu-links'>
          <a id='about' href='./about'>About</a>
          <a id='contact' href='./contact'>Contact</a>
        </div>
      </div>
      <div className='content'>
        <div className='descriptions'>
          <div id='slogan'>Effortless Style<br/>At Your Fingertips</div>
          <p id='explain'>Say goodbye to fashion guesswork and hello to dressing better, faster, and with confidence.<br/>Your wardrobe just got a smart upgrade!</p>
          <a href='./login'><button id="start-btn">Get Started</button></a> &nbsp;
          <a href='./wardrbe'><button id="start-btn">View Your Wardrbe</button></a> &nbsp;
          <a href='./outfit'><button id="start-btn">Get an Outfit</button></a>
        </div>
        <div className='clothing'>
          <Swiper 
            grabCursor={true}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            
            navigation={false}
            modules={[Autoplay, Navigation]}
            className='swiper-conatainer'
          >
              <SwiperSlide>
                <img src={outfit1}/>
              </SwiperSlide>
              <SwiperSlide>
                <img src={outfit2}/>
              </SwiperSlide>
              <SwiperSlide>
                <img src={outfit3}/>
              </SwiperSlide>
              <SwiperSlide>
                <img src={outfit4}/>
              </SwiperSlide>
              <SwiperSlide>
                <img src={outfit5}/>
              </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default LandingPage;
