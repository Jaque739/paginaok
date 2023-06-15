import React from 'react';
import Link from 'next/Link';
import {useRouter} from 'next/router';
import Image from 'next/image';
import logo from '../imagenes/Captura.png'

const Sidebar = () => {

    return (
        <div className='fixed top-0 w-full bg-white shadow'>
            <nav className="bg-green-500 ">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
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
                {/* <!-- Enlaces de navegación --> */}
                <div className="flex">
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      <Link href="#inicio" className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700">Inicio</Link>
                      <Link href="#acerca" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Acerca de</Link>
                      <Link href="#beneficios" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Beneficios</Link>
                      <Link href="#contactos" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Contacto</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          </div>
          
        )
}

export default Sidebar;