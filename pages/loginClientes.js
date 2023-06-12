import React, { useState} from 'react'
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useField, useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';


const AUTENTICAR_US = gql `
mutation autenticarUsuario ($input: AutenticarUsInput) {
  autenticarUsuario(input: $input) {
    token
  }
  }
  `;

const LoginClientes = () => {

  const router = useRouter();

    const [mensaje, gudardarMensaje] = useState(null);

//Mutation para crear nuevos admis en apollo
    const [autenticarUsuario] = useMutation(AUTENTICAR_US);

   const formik = useFormik ({
    initialValues: {
        us: '',
        contra: ''
    },
    validationSchema: Yup.object ({
        us: Yup.string()
                    .required('El email no puede ir vacio'),
        contra: Yup.string()
                     .required('La contraseña es obligatoria')
    }),

    onSubmit: async valores => {
        //console.log(valores);
        const {us, contra } = valores;

        try{
            const {data} = await autenticarUsuario ({
                variables: {
                    input: {
                        us,
                        contra
                    }
                }
            });
            console.log(data);
            gudardarMensaje('Autenticando...');

            //Guardar el token en localstorage
            const {token} = data.autenticarUsuario;
            localStorage.setItem('token', token);

            //Redireccionar hacia cliente
            setTimeout(() =>{
                gudardarMensaje(null);
                router.push('/clientes');
            }, 3000);                    

        } catch (error) {
            gudardarMensaje(error.message.replace('undefined', ''))
                //console.log(error);
                setTimeout(() =>{
                    gudardarMensaje(null);
                }, 3000);
            }
            
        }
})

const mostrarMensaje = () =>{
    return(
        <div className="bg-red-300 py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
            <p>{mensaje}</p>
        </div>
    )
}


    return (
        <>
        <Layout>

         <h1 className="text-center text-2xl text-black font-light  justify-center">Login</h1>   

         {mensaje && mostrarMensaje() }

         <div className="flex  h-screen  justify-center items-center mt-5">
            <div className=" w-1/2  h-full max-w-sm ">
                <form className="bg-red-600 mt-10 rounded shadow-md  px-8 pt-6 pb-8 mb-4  " onSubmit = {formik.handleSubmit}>
                    

                    <div className= "mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="us ">
                            Usuario
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline "
                        id="us"
                        type="text"
                        placeholder=" Usuario"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.us}
                        />
                    </div>
                    {formik.touched.us && formik.errors.us ? (
                        <div className="my-2 bg-yellow-300 border-l-4 border-yellow-600 text-black p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.us}</p>
                        </div>
                    ) :  null }

                    <div className= "mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="contra">
                            Contraseña
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline "
                        id="contra"
                        type="password"
                        placeholder="Contraseña"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.contra}
                        />
                    </div>
                    {formik.touched.contra && formik.errors.contra ? (
                        <div className="my-2 bg-yellow-300 border-l-4 border-yellow-600 text-black p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.contra}</p>
                        </div>
                    ) :  null }
                    
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

export default LoginClientes;
