import Head from 'next/head'
import Layout from '../components/Layout';
import Contactos from '../components/Contactos';
import Link from 'next/Link';
import Image from 'next/image';
import pic from '../imagenes/inicio.png';
import RA from '../imagenes/RA.png';
import tre from '../imagenes/360.png';
import ub from '../imagenes/Ub.png';
import td from '../imagenes/3D.png';
import tj1 from '../imagenes/tarjeta1.png';
import tj2 from '../imagenes/tarjeta2.png';
import tj3 from '../imagenes/tarjeta3.png';
import tj4 from '../imagenes/tarjeta4.png';
import Boton from '../components/Botondes';

import { useEffect } from 'react';

const Index = () => (

        <Layout>
            <div className='bg-gray-00 text-center text-white text-4xl  pt-5 pb-5 '  id='Inicio' >______________</div>
            <div className= ' flex'>
                <article id="inicio"></article>
                
                {/* <div className="absolute bottom-0 left-0 h-16 w-16">07</div> */}
                <div className=' w-1/2 border-black flex items-center'>
                    <div className='w-full text-center text-6xl font-bold '>
                        <p >Recorriendo mi lugar favorito</p>    
                    </div>
                    
             </div>
                <div>
                    <div className='flex justify-center'>
                        <div className='text-3xl m-5 '>
                            <p >¿Ya cuentas con un RA?</p>  
                        </div>
                      <div className='rounded-full text-3xl m-5 pr-3 pl-3 text-center '><Boton></Boton></div>
                    </div>
                    <Image 
                        src={pic}
                        width={1000}    
                        height={1000}
                        alt='inicio'
                    />

                </div>
                
            </div>


            <div className='w-full text-center text-4xl font-bold pt-6 mt-10'>
                <p>Desliza hacia abajo</p>
            </div>
            <div className='w-full text-center text-5xl pb-10'> ▼ </div>     

            <div className='w-full h-screen'> 
                    <article id="acerca"></article>
                    <div className='bg-gray-200 text-center text-4xl font-bold p-8 mt-10' id='#Acerca'>ACERCA DE NOSOTROS</div>
                    <div className='bg-gray-200 text-center text-4xl  p-10 '>
                        <h1> Somos una app de realidad aumentada que ayuda al sector turístico con el conocimiento y aprendizaje acerca
                    de puntos específicos, mediante geolocalización de VPS utilizando el uso de herramientas de realidad aumentada que
                    facilitan y hace mas eficaz como dinámico la visita al lugar que usted quiera registrar (tu local, restaurante, hotel,
                    museo, servicios, monumentos turísticos, etc.) mostrando la información mediante la aplicación 
                    </h1>
                    </div>
                        <div className='bg-gray-200  border-black flex items-center p-10 '>
                            <div className='w-1/4 p-10'>
                            <Image 
                                src={RA}
                                width={300}    
                                height={500}
                                alt='inicio'
                            />

                            </div>
                            <div className='w-1/4 p-10 '>
                            <Image 
                                src={tre}
                                width={300}    
                                height={500}
                                alt='inicio'
                            />

                            </div>
                            <div className='w-1/4  p-10'>
                            <Image 
                                src={ub}
                                width={300}    
                                height={500}
                                alt='inicio'
                            />

                            </div>
                            <div className='w-1/4 p-10'>
                            <Image 
                                src={td}
                                width={300}    
                                height={600}
                                alt='inicio'
                            />

                            </div>

                        </div>
           
            </div>


                        <div className='bg-gray-00 text-center text-gray-200 text-4xl  pt-10 pb-10 '  id='Inicio' >______________</div>
                <div>
                        <article id="beneficios"></article>
                        <div className='bg-green-400  text-center text-4xl font-bold p-10'  id='Inicio' >Beneficios de RA</div>
                        <div className='bg-white flex items-center p-10  '>
                            <div className='w-1/4 p-10'>
                            <Image 
                                src={tj1}
                                width={1000}    
                                height={800}
                                alt='inicio'
                            />

                            </div>
                            <div className='w-1/4 p-10 '>
                            <Image 
                                src={tj2}
                                width={1000}    
                                height={800}
                                alt='inicio'
                            />

                            </div>
                            <div className='w-1/4  p-10'>
                            <Image 
                                src={tj3}
                                width={1000}    
                                height={800}
                                alt='inicio'
                            />

                            </div>
                            <div className='w-1/4 p-10'>
                            <Image 
                                src={tj4}
                                width={1000}    
                                height={800}
                                alt='inicio'
                            />

                            </div>
                            </div>
                <div className='bg-white text-center text-red-100 text-4xl  p-10 '  id='Inicio' >______________</div>
         </div>     
         <div>
         <article id="contactos"></article>
                <div className='bg-green-400 text-center text-4xl font-bold pt-10  border border black'  id='Inicio' >Contactanos</div>
                <h1 className="text-center text-2xl text-black font-light flex flex-col justify-center font-bold mb-2">¡Hagamos de tu lugar una Realidad Aumentada!</h1>
                <h1 className="text-center text-2xl text-black font-light flex flex-col justify-center">Completa el formulario y nos pondremos en contacto contigo.</h1>
                 
                 <Contactos> </Contactos>

                <div>
                    <div className='bg-white text-center text-red-100 text-4xl  p-5 '  id='Inicio' >______________</div>
                    
                </div>      
            </div>
              
       
      </Layout>

)

export default Index;