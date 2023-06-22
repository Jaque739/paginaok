import React, { useState } from 'react';
import axios from 'axios';

const Appi = () => {
  const [places, setPlaces] = useState([]);

// Ingresa tu clave de API de Google Maps aquí
    const apiKey = 'AIzaSyB4DlcsuvJqOOTenfvIo_fF5s0UQKJuaIU';


  const searchPlaces = async () => {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
        params: {
          location: '19.51253904935783,-99.04290294603369',  // Reemplaza con las coordenadas de la ubicación deseada
          radius: 10000,  // Radio de búsqueda en metros
          type: 'school',  // Tipo de lugar que deseas buscar
          key: apiKey,  // Reemplaza con tu clave de API de Google Places
        },
      });

      setPlaces(response.data.results);
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    }
  };

  return (
    <div>
      <button onClick={searchPlaces}>Buscar lugares</button>

      {places.map((place) => (
        <div key={place.id}>
          <h3>{place.name}</h3>
          <p>{place.vicinity}</p>
        </div>
      ))}
    </div>
  );
};

export default Appi;
