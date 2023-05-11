import React from "react";
import Layout from "../components/Layout";


const Login = () => {


    return (
        <>
        <Layout>

         <h1 className="text-center text-2xl text-black font-light border  border-black justify-center">Login</h1>   

         <div className="flex border  border-black   justify-center items-center mt-5">
            <div className=" w-1/2  h-full ">
                <form className="bg-red-600 mt-10 border border-black rounded shadow-md  px-8 pt-6 pb-8 mb-4  ">
                    <div className= "mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
                            Correo Electronico
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline "
                        id="email"
                        type="email"
                        placeholder="Correo Usuario"
                        />
                    </div>
                    <div className= "mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline "
                        id="password"
                        type="password"
                        placeholder="Contraseña"
                        />
                    </div>
                    <input
                    type="submit"
                    className="bg-white w-full mt-5 p-2 text-black uppercas hover:bg-gray-300"
                    value="Iniciar Sesión"
                    />
                </form>

            </div>
         </div>
         
        </Layout>
    
    </>
    )
}

export default Login;

