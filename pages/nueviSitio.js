import React, {useState} from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import {  useMutation, gql} from '@apollo/client';
import Layout2 from '../components/Layout2';
import { useFormik } from "formik";
import * as Yup from 'yup';
import Link from 'next/Link.js';
import Appi from '../components/appi';
import Fotos from '../components/Fotos';

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
    pueblos
    form_pago
    foto_pres
    foto_menu
    foto_lugar
  }
}
`;



const  NuevoSitio = () => {

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
        pueblos: '',
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
      pueblos: Yup.string()
                  .required('El nombre del pueblo magico es obligatoria'),
                 
                 
  }),
  onSubmit: async valores =>  {
    //console.log (valores)
      const {nombre, rfc, telf, horario, direc,pag_web, fb, ig, pueblos, form_pago, foto_lugar, foto_menu, foto_pres} = valores
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
            pueblos,
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
    const apiKey = 'AIzaSyCpd8huJdCjVTMOww5HWXP1-aYW-jzGdB0';

    // Define las coordenadas del lugar que deseas mostrar
    const location = {
        lat: 19.51253904935783,
        lng: -99.04290294603369

         
    };

    const cancelar = () => {
      router.push({
          pathname:"/principalClientes"
      })
  }

    return (
        <Layout2>
          <div className='bg-gray-00 text-center text-white text-4xl  pt-5 pb-5 '  id='Inicio' >______________</div>
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

            <div className="sm:col-span-3">
              <label htmlFor="pueblos" className="block text-sm font-medium leading-6 text-gray-900">
                Pueblo magico donde se encuentra tu sitio:
              </label>
              <div className="mt-2">
                <select
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  id="pueblos"
                  name="pueblos"
                  value={formik.values.pueblos}
                  onChange={formik.handleChange}
                  onBlurCapture={formik.pueblos}
                  
                  
                >
                  <option>Selecciona una opción</option>
                  <option>Aculco, Estado de México</option>
                  <option>Ajijic, Jalisco</option>
                  <option>Álamos, Sonora</option>
                  <option>Amealco de Bonfil, Querétaro</option>
                  <option>Aquismón, San Luis Potosí</option>
                  <option>Arteaga, Coahuila</option>
                  <option>Atlixco, Puebla</option>
                  <option>Bacalar, Quintana Roo</option>
                  <option>Batopilas, Chihuahua</option>
                  <option>Bernal, Querétaro</option>
                  <option>Bustamante, Nuevo León</option>
                  <option>Cadereyta de Montes, Querétaro</option>
                  <option>Calvillo, Aguascalientes</option>
                  <option>Candela, Coahuila</option>
                  <option>Capulálpam de Méndez, Oaxaca</option>
                  <option>Casas Grandes, Chihuahua</option>
                  <option>Chiapa de Corzo, Chiapas</option>
                  <option>Chignahuapan, Puebla</option>
                  <option>Cholula, Puebla</option>
                  <option>Coatepec, Veracruz</option>
                  <option>Comala, Colima</option>
                  <option>Comitán, Chiapas</option>
                  <option>Comonfort, Guanajuato</option>
                  <option>Compostela de Indias, Nayarit</option>
                  <option>Cosalá, Sinaloa</option>
                  <option>Coscomatepec, Veracruz</option>
                  <option>Creel, Chihuahua</option>
                  <option>Cuatro Ciénegas, Coahuila</option>
                  <option>Cuetzalan del Progreso, Puebla</option>
                  <option>Cuitzeo del Porvenir, Michoacán</option>
                  <option>Dolores Hidalgo, Guanajuato</option>
                  <option>El Oro, Estado de México</option>
                  <option>El Rosario, Sinaloa</option>
                  <option>El Fuerte, Sinaloa</option>
                  <option>Huamantla, Tlaxcala</option>
                  <option>Huasca de Ocampo, Hidalgo</option>
                  <option>Huauchinango, Puebla</option>
                  <option>Huautla de Jiménez, Oaxaca</option>
                  <option>Huichapan, Hidalgo</option>
                  <option>Isla Aguada, Campeche</option>
                  <option>Isla Mujeres, Quintana Roo</option>
                  <option>Ixtapan de la Sal, Estado de México</option>
                  <option>Izamal, Yucatán</option>
                  <option>Jala, Nayarit</option>
                  <option>Jalpa de Cánovas, Guanajuato</option>
                  <option>Jalpan de Serra, Querétaro</option>
                  <option>Jerez de García Salinas, Zacatecas</option>
                  <option>Jiquilpan de Juárez, Michoacán</option>
                  <option>Lagos de Moreno, Jalisco</option>
                  <option>Linares, Nuevo León</option>
                  <option>Loreto, Baja California Sur</option>
                  <option>Magdalena de Kino, Sonora</option>
                  <option>Malinalco, Estado de México</option>
                  <option>Maní, Yucatán</option>
                  <option>Mapimí, Durango</option>
                  <option>Mascota, Jalisco</option>
                  <option>Mazamitla, Jalisco</option>
                  <option>Mazunte, Oaxaca</option>
                  <option>Melchor Múzquiz, Coahuila</option>
                  <option>Metepec, Estado de México</option>
                  <option>Mexcaltitán, Nayarit</option>
                  <option>Mier, Tamaulipas</option>
                  <option>Mineral de Angangueo, Michoacán</option>
                  <option>Mineral de Pozos, Guanajuato</option>
                  <option>Mineral del Chico, Hidalgo</option>
                  <option>Mocorito, Sinaloa</option>
                  <option>Nombre de Dios, Durango</option>
                  <option>Nochistlán de Mejía, Zacatecas</option>
                  <option>Pahuatlán, Puebla</option>
                  <option>Palenque, Chiapas</option>
                  <option>Palizada, Campeche</option>
                  <option>Papantla, Veracruz</option>
                  <option>Paracho de Verduzco, Michoacán</option>
                  <option>Parras de la Fuente, Coahuila</option>
                  <option>Pátzcuaro, Michoacán</option>
                  <option>Pinos, Zacatecas</option>
                  <option>Real de Asientos, Aguascalientes</option>
                  <option>Real de Catorce, San Luis Potosí</option>
                  <option>Real de Monte, Hidalgo</option>
                  <option>Salvatierra, Guanajuato</option>
                  <option>San Cristóbal de las Casas, Chiapas</option>
                  <option>San Joaquín, Querétaro</option>
                  <option>San José de Gracia, Aguascalientes</option>
                  <option>San Juan Teotihuacán y San Martín de las Pirámides, Edo de México</option>
                  <option>San Pablo Villa de Mitla, Oaxaca</option>
                  <option>San Pedro Tlaquepaque, Jalisco</option>
                  <option>San Pedro y San Pablo Teposcolula, Oaxaca</option>
                  <option>San Sebastián del Oeste, Jalisco</option>
                  <option>Santa Catarina Juquila, Oaxaca</option>
                  <option>Santa Clara del Cobre, Michoacán</option>
                  <option>Santa María del Río, San Luis Potosí</option>
                  <option>Santiago, Nuevo León</option>
                  <option>Sayulita, Nayarit</option>
                  <option>Sisal, Yucatán</option>
                  <option>Sombrerete, Zacatecas</option>
                  <option>Tacámbaro, Michoacán</option>
                  <option>Talpa de Allende, Jalisco</option>
                  <option>Tapalpa, Jalisco</option>
                  <option>Tapijulapa, Tabasco</option>
                  <option>Taxco de Alarcón, Guerrero</option>
                  <option>Tecate, Baja California</option>
                  <option>Tecozautla, Hidalgo</option>
                  <option>Tepotzotlán, Estado de México</option>
                  <option>Tepoztlán, Morelos</option>
                  <option>Tequila, Jalisco</option>
                  <option>Tequisquiapan, Querétaro</option>
                  <option>Tetela de Ocampo, Puebla</option>
                  <option>Teúl de González Ortega, Zacatecas</option>
                  <option>Tlatlauquitepec, Puebla</option>
                  <option>Tlayacapan, Morelos</option>
                  <option>Tlalpujahua de Rayón, Michoacán</option>
                  <option>Tlaxco, Tlaxcala</option>
                  <option>Todos Santos, Baja California Sur</option>
                  <option>Tonatico, Estado de México</option>
                  <option>Tula, Tamaulipas</option>
                  <option>Tulum, Quintana Roo</option>
                  <option>Tzintzuntzan, Michoacán</option>
                  <option>Valladolid, Yucatán</option>
                  <option>Valle de Bravo, Estado de México</option>
                  <option>Viesca, Coahuila</option>
                  <option>Villa del Carbón, Estado de México</option>
                  <option>Xico, Veracruz</option>
                  <option>Xicotepec, Puebla</option>
                  <option>Xilitla, San Luis Potosí</option>
                  <option>Yuriria, Guanajuato</option>
                  <option>Zacatlán de las Manzanas, Puebla</option>
                  <option>Zempoala, Hidalgo</option>
                  <option>Zimapán, Hidalgo</option>
                  <option>Zozocolco de Hidalgo, Veracruz</option>

                </select>
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
                      name="efectivo"
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
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      id="candidates"
                      name="tarjeta"
                      type="checkbox"
                  

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
                      name="transferencia"
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
                     {/* <Fotos></Fotos> */}
                
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
                Agrega tus fotos de los precios 
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

      <div>
      <Link href={"/principalClientes"} 
      className='rounded-md bg-red-600 border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
       Cancelar </Link>
      </div>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Guardar
        </button>
      </div>
    </form>
         
            <div className='flex justify-center'>
                {/* <LoadScript googleMapsApiKey={apiKey}>
                    <GoogleMap
                        mapContainerStyle={{ height: '600px', width: '72%' }}
                        zoom={13}
                        center={location}
                    >
                        <Marker position={location} />
                    </GoogleMap>
                </LoadScript> */}
            <Appi></Appi>

            </div>
        </Layout2>
    
  )
}

export default NuevoSitio;
