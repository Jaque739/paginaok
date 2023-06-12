import React from 'react'
import { useRouter } from 'next/router'; 
import Layout from '../../components/Layout';
import { useQuery, gql, useMutation} from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';


const OBTENER_CLIENTE = gql`
query obtenerUsuario($id: ID!){
  obtenerUsuario(id: $id){
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

const ACTUALIZAR_USUARIO = gql`
mutation actualizarUsuarios($id: ID!, $input: UsuarioInput){
  actualizarUsuarios(id: $id, input: $input){
    nombre
    us
  }
}

`;



const EditarUsuario = () =>{
//obtener la Id actual
const router = useRouter();
const {query: {pid: id}} = router;
//console.log(id)

const {data, loading, error} = useQuery(OBTENER_CLIENTE, {
    variables: {
        id
    }
});
// console.log(data)
//  console.log(loading)
//  console.log(error)

//Actualizar el usuario 

const [actualizarUsuarios] = useMutation (ACTUALIZAR_USUARIO);

//SCHEMA DE VALIDACION

const schemaValidacion = Yup.object({
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
    
});

if(loading) return 'Cargando.....';

//Consultar para obtener el usuario
//console.log(data.obtenerUsuario.id);

const {obtenerUsuario}  = data;
console.log("Datos del usuario: ",obtenerUsuario)

//Modifica el cliente de la BD

const actualizarInfoUsuarios = async valores => {
    // console.log("Datos para actualizar: ",valores);
    // const {nombre, apellido, telefono,email,us,contra} = valores;


try {
    console.log("Datos para actualizar: ",valores);
    const {nombre, apellido, telefono,email,us,contra} = valores;
    const {data} =  await actualizarUsuarios ({
        variables: {
            id,
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
    console.log(data);

    //Mostrar alerta 
    Swal.fire(
        'Actualizado',
        'El cliente se actualizó correctamente',
        'success'
      )
    //TODO: Redireccionar
    router.push('/clientes');

} catch (error) {
    console.log(error);
}
}

return(
    <Layout>
       <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

                    <Formik
                        validationSchema = { schemaValidacion }
                        enableReinitialize
                        initialValues={ obtenerUsuario }
                        onSubmit={(valores) => {
                        //console.log(valores)
                       
                        actualizarInfoUsuarios(valores)
                        
                        }}
                    >
                        {props => {
                            // console.log("Datos del formulario",props);
                            return (

                          
                                <form className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={props.handleSubmit}
                            >
                                    

                                <div className= "mb-4">
                                <label className="block text-black text-sm font-bold mb-2" htmlFor="nombre">
                                        Nombre
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline "
                                    id="nombre"
                                    type="text"
                                    placeholder="Nombre Usuario"
                                    value={props.values.nombre}
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    
                                    />
                                </div>
                                {props.touched.nombre && props.errors.nombre ? (
                                    <div className="my-2 bg-yellow-300 border-l-4 border-yellow-600 text-black p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.nombre}</p>
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
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.apellido}
                                    />
                                </div>
                                
                                {props.touched.apellido && props.errors.apellido ? (
                                    <div className="my-2 bg-yellow-300 border-l-4 border-yellow-600 text-black p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.apellido}</p>
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
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.telefono}
                                    />
                                </div>

                                {props.touched.telefono && props.errors.telefono ? (
                                    <div className="my-2 bg-yellow-300 border-l-4 border-yellow-600 text-black p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.telefono}</p>
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
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.email}
                                    />
                                </div>

                                {props.touched.email && props.errors.email ? (
                                    <div className="my-2 bg-yellow-300 border-l-4 border-yellow-600 text-black p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.email}</p>
                                    </div>
                                ) :  null }

                                <div className= "mb-4">
                                    <label className="block text-black text-sm font-bold mb-2" htmlFor="us">
                                        Usuario
                                    </label>
                                    <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline "
                                    id="us"
                                    type="text"
                                    placeholder="Usuario"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.us}
                                    />
                                </div>

                                {props.touched.us && props.errors.us ? (
                                    <div className="my-2 bg-yellow-300 border-l-4 border-yellow-600 text-black p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.us}</p>
                                    </div>
                                ) :  null }

                                <div className= "mb-4">
                                    <label className="block text-black text-sm font-bold mb-2" htmlFor="contra">
                                        Contraseña
                                    </label>
                                    <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline "
                                    id="contra"
                                    type="text"
                                    placeholder="Contraseña Usuario"
                                    onChange={props.handleChange} 
                                    onBlur={props.handleBlur}
                                    value={props.values.contra}
                                    />
                                </div>
                                
                                {props.touched.contra && props.errors.contra ? (
                                    <div className="my-2 bg-yellow-300 border-l-4 border-yellow-600 text-black p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.contra}</p>
                                    </div>
                                ) :  null }

                                <input
                                    type= "submit"
                                    className= "bg-gray-800 w-full mt-5 p-2 text-white uppercase fond-bold hover:bg-gray-500"
                                    value="Editar Cliente"
                                />

                                </form>
                      )
                    }}
                    </Formik>
                </div>

            </div>
    </Layout>
);

}

export default EditarUsuario;