import React, {useState} from "react";
import { useRouter } from 'next/router';
import { useFormik } from "formik";
import * as Yup from 'yup';
import {useMutation, gql} from '@apollo/client';

const NUEVO_MENASAJE = gql `
mutation nuevoContacto($input: ContactosInput){
    nuevoContacto (input: $input){
      nombre
      email
      telefono
      mensaje
    }
    
  }
`;

const NuevoContacto = () => {
    //State pata el mensaje 

    const [mensaje, gudardarMensaje] = useState(null)

    //Mutation para crear nuevor usuarios
    const [nuevoContacto] = useMutation(NUEVO_MENASAJE);

    //Routing

    const router = useRouter();

    //Validacion del formulario
    const formik = useFormik({
        initialValues: {
            nombre: '',
            email: '',
            telefono: '',
            mensaje: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                        .required('El nombre es obligatorio'),           
            email: Yup.string()
                    .email('El correo es invalido')
                    .required('La email es obligatoria'), 
            telefono:Yup.string()
                        .required('El telefono no puede estar vacio')
                        .min(10,'El telefono debe de ser de al menos 10 caracteres'),
            mensaje: Yup.string()
                        .required('El mensaje es obligatoria')
        }),
        onSubmit:  async valores =>{
            //console.log('enviado');
           console.log(valores);
        const {nombre, email, telefono, mensaje} = valores


            try {
              const {data} = await nuevoContacto ({
                    variables : {
                        input: {
                            nombre,
                            email,
                            telefono,
                            mensaje

                        }
                    }
                });
                console.log(data);

                //Usuario creado correctamente
                gudardarMensaje(`Se mando el mensaje conrrectamente: ${data.nuevoContacto.nombre}`);

                setTimeout(() =>{
                    gudardarMensaje(null);
                    router.push('/')
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
       
            {mensaje && mostrarMensaje() }

         <h1 className="text-center text-2xl text-black font-light">Enviar mensaje</h1>   

         <div className="flex justify-center mt-5">
            <div className="w-full max-w-sm">
                <form className="bg-green-300 rounded shadow-md px-8 pt-6 pb-8 mb-4"
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
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="telefono">
                            Telefono:
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline "
                        id="telefono"
                        type="text"
                        placeholder="Ejemplo. 55-55-55-55-55"
                        value={formik.values.telefono}
                        onChange={formik.handleChange}
                        onBlurCapture={formik.handleBlur}
                        />
                    </div>

                    {formik.touched.telefono && formik.errors.telefono ? (
                        <div className="my-2 bg-yellow-300 border-l-4 border-yellow-600 text-black p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.telefono}</p>
                        </div>
                    ) :  null }

                    <div className= "mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="mensaje">
                            Mesaje: 
                        </label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline "
                        id="mensaje"
                        type="text"
                        placeholder="Mesaje"
                        value={formik.values.mensaje}
                        onChange={formik.handleChange}
                        onBlurCapture={formik.handleBlur}
                        />
                    </div>

                    {formik.touched.mensaje && formik.errors.mensaje ? (
                        <div className="my-2 bg-yellow-300 border-l-4 border-yellow-600 text-black p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.mensaje}</p>
                        </div>
                    ) :  null }
                    <input
                    type="submit"
                    className="bg-white w-full mt-5 p-2 text-black uppercas hover:bg-gray-300"
                    value="Enviar Mensaje"
                    />
                    
                </form>

            </div>
         </div>
         
      
    
    </>
    )
}

export default NuevoContacto;