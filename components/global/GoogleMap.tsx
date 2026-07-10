// components/GoogleMap.tsx
interface GoogleMapProps {
    address?: string;
    lat?: number;
    lng?: number;
    zoom?: number;
    className?: string;
}

const GoogleMap = ({ address, lat, lng, zoom = 15, className = "" }: GoogleMapProps) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    // Determine the location query
    // If lat/lng are provided, we use those; otherwise, we fall back to the address string.
    const locationQuery = (lat && lng)
        ? `${lat},${lng}`
        : encodeURIComponent(address || "");

    const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${locationQuery}&zoom=${zoom}`;
    // const mapSrc = `https://maps.google.com/maps?q=${locationQuery}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;
    if (!apiKey) {
        return <div className="p-4 bg-red-100 text-red-700">API Key Missing</div>;
    }

    return (
        <div className={`w-full h-[300px] rounded-xl overflow-hidden shadow-inner bg-gray-100  ${className}`}>
            <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={mapSrc}
            ></iframe>
        </div>
    );
};

export default GoogleMap;