

import React from 'react';
import './CelebCard.css';


const CelebCard = ({ celebImage, celebName, celebRole }) => {
    return (
        <div className='celebcard'>
            {celebImage && <img src={celebImage} alt={celebName} width={200} height={200} />}
            <h3>{celebName}</h3>
            <h4>{celebRole}</h4>
        </div>
    );
};

export default CelebCard;
