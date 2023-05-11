
import React from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from 'yup';
import {useQuery, gql} from '@apollo/client';

const QUERY = gql `
query obtenerSitio{
    obtenerSitio{
        id
        rfc
        telf
        direc
        horario
        pag_web
        fb
        ig
        form_pago
        foto_pres
        foto_menu
        foto_lugar
        creado
    }
}

`;


const Login = () => {

    //Obstener sitio de Graphql

    const {data} = useQuery(QUERY);
    console.log(data)

    //Validacion del formulario
    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                        .required('El nombre es obligatorio'),
            apellido: Yup.string()
                        .required('El nombre es apellido'),
            email: Yup.string()
                    .email('El correo es invalido')
                    .required('La constraseña es obligatoria'),
            password:Yup.string()
                        .required('La contraseña es obligatoria')
                        .min(8,'La contraseña debe de ser de al menos 6 caracteres')
        }),
        onSubmit: valores =>{
            console.log('enviado');
            console.log(valores);
        }
    });

    return (
        <>
        <Layout>

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
                        type="nombre"
                        placeholder="Nombre Usuario"
                        value={formik.values.nombre}
                        onChange={formik.handleChange}
                        onBlurCapture={formik.handleBlur}

                        />
                    </div>

                    {formik.touched.nombre && formik.errors.nombre ? (
                        <div className="my-2 bg-yellow-300 border-l-4 border-yellow-600 text-black p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.nombre}</p>
                        </div>
                    ) :  null }
                    
                    <div className= "mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="apellido">
                            Apellido:
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline "
                        id="apellido"
                        type="apellido"
                        placeholder="Apellido del Usuario"
                        value={formik.values.apellido}
                        onChange={formik.handleChange}
                        onBlurCapture={formik.handleBlur}
                        />
                    </div>

                    {formik.touched.apellido && formik.errors.apellido ? (
                        <div className="my-2 bg-yellow-300 border-l-4 border-yellow-600 text-black p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.apellido}</p>
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
                        placeholder="Correo Usuario"
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

export default Login;