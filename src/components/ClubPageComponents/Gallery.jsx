import React from 'react';
import { getAllImages } from '@/app/actions/GalleryData';

const Gallery = async({club}) => {
   
    const arr=await getAllImages(club)
   
    if(arr.length===0)return null;
    return (
        <div className='mt-12 pb-0'>
        <h1 className='text-4xl sm:text-5xl font-bold text-center mb-8'>Gallery</h1>
        <div className='flex flex-wrap'>
            {arr.map((item, index) => (
                <div key={index} className='w-full sm:w-1/2 lg:w-1/3 '>
                    <img
                        src={item.url}
                        alt={`Gallery Image ${index + 1}`}
                        className='w-full h-72 object-cover object-center'
                    />
                </div>
            ))}
        </div>
    </div>
    );
};

export default Gallery;
