import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useRef } from "react";
import { GoogleMapContainer } from "./styled";

const containerStyle = {
  width: "100%",
  height: "400px",
};

// Координаты для центрирования карты
const center = { lat: 40.6492453, lng: 47.7261396 };

// Place ID для Goycay Kolleci
const PLACE_ID = "ChIJpVloqIwdMEARDHlCEMhMPAs";

const GoogleMapComponent: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY ?? "",
    libraries: ["places"],
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    const map = mapRef.current;
    const service = new google.maps.places.PlacesService(map);

    service.getDetails({ placeId: PLACE_ID }, (place, status) => {
      if (
        status === google.maps.places.PlacesServiceStatus.OK &&
        place?.geometry?.location
      ) {
        map.setCenter(place.geometry.location);
      }
    });
  }, [isLoaded]);

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <GoogleMapContainer>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      />
    </GoogleMapContainer>
  );
};

export default GoogleMapComponent;
