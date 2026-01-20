import React from 'react';

const Title = ({title, description}) => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-700 mb-2">{title}</h2>
            <p className="text-gray-600 mb-8">{description}</p>
        </div>
    );
};

export default Title;