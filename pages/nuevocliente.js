import React, {useState} from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from 'yup';
import {gql, useMutation} from "@apollo/client";
import {useRouter} from 'next/router' 

const NUEVO_USUARIO = gql `
mutation nuevoUsuario($input: UsuarioInput){
     nuevoUsuario (input: $input) {
         id
         nombre
         apellido
         telefono
         email
         us
         contra
     }
   }
 `;

 const OBTENER_USUARIO = gql `
query ObtenerusuariosVendedor{
    obtenerUsuariosVendedor {
      id
      nombre
      apellido
      telefono
      email
      us
      contra
    }
  }

`;

const NuevoUsuario= () => {

    const router = useRouter();
    const [mensaje, gudardarMensaje] = useState(null);
    
    //Mutation para crear nuevos Usuarios
const [ nuevoUsuario ] = useMutation(NUEVO_USUARIO, {
    update(cache, { data : { nuevoUsuario}}) {
        //Obtener el objeto de cache que deseamos actualizar
        const {obtenerUsuariosVendedor} = cache.readQuery ({query: OBTENER_USUARIO });

        //Rescribir el cache (el cache nunca se debe modificar)
        cache.writeQuery ({
            query: OBTENER_USUARIO,
            data: {
                obtenerUsuariosVendedor : [...obtenerUsuariosVendedor, nuevoUsuario]
            }
        })

    }
})
  
    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            telefono: '',
            email: '',
            us: '',
            contra: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                        .required('El nombre del cliente es obligatorio'),
            apellido: Yup.string()
                        .required('El apellido del cliente es obligatorio'),
            telefono: Yup.string()
                        .required('El telefono del cliente es obligatorio'),
            email: Yup.string()
                        .email('Email no válido')
                        .required('El email del cliente es obligatorio'),
                        
            us: Yup.string()
                        .required('El nombre del usuario es obligatorio'),
            contra: Yup.string()
                        .required('La contraseña del cliente es obligatorio'),
            
        }),
        onSubmit: async valores => {
            //console.log(valores)
            const {nombre, apellido, telefono, email, us, contra} = valores

             try {
                 const {data} = await nuevoUsuario({
                     variables:{
                         input: {
                             nombre,
                             apellido,
                             telefono,
                             email,
                             us,
                             contra
                         }
                     }

                 });

                // console.log(data.nuevoUsuario);

                gudardarMensaje(`Se creo Correctamente el Usuario: ${data.nuevoUsuario.nombre}`);

                setTimeout(() =>{
                    gudardarMensaje(null);
                    router.push('/clientes'); //redireccionar hacia clientes
                }, 2000);

               
            } catch (error) {
                gudardarMensaje(error.message.replace('undefined', ''));
                 //console.log(error);
                 setTimeout(() =>{
                    gudardarMensaje(null);
                }, 2000)
                
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

    return(
        <Layout>
            <h1>Nuevo Usuario</h1>
            {mensaje && mostrarMensaje() }
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                    onSubmit={formik.handleSubmit}>
                        

                    <div className= "mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="nombre">
                            Nombre
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline "
                        id="nombre"
                        type="text"
                        placeholder="Nombre Usuario"
                        onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       value={formik.values.nombre}
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
                            Apellido
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline "
                        id="apellido"
                        type="text"
                        placeholder="Apellido Usuario"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.apellido}
                        />
                    </div>

                    {formik.touched.apellido && formik.errors.apellido ? (
                        <div className="my-2 bg-yellow-300 border-l-4 border-yellow-600 text-black p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.apellido}</p>
                        </div>
                    ) :  null }

                    <div className= "mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="telefono">
                            Telefono
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline "
                        id="telefono"
                        type="text"
                        placeholder="55 4036 9578"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.telefono}
                        />
                    </div>

                    {formik.touched.telefono && formik.errors.telefono ? (
                        <div className="my-2 bg-yellow-300 border-l-4 border-yellow-600 text-black p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.telefono}</p>
                        </div>
                    ) :  null }

                    <div className= "mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline "
                        id="email"
                        type="email"
                        placeholder="correo@gmail.com"
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
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="Us">
                            Usuario
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline "
                        id="us"
                        type="text"
                        placeholder="Usuario"
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
                        placeholder="Contraseña Usuario"
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
                        type= "submit"
                        className= "bg-gray-800 w-full mt-5 p-2 text-white uppercase fond-bold hover:bg-gray-500"
                        value="Registrar Cliente"
                    />

                    </form>

                </div>

            </div>
        </Layout>
    );
}

export default NuevoUsuario;