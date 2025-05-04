import { IBranches } from "@/types";
import { Map, YMaps, Placemark } from "@pbe/react-yandex-maps";

interface Props{
    branches: IBranches[]
}


export default function BranchesMap({branches}:Props) {
 

  return (
    <YMaps>
      <div style={{ width: "100%", height: "600px" }}>
        <Map
          defaultState={{ center: [41.33706448715841, 69.355573846876], zoom: 14 }}
          width="100%"
          height="100%"
        >
          {branches.map((location) => (
            <Placemark
              key={location.id}
              geometry={[location.latitude, location.longitude]}
              options={{
                iconLayout: "default#image",
                iconImageHref: "/placeMark.svg", // Ensure this exists in public
                iconImageSize: [50, 50],
                iconImageOffset: [-25, -50],
              }}
              properties={{
                balloonContent: `
                  <div style="padding: 25px; background: white; max-width: 320px; width: 100%; font-family: sans-serif;">
                    <strong>${location.name_ru}</strong><br/>
                    ${location.address_ru}<br/>
                    ${location.phone}
                  </div>
                `,
              }}
              modules={["geoObject.addon.balloon"]}
            />
          ))}
        </Map>
      </div>
    </YMaps>
  );
}
