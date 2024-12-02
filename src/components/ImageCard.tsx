import React from 'react';
import { Heart } from 'lucide-react';
import { Product } from '../types/Product';

export function ImageCard({ imageUrl, title, link }: Product) {
  const [isLiked, setIsLiked] = React.useState(false);

  const handleImageClick = () => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative group">
        <img 
          src={imageUrl} 
          alt={title} 
          className={`w-full h-64 object-cover ${link ? 'cursor-pointer' : ''}`}
          onClick={handleImageClick}
        />
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          <Heart 
            className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
          />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
    </div>
  );
}