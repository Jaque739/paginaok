import React, {useState}  from "react";
import Layout from "../components/Layout";
import { useField, useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from "next/router";

const AUTENTICAR_ADMI = gql `
mutation autenticarAdmi($input: AutenticarInput) {
    autenticarAdmi(input: $input) {
        token
    }
}
`;

const Login = () => {

//routing

const router = useRouter();

    const [mensaje, gudardarMensaje] = useState(null);

//Mutation para crear nuevos admis en apollo
    const [autenticarAdmi] = useMutation(AUTENTICAR_ADMI);

   const formik = useFormik ({
    initialValues: {
        email: '',
        password: ''
    },
    validationSchema: Yup.object ({
        email: Yup.string()
                    .email('El correo es invalido')
                    .required('El email no puede ir vacio'),
        password: Yup.string()
                     .required('La contraseña es obligatoria')
    }),

    onSubmit: async valores => {
        //console.log(valores);
        const {email, password } = valores;

        try{
            const {data} = await autenticarAdmi ({
                variables: {
                    input: {
                        email,
                        password
                    }
                }
            });
            console.log(data);
            gudardarMensaje('Autenticando...');

            //Guardar el token en localstorage
            const {token} = data.autenticarAdmi;
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

         <h1 className="text-center text-2xl text-black font-light  justify-center">Inicio de sesion Administrador</h1>   

         {mensaje && mostrarMensaje() }

         <div className="flex  h-screen  justify-center items-center mt-5">
            <div className=" w-1/2  h-full max-w-sm ">
                <form className="bg-red-600 mt-10 rounded shadow-md  px-8 pt-6 pb-8 mb-4  " onSubmit = {formik.handleSubmit}>
                    

                    <div className= "mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
                            Correo Electronico
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline "
                        id="email"
                        type="email"
                        placeholder="Correo Usuario"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        />
                    </div>
                    {formik.touched.email && formik.errors.email ? (
                        <div className="my-2 bg-yellow-300 border-l-4 border-yellow-600 text-black p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.email}</p>
                        </div>
                    ) :  null }

                    <div className= "mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
                            Contraseña
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline "
                        id="password"
                        type="password"
                        placeholder="Contraseña"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        />
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                        <div className="my-2 bg-yellow-300 border-l-4 border-yellow-600 text-black p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.password}</p>
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

export default Login;

