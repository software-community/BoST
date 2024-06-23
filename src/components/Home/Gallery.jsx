import React from 'react';
import { getAllImages } from '@/app/actions/GalleryData';

const Gallery = async() => {
   
    const arr=await getAllImages(process.env.SUPER_ADMIN)
    const mainStyle = {
        paddingBottom: '32px'
    };

    const containerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(395px, 1fr))',


    };

    const imgStyle = {
        width: '100%',
        height: '300px',
        objectPosition:'center',
        objectFit: 'cover',
    };

    return (
        <div className='mt-12' style={mainStyle}>
            <h1 className='text-4xl sm:text-5xl font-bold text-center mb-8'>Gallery</h1>
            <div style={containerStyle}>
                {arr.map((item, index) => (
                    <div key={index} className='content'>
                        <img src={item.url} alt={`Gallery Image ${index + 1}`} style={imgStyle} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
