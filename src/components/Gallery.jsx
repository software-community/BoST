import React from 'react';

const Gallery = () => {
    const arr = [
        "./GalleryImages/img1.png",
        "./GalleryImages/img2.jpg",
        "./GalleryImages/img3.jpg",
        "./GalleryImages/img2.jpg",
        "./GalleryImages/img1.png",
        "./GalleryImages/img2.jpg",
        "./GalleryImages/img3.jpg",
        "./GalleryImages/img2.jpg",
        "./GalleryImages/img1.png"
    ];

    const mainStyle = {
        paddingBottom: '20px'
    };

    const containerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gridGap: '10px'
    };

    const imgStyle = {
        width: '100%',
        height: '300px',
        borderRadius: '14px'
    };

    return (
        <div style={mainStyle}>
            <h1 className='text-3xl font-bold text-center my-5'>Gallery</h1>
            <div style={containerStyle}>
                {arr.map((item, index) => (
                    <div key={index} className='content'>
                        <img src={item} alt={`Gallery Image ${index + 1}`} style={imgStyle} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
