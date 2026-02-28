"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix for default marker icons in React-Leaflet
const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
})

type RestaurantMarker = {
    id: string;
    latitude: number | null;
    longitude: number | null;
    name: string;
    category: string;
    image: string | null;
}

function MapBoundsUpdater({ restaurants }: { restaurants: RestaurantMarker[] }) {
    const map = useMap()

    useEffect(() => {
        if (restaurants.length === 0) return

        const validRestaurants = restaurants.filter(
            (r): r is RestaurantMarker & { latitude: number; longitude: number } =>
                r.latitude !== null && r.longitude !== null
        )
        if (validRestaurants.length === 0) return

        const bounds = L.latLngBounds(validRestaurants.map(r => [r.latitude as number, r.longitude as number]))
        map.fitBounds(bounds, { padding: [50, 50] })
    }, [map, restaurants])

    return null
}

export default function MapComponent({ restaurants }: { restaurants: RestaurantMarker[] }) {
    const center = [-6.2088, 106.8456] // Default to Jakarta

    return (
        <MapContainer
            center={center as [number, number]}
            zoom={11}
            style={{ height: "100%", width: "100%", borderRadius: "0.5rem", zIndex: 0 }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapBoundsUpdater restaurants={restaurants} />

            {restaurants.map((restaurant) => {
                if (!restaurant.latitude || !restaurant.longitude) return null

                return (
                    <Marker
                        key={restaurant.id}
                        position={[restaurant.latitude, restaurant.longitude]}
                        icon={icon}
                    >
                        <Popup className="restaurant-popup">
                            <div className="w-[250px] overflow-hidden -m-4">
                                {/* Provide minimal info in the popup to save space, or use the card */}
                                <img src={restaurant.image || ''} alt={restaurant.name} className="w-full h-32 object-cover" />
                                <div className="p-3">
                                    <h3 className="font-bold text-lg mb-1">{restaurant.name}</h3>
                                    <p className="text-sm text-gray-500 mb-2">{restaurant.category}</p>
                                    <a href={`/restaurant/${restaurant.id}`} className="text-emerald-600 font-medium hover:underline text-sm">
                                        View Details &rarr;
                                    </a>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                )
            })}
        </MapContainer>
    )
}
