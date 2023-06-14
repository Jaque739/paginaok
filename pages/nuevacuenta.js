
import React, {useState} from "react";
import { useRouter } from 'next/router';
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from 'yup';
import {useMutation, gql} from '@apollo/client';

const NUEVA_CUENTA = gql `
mutation nuevoAdmi($input: AdmiInput){
    nuevoAdmi (input: $input) {
        nombre
        apellidos
        email
        password
    
    }
  }
`;

const NuevaCuenta = () => {
    //State para el mensaje 

    const [mensaje, gudardarMensaje] = useState(null)

    //Mutation para crear nuevor usuarios
    const [nuevoAdmi] = useMutation(NUEVA_CUENTA);

    //Routing

    const router = useRouter();

    //Validacion del formulario
    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellidos: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                        .required('El nombre es obligatorio'),
            apellidos: Yup.string()
                        .required('El apellido es obligatorio'),            
            email: Yup.string()
                    .email('El correo es invalido')
                    .required('La email es obligatoria'), 
            password:Yup.string()
                        .required('La contraseña no puede estar vacia')
                        .min(8,'La contraseña debe de ser de al menos 6 caracteres')
        }),
        onSubmit:  async valores =>{
            //console.log('enviado');
           console.log(valores);
        const {nombre, apellidos, email, password} = valores


            try {
              const {data} = await nuevoAdmi ({
                    variables : {
                        input: {
                            nombre,
                            apellidos,
                            email,
                            password

                        }
                    }
                });
                console.log(data);

                //Usuario creado correctamente
                gudardarMensaje(`Se creo Correctamente el Usuario: ${data.nuevoAdmi.nombre}`);

                setTimeout(() =>{
                    gudardarMensaje(null);
                    router.push('/login')
                }, 3000);

                //Redirigir usuario para iniciar sesión 

            } catch (error) {
                gudardarMensaje()
                gudardarMensaje(error.message.replace('undefined',''))
                console.log();

                setTimeout(() =>{
                    gudardarMensaje(null);
                }, 3000);
            }
        }
    });

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
            {mensaje && mostrarMensaje() }

         <h1 className="text-center text-2xl text-black font-light">Agregar Usuario</h1>   

         <div className="flex justify-center mt-5">
            <div className="w-full max-w-sm">
                <form className="bg-red-600 rounded shadow-md px-8 pt-6 pb-8 mb-4"
                      onSubmit={formik.handleSubmit}>

                     <div className= "mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="nombre">
                            Nombre:
                        </label>

                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline "
                        id="nombre"
                        type="text"
                        placeholder="Nombre Usuario"
                        value={formik.values.nombre}
                        onChange={formik.handleChange}
                        onBlurCapture={formik.handleBlur}
                        />
                    </div>

                    {formik.touched.nombre && formik.errors.nombre ? (
                        <div className="my-2 bg-yellow-300 border-l-4 border-yellow-600 text-black-500 p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.nombre}</p>
                        </div>
                    ) :  null }
                    
                    <div className= "mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="apellidos">
                            Apellidos:
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline "
                        id="apellidos"
                        type="text"
                        placeholder="Apellido del Usuario"
                        value={formik.values.apellidos}
                        onChange={formik.handleChange}
                        onBlurCapture={formik.handleBlur}
                        />
                    </div>

                    {formik.touched.apellidos && formik.errors.apellidos ? (
                        <div className="my-2 bg-yellow-300 border-l-4 border-yellow-600 text-black p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.apellidos}</p>
                        </div>
                    ) :  null }

                    <div className= "mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
                            Correo Electronico:
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline "
                        id="email"
                        type="email"
                        placeholder="Correo Electronico"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlurCapture={formik.handleBlur}
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
                            Contraseña:
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline "
                        id="password"
                        type="password"
                        placeholder="Contraseña"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlurCapture={formik.handleBlur}
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
                    value="Agregar Usuario"
                    />
                    
                </form>

            </div>
         </div>
         
        </Layout>
    
    </>
    )
}

export default NuevaCuenta;