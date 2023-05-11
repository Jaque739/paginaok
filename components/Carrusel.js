import React, {useEffect} from 'react';
import Image from 'next/image';
import { Navigation, Thumbs } from 'swiper';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import c1 from '../imagenes/c1.jpg';
import pic from '../imagenes/inicio.png';

const Carrusel = ({letra}) => {
  console.log(`desde Carrucel ${letra}`);

  const pattern = new RegExp(`[${letra}]+`);
  const nuevoIndice = [];
  const filtro = [pic,c1,pic]
  console.log(filtro);

  useEffect(() => {
    console.log('Nueva letra');
  }, [letra]);

  return (
    <Swiper
      loop={true}
      spaceBetween={10}
      slidesPerView={1}
      navigation={true}
      modules={[Navigation, Thumbs]}
      grabCursor={true}
      onSlideChange={() => {}}
      onSwiper={(swiper) =>{} }
      initialSlide={1}
      
      // onNavigationNext={}
      // onNavigationPrev={}
      
    >
    <SwiperSlide>
    <Image    
        src={pic}
        width={300}    
        height={500}
        alt='inicio'
    >
    </Image>
    </SwiperSlide>
    <SwiperSlide>
    <Image  
        src={c1}
        width={550}    
        height={500}
        border-radius={1000}
        alt='inicio'
    >
    </Image>
    </SwiperSlide>
    <SwiperSlide>Slide 3</SwiperSlide>
    <SwiperSlide>Slide 4</SwiperSlide>  
            
          
       
           
        
      
    </Swiper>
  )
}

export default Carrusel;