import React, { useState, useEffect } from 'react';
import mockBoulders from '../Data/mockBoulders'; // Adjust the path as needed

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

const BoulderList = ({ boulders }) => {
    return (
        <div>
            <h2>Boulder Routes</h2>
            <ul>
                {boulders.map((boulder) => (
                    <li key={boulder.id}>
                        <strong>{boulder.name}</strong><br />
                        Grade: {boulder.rating}<br />
                        Location: {boulder.location.join(', ')}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Boulders = () => {
    const [level, setLevel] = useState('beginner');
    const [boulders, setBoulders] = useState([]);

    useEffect(() => {
        const fetchBoulders = () => {
            const filteredBoulders = filterBoulders(level);
            setBoulders(filteredBoulders);
        };

        fetchBoulders();
    }, [level]);

    return (
        <div>
            <h1>Select Your Level</h1>
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
            </select>
            <BoulderList boulders={boulders} />
        </div>
    );
};

export default Boulders;
