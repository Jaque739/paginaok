import React from 'react'
import Head from 'next/head'
import Sidebar from '../components/Sidebar';
import {useRouter} from'next/router';
import Footer from '../components/Footer';
import HeaderCliente from './HeaderCliente';

const Layout2 = ({children}) =>{

    //Hook de routing
    const router = useRouter();

    return(
        <>
        <Head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <link href= "https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"/>
            </Head>

            {
            //Codigo que elimina la barra

            // router.pathname === '/login' || router.pathname === '/nuevacuenta' ? (
            //     <div className="bg-white-800 min-h-screen flex flex-col justify-center">
            //         <div>
            //             {children}
            //         </div>
                    
            //     </div>
                
            // ) : 
            (
              <div>
                {/* <div className="flex min-h-screen"> */}
                <HeaderCliente/>
               
                <div>
                    <main className = "w-full "> 
                    {/* <main className = "sm:w-2/3 xl:w-4/5 sm:min-h-screen ">  */}
                        {children} 
                    </main>
                </div>
                <Footer/>   
            </div>  
            )}
           
        </>
    );
}

export default Layout2;