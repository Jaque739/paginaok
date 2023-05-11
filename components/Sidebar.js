import React from 'react';
import Link from 'next/Link';
import {useRouter} from 'next/router';
import Image from 'next/image';
import logo from '../imagenes/Captura.png'

const Sidebar = () => {

    return (
        
            // <nav className="mt-5 list-none flex justify-between items-center bg-green-500">
            //     <div className='border bg-red-500 ml-5 p-3 rounded-full'>
            //         <p className="text-white text-4xl font-black">Realidad Aumentada</p> 
            //     </div>
                
            //     <div className='p-5 bg-green-500 flex m-5'>
            //         <li >

            //             {/* <Link className='p-5' (target="_blank" se abre una nueva pagina) href="/clientes"> */}
            //             <Link className='p-5' target="_blank" href="/clientes">
            //                 Clientes
            //             </Link>
            //             </li>
            //         <li>
            //             <Link className='p-5' href="/sitios">
            //                 Acerca de
            //             </Link>
            //         </li>  
            //         <li>
            //             <Link className='p-5' href="/sitios">
            //                 Beneficio
            //             </Link>
            //         </li>  
            //         <li>
            //             <Link className='p-5' href="/sitios">
            //                 Sitios
            //             </Link>
            //         </li>   
            //     </div>
                
            // </nav>
            
            <nav class="bg-green-500">
            <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div class="relative flex items-center justify-between h-16">
                {/* <!-- Logotipo --> */}
                <div class="flex-shrink-0">
                <Link className='p-5' href="/">
                  <Image 
                        src={logo}
                        width={200}    
                        height={200}
                        alt='logo'
                    />
                </Link>
                </div>
                {/* <!-- Enlaces de navegación --> */}
                <div class="flex">
                  <div class="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      <Link href="/clientes" className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700">Inicio</Link>
                      <Link href="#Acerca" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Acerca de</Link>
                      <Link href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Productos</Link>
                      <Link href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Contacto</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          
        )
}

export default Sidebar;