// import React, { useEffect, useState } from 'react'
// import './CelebCard.css'
// import axios from 'axios'

// const CelebCard = () => {
//     const [data, setData] = useState({});

//     useEffect(() => {
//         axios.get('http://127.0.0.1:4000/page/addcelebtomovie')
//             .then((res) => {
//                 setData(res.data);
//             })
//             .catch((error) => {
//                 console.error("Error fetching data:", error);
//             });
//     }, []);

//     return (
//         <div className='celebcard'>
//             {data.celebImage && <img src={data.celebImage} alt={data.celebName} width={200} height={200} />}
//             <h3>{data.celebName}</h3>
//             <h4>{data.celebRole}</h4>
//         </div>
//     );
// }

// export default CelebCard;

import React, { useEffect, useState } from 'react';
import './CelebCard.css';
import axios from 'axios';

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
