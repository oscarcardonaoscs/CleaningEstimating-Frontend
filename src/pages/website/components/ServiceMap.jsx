import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const clientLocations = [
  {
    name: "Athens Area (Silent Spring & Estate Dr)",
    coords: [34.776, -86.934],
    radius: 1200,
  },
  {
    name: "Owens Cross Roads (Talbot, Barlow, Magnolia Park, Nathan Dr)",
    coords: [34.6305, -86.483],
    radius: 1200,
  },
  {
    name: "Harvest Area (Kelso, Shortleaf, Sunlit Grove)",
    coords: [34.792, -86.7505],
    radius: 1200,
  },
  {
    name: "Huntsville SE (Willowbrook, Whitesburg, Bailey Cove)",
    coords: [34.673, -86.547],
    radius: 1300,
  },
  {
    name: "Huntsville Central (Bob Wallace, Monarch Dr, Westmoreland)",
    coords: [34.7105, -86.595],
    radius: 1000,
  },
  {
    name: "Huntsville NE (Arbor Dr, Pennington, Bridgestone, Gillespie)",
    coords: [34.793, -86.57],
    radius: 1200,
  },
  {
    name: "Brownsboro Area (Bob Hunt Rd)",
    coords: [34.739, -86.466],
    radius: 500,
  },
  {
    name: "Madison - Crysillas Dr, Rolphmire Ln Cluster",
    coords: [34.7801, -86.7512],
    radius: 800,
  },
  {
    name: "Madison - Summer Pointe Cluster",
    coords: [34.7832, -86.7427],
    radius: 800,
  },
  {
    name: "Madison - Schrimsher, Minden, Greenwood, Cliftworth, Mahalo",
    coords: [34.72, -86.755],
    radius: 1200,
  },
  {
    name: "Madison - Tanager, Abington Cv, Clover Ridge",
    coords: [34.725, -86.765],
    radius: 1000,
  },
  {
    name: "Huntsville SW - Herrick Dr",
    coords: [34.6449, -86.623],
    radius: 600,
  },
];

export default function ServiceMap() {
  return (
    <section className="py-12 bg-white text-center">
      <h2 className="text-3xl font-bold mb-4">Service Coverage</h2>
      <p className="mb-6 px-4">
        These are general areas where our clients are located. We may already
        serve near you!
      </p>
      <div className="h-[500px] max-w-6xl mx-auto px-4">
        <MapContainer
          center={[34.75, -86.7]}
          zoom={10}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {clientLocations.map((loc, idx) => (
            <Circle
              key={idx}
              center={loc.coords}
              radius={loc.radius}
              pathOptions={{
                fillColor: "#2dd4bf", // verde-aqua
                color: "#14b8a6", // borde un poco más oscuro
                fillOpacity: 0.4,
              }}
            >
              <Popup>{loc.name}</Popup>
            </Circle>
          ))}
        </MapContainer>
      </div>
    </section>
  );
}
