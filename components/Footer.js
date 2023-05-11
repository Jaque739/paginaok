import React from 'react';
import Link from 'next/Link';
import Image from 'next/image';
import logo from '../imagenes/Captura.png'

const Footer = () => {
    return ( 
        <footer>
            <nav className="bg-green-500">
            <div className="relative flex items-center justify-between h-16">
                {/* <!-- Logotipo --> */}
                <div className="flex-shrink-0">
                <Link className='p-5' href="/">
                  <Image 
                        src={logo}
                        width={200}    
                        height={200}
                        alt='logo'
                    />
                </Link>
                </div>
                </div>
            <div className=" max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
             <div className='flex justify-between '>

                {/* <!-- Enlaces de navegación --> */}
                
                    
                     <div><Link href="/clientes" className=" text-2xl rounded-md  font-medium text-white focus:text-white focus:bg-gray-700">Descarga RA</Link></div>
                      <div><Link href="#Acerca" className=" text-2xl py-2 rounded-md  font-medium text-gray-300 hover:text-white hover:bg-gray-700  focus:text-white focus:bg-gray-700 ">Acerca de</Link></div>
                      <div><Link href="#" className=" text-2xl rounded-md font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Beneficios</Link> </div>
                    <div><Link href="#" className="px-3 py-2 text-2xl rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Terminos y Condiciones</Link></div>
              </div>
              </div>
           
            <div className='text-center text-2xl p-5'>Av. Tecnológico S/N C.P. 55210 Col. Valle de Anáhuac, Ecatepec de Morelos, Estado de México. </div>
          </nav>
        </footer>
    )
   }

export default Footer;