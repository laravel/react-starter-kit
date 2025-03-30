import { GalleryData } from '@/pages/type';
import { GalleryService } from '@/service/fetch';
import type React from 'react';
import { useEffect, useState } from 'react';



const MasonryGallery = ({ }) => {
    const [data, setData] = useState<GalleryData[]>();
    useEffect(() => {
        GalleryService().then((res) => {
            setData(res);
        });
    }, [data]);
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    // Function to determine the span classes for each image
    // This creates a more interesting and dynamic masonry layout
    const getSpanClasses = (id: number) => {
        // Create a more varied layout based on the image ID
        if (id % 7 === 0) return 'md:col-span-2 md:row-span-2'; // Large square
        if (id % 5 === 0) return 'md:col-span-2'; // Wide
        if (id % 3 === 0) return 'md:row-span-2'; // Tall
        return ''; // Regular size
    };

    return (
        <div className="grid auto-rows-auto grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data?.map((image) => (
                <div
                    key={image.id}
                    className={`relative overflow-hidden rounded-lg transition-all duration-300 ${getSpanClasses(image.id)}`}
                    onMouseEnter={() => setHoveredId(image.id)}
                    onMouseLeave={() => setHoveredId(null)}
                >
                    <img
                        src={`${image.src}`}
                        alt={image.alt}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                        style={{ aspectRatio: image.id % 2 === 0 ? '3/4' : '4/3' }}
                    />
                    {hoveredId === image.id && (
                        <div className="absolute inset-0 flex cursor-pointer flex-col justify-end bg-black p-4 text-white opacity-70 transition-all">
                            <h3 className="text-lg font-bold">{image.title}</h3>
                            <p className="text-sm">{image.description}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MasonryGallery;
