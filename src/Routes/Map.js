import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import mockBoulders from '../Data/mockBoulders';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});
const getDifficultyRange = (level) => {
    switch (level) {
        case 'beginner':
            return { minDiff: 1, maxDiff: 3 };
        case 'intermediate':
            return { minDiff: 4, maxDiff: 6 };
        case 'advanced':
            return { minDiff: 7, maxDiff: 10 };
        default:
            return { minDiff: 1, maxDiff: 3 };
    }
};

const filterBoulders = (level) => {
    const { minDiff, maxDiff } = getDifficultyRange(level);
    return mockBoulders.filter(boulder => boulder.rating >= minDiff && boulder.rating <= maxDiff);
};

const MapPage = () => {
    const [level, setLevel] = useState('beginner');
    const [boulders, setBoulders] = useState([]);

    useEffect(() => {
        const fetchBoulders = () => {
            const filteredBoulders = filterBoulders(level);
            setBoulders(filteredBoulders);
        };

        fetchBoulders();
    }, [level]);

    const center = [45.4642, 9.19];

    return (
        <div>
            <h1>Select Your Level</h1>
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
            </select>
            <MapContainer center={center} zoom={13} style={{ height: "500px", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {boulders.map((boulder) => (
                    <Marker key={boulder.id} position={[boulder.latitude, boulder.longitude]}>
                        <Popup>
                            <strong>{boulder.name}</strong><br/>
                            Grade: {boulder.rating}<br/>
                            Location: {boulder.location.join(', ')}
                            <img src={boulder.imageUrl} alt={boulder.name} style={{width: '100px', height: '100px'}}/>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapPage;
