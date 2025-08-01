import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
// third-party
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// project-imports
import MainCard from '@/components/MainCard';
import ReferenceHeader from '@/components/ReferenceHeader';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 20.5937,
  lng: 78.9629
};

// ===============================|| MAPS - GOOGLE MAP ||============================== //

export default function GoogleMapPage() {
  return (
    <>
    <AppLayout>
            <Head title="Google map" />
      <ReferenceHeader
        caption="Converts an elements content into a svg mini pie donut line or bar chart and is compatible with any browser that supports svg"
        link="https://developers.google.com/maps/documentation/javascript/libraries"
      />
      <MainCard title="Gmap">
        <LoadScript googleMapsApiKey={import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}>
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}>
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </MainCard>
      </AppLayout>
    </>
  );
}
