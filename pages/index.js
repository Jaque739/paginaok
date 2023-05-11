import Head from 'next/head'
import Layout from '../components/Layout';
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
import tj4 from '../imagenes/tarjeta4.png'
import { useEffect } from 'react';


const Index = () => (


    <div>
        <Layout>
            
            <div className= ' flex'>
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
                        <div className='rounded-full border border-black text-3xl m-5 pr-3 pl-3 text-center sm:bg-blue-200'>
                            <button><Link className='p-5' href="/login">Entrar
                            </Link>  </button>
                            
                        </div>
                        
                    </div>
                    <Image 
                        src={pic}
                        width={1000}    
                        height={1000}
                        alt='inicio'
                    />

                </div>
                
            </div>
            <div className='w-full text-center text-4xl font-bold pt-6 mt-10'  id='Inicio'>
                <p>Desliza hacia abajo</p>
            </div>
            <div className='w-full text-center text-5xl pb-10'> ▼ </div>
            <div className='w-full h-screen'> 
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
                 <div className='bg-gray-00 text-center text-gray-200 text-4xl  pt-10 pb-10 '  id='Inicio' >______________</div>
                 <div className='bg-green-400  text-center text-4xl font-bold p-10'  id='Inicio' >Beneficios de RA</div>
                
                 </div>
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
                <div className='bg-green-400 text-center text-4xl font-bold pt-10  border border black'  id='Inicio' >Contactanos</div>
                <h1 className="text-center text-2xl text-black font-light flex flex-col justify-center font-bold mb-2">¡Hagamos de tu lugar una Realidad Aumentada!</h1>
                <h1 className="text-center text-2xl text-black font-light flex flex-col justify-center">Completa el formulario y nos pondremos en contacto contigo.</h1>

         <div className="flex justify-center mt-5">
            <div className="w-full max-w-sm">
                <form className="bg-green-300 rounded shadow-md px-8 pt-6 pb-8 mb-4 border border-black">
                    <div className= "mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="nombre">
                            Nombre
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline "
                        id="nombre"
                        type="nombre"
                        placeholder="Nombre"
                        />
                    </div>
                    <div className= "mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline "
                        id="email"
                        type="email"
                        placeholder="Correro electronico"
                        />
                    </div>
                    <div className= "mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="telefono">
                            Telefono
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline "
                        id="telefono"
                        type="telefono"
                        placeholder="Telefono"
                        />
                    </div>
                    <div className= "mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="mensaje">
                            Mesaje
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full py-10  px-3 text-black leading-tight focus:outline-none focus:shadow-outline "
                        id="mensaje"
                        type="mesaje"
                        placeholder="Por favor, incluye toda la información."
                        />
                    </div>
                    <input
                    type="submit"
                    className="bg-white w-full mt-5 p-2 text-black uppercas hover:bg-gray-300"
                    value="Enviar"
                    />
                </form>

            </div>
         </div>
                <div>
                <div className='bg-white text-center text-red-100 text-4xl  p-5 '  id='Inicio' >______________</div>
                
                    </div>      
                    
      </Layout>
    </div>
    

)

export default Index;