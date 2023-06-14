import React from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import {  useMutation, gql} from '@apollo/client';
import Layout2 from '../components/Layout2';
import { useFormik } from "formik";
import * as Yup from 'yup';

const NUEVO_SITIO = gql `
mutation nuevoSitio($input: SitioInput) {
  nuevoSitio(input: $input) {
    nombre
    rfc
    telf
    horario
    direc
    pag_web
    fb
    ig
    form_pago
    foto_pres
    foto_menu
    foto_lugar
  }
}
`;



const  MiSitio = () => {

    //Mutation para crear nuevos sitios
    const [nuevoSitio] = useMutation(NUEVO_SITIO);

    //Routing
    const router = useRouter();

    //Validacion del formulario
    const formik = useFormik({
      initialValues: {
        nombre: '',
        rfc: '',
        telf: '',
        horario: '',
        direc: '',
        pag_web: '',
        fb: '',
        ig: '',
        form_pago: 'url',
        foto_pres: 'url',
        foto_menu: 'url',
        foto_lugar: 'url'
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
                  .required('El nombre es obligatorio'),
      rfc: Yup.string() 
              .min(12,'El RFC debe de tener como minimo 12 caracteres.')
              .max(13,'El RFC debe de tener como maximo 13 caracteres.'),          
      telf: Yup.string()
              .required('El telefono es obligatorio'), 
      horario:Yup.string()
                  .required('El horario es obligatorio'),
      direc: Yup.string()
                  .required('La dirección es obligatoria'),
      pag_web: Yup.string(),
      fb: Yup.string(),
      ig: Yup.string(),
      form_pago: Yup.string(),
      foto_pres: Yup.string(),
      foto_menu: Yup.string(),
      foto_lugar: Yup.string(),             
                 
  }),
  onSubmit: async valores =>  {
    //console.log (valores)
      const {nombre, rfc, telf, horario, direc,pag_web, fb, ig, form_pago, foto_lugar, foto_menu, foto_pres} = valores
      //console.log(valores)
    try { 
      const {data} = await nuevoSitio({
        variables: {
          input: {
            nombre,
            rfc,
            telf,
            horario, 
            direc,
            pag_web, 
            fb, 
            ig, 
            form_pago, 
            foto_lugar, 
            foto_menu,
             foto_pres
          }
        }
      });
      console.log(data.nuevoSitio); 
      
    } catch (error) {
      
    }
  }

    })

    // Ingresa tu clave de API de Google Maps aquí
    const apiKey = 'AIzaSyCj3ZWDxruMqMWbgVZ9CKFfdvC3_dSv-d4';

    // Define las coordenadas del lugar que deseas mostrar
    const location = {
        lat: 19.51253904935783,
        lng: -99.04290294603369

         
    };


    return (
        <Layout2>

            <form
            onSubmit={formik.handleSubmit}>
      <div className="space-y-12">

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900 ml-10">Perfil del Sitio</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600 ml-10">
          Esta información se mostrará públicamente, así que tenga cuidado con lo que comparte.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900 ml-10">
                Foto del Sitio 
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Agregar
                </button>
              </div>
           
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900 ml-10">Informacion del sitio </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600 ml-10">Agrega tola la informacion más reciente de tu sitio.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ml-10">
            <div className="sm:col-span-2">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Nombre del sitio
              </label>
              <div className="mt-2">
                <input
                  className="block w-full rounded-md border border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="text"
                  id="nombre"
                  placeholder="   Nombre del sitio"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlurCapture={formik.handleBlur}
                />
              </div>
            </div>

            {formik.touched.nombre && formik.errors.nombre ? (
                        <div className="my-2 bg-yellow-300 border-l-4 border-yellow-600 text-black-500 p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.nombre}</p>
                        </div>
                    ) :  null }

            <div className="sm:col-span-2">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                RFC
              </label>
              <div className="mt-2">
                <input
                  className="block w-full rounded-md border border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="text"
                  id="rfc"
                  placeholder="   Ejem: LOMP8206281HO"
                  value={formik.values.rfc}
                  onChange={formik.handleChange}
                  onBlurCapture={formik.handleBlur}
                />
              </div>
            </div>

            {formik.touched.rfc && formik.errors.rfc ? (
                        <div className="my-2 bg-yellow-300 border-l-4 border-yellow-600 text-black-500 p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.rfc}</p>
                        </div>
                    ) :  null }

            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Telefono
              </label>
              <div className="mt-2">
                <input
                  className="block w-full rounded-md border border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  id="telf"
                  type="text"
                  placeholder="   Ejem: 55-68-21-41-86"
                  value={formik.values.telf}
                  onChange={formik.handleChange}
                  onBlurCapture={formik.telf}
                />
              </div>
            </div>
            
            {formik.touched.telf && formik.errors.telf ? (
                        <div className="my-2 bg-yellow-300 border-l-4 border-yellow-600 text-black-500 p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.telf}</p>
                        </div>
                    ) :  null }

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Horarios
              </label>
              <div className="mt-2">
                <input
                  className="block w-full rounded-md border border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="text"
                  id="horario"
                  placeholder="   Ejem: Lun - Vie: 9AM a 20PM y Sab - Dom 10AM a 17PM. (Agregar todos tus horarios que tenga)."
                  value={formik.values.horario}
                  onChange={formik.handleChange}
                  onBlurCapture={formik.horario}
                />
              </div>
            </div>
            
            {formik.touched.horario && formik.errors.horario ? (
                        <div className="my-2 bg-yellow-300 border-l-4 border-yellow-600 text-black-500 p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.horario}</p>
                        </div>
                    ) :  null }

            <div className="sm:col-span-2">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Pag web
              </label>
              <div className="mt-2">
                <input
                  className="block w-full rounded-md border border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="text"
                 id="pag_web"
                 placeholder="   Enlace de tu pagina web."
                  value={formik.values.pag_web}
                  onChange={formik.handleChange}
                  onBlurCapture={formik.pag_web}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Facebook
              </label>
              <div className="mt-2">
                <input
                  className="block w-full rounded-md border border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="text"
                  id="fb"
                  placeholder="   Enlace de tu Facebook."
                  value={formik.values.fb}
                  onChange={formik.handleChange}
                  onBlurCapture={formik.fb}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Instagram
              </label>
              <div className="mt-2">
                <input
                  className="block w-full rounded-md border border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type="text"
                  id="ig"
                  placeholder="   Enlace de tu Instagram."
                  value={formik.values.ig}
                  onChange={formik.handleChange}
                  onBlurCapture={formik.ig}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Direccion del sitio
              </label>
              <div className="mt-2">
                <input
                  className="block w-full rounded-md border border-gray-400 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  type=" text"
                  id="direc"
                  placeholder="  Agregar tu dirección completa ."
                  value={formik.values.direc}
                  onChange={formik.handleChange}
                  onBlurCapture={formik.direc}
                />
              </div>
            </div>

            {formik.touched.direc && formik.errors.direc ? (
                        <div className="my-2 bg-yellow-300 border-l-4 border-yellow-600 text-black-500 p-4">
                            <p className="font-bold">Error</p>
                            <p>{formik.errors.direc}</p>
                        </div>
                    ) :  null }

            <div className="col-span-full">
            <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Formas de pago</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Selecciona las formas de pago con las cuentas en tu sitio</p>
            <fieldset>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      id="comments"
                      name="comments"
                      type="checkbox"
                      
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="comments" className="font-medium text-gray-900">
                      Efectivo
                    </label>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="candidates" className="font-medium text-gray-900">
                      Tarjerta debito/credito
                    </label>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="offers" className="font-medium text-gray-900">
                      Tranferencias
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
         </div>


            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Agrega tus fotos del lugar 
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Carga tus fotos</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">o arrastrar y soltar</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF hasta 10MB</p>
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Agrega tus fotos de tu monu o articulos con los que cuentas 
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Carga tus fotos</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">o arrastrar y soltar</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF hasta 10MB</p>
                </div>
              </div>
            </div>


            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Agrega tus fotos de los presios 
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Carga tus fotos</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">o arrastrar y soltar</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF hasta 10MB</p>
                </div>
              </div>
            </div>


          </div>
        </div>

     
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900 ">
          Cancelar
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Guardar
        </button>
      </div>
    </form>
            <div className='flex justify-center'>
                <LoadScript googleMapsApiKey={apiKey}>
                    <GoogleMap
                        mapContainerStyle={{ height: '600px', width: '72%' }}
                        zoom={13}
                        center={location}
                    >
                        <Marker position={location} />
                    </GoogleMap>
                </LoadScript>
            </div>
        </Layout2>
    
  )
}

export default MiSitio;
