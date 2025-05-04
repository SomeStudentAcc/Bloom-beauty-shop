/* eslint-disable @typescript-eslint/no-explicit-any */
import {  Map, YMaps } from "@pbe/react-yandex-maps";
import React, { useRef, useState } from "react";
import { MapPin } from "lucide-react";

interface Props {
  setAdress: React.Dispatch<React.SetStateAction<string>>;
  setLongitude: React.Dispatch<React.SetStateAction<string>>;
  setLatitude: React.Dispatch<React.SetStateAction<string>>;
}

export default function CheckoutMap({ setAdress, setLatitude, setLongitude }: Props) {
  const mapRef = useRef<any>(null);
  const [ymaps, setYmaps] = useState<any>(null);
  const [center, setCenter] = useState<[number, number]>([
    41.33706448715841, 69.355573846876,
  ]);

  const handleApiAvailable = (ymapsInstance: any) => {
    setYmaps(ymapsInstance);
  };

  const handleBoundsChange = () => {
    if (mapRef.current && ymaps) {
      const newCenter = mapRef.current.getCenter();
      setCenter(newCenter);
      const [latitude, longitude] = newCenter;
      setLatitude(latitude)
      setLongitude(longitude)
    console.log("Latitude:", latitude, "Longitude:", longitude); 

      ymaps.geocode(newCenter).then((res: any) => {
        const firstGeoObject = res.geoObjects.get(0);
        if (firstGeoObject) {
          const address = firstGeoObject.getAddressLine();
          setAdress(address);
        }
      });
    }
  };

  return (
    <YMaps
      query={{
        apikey: "361b1ec4-0240-4af1-84ca-36d3f29b2701",
        load: "package.full",
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "600px" }}>
        <Map
          defaultState={{
            center: center,
            zoom: 14,
            controls: ["geolocationControl"],
          }}
          width="100%"
          height="100%"
          instanceRef={(ref) => (mapRef.current = ref)}
          onBoundsChange={handleBoundsChange}
          onLoad={handleApiAvailable}
          modules={["geocode"]}
          options={{
            suppressMapOpenBlock: true,
          }}
        />

        {/* Center Location Icon */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -100%)",
            pointerEvents: "none",
            zIndex: 1000,
          }}
        >
          <MapPin size={36} color="red" />
        </div>
      </div>
    </YMaps>
  );
}
