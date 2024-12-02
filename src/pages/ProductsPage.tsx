import React from 'react';
import { ImageCard } from '../components/ImageCard';
import { SearchBar } from '../components/SearchBar';
import { useProductStore } from '../store/productStore';
import { useProfileStore } from '../store/profileStore';
import { ProfileSection } from '../components/ProfileSection';

export function ProductsPage() {
  const { products } = useProductStore();
  const { profile } = useProfileStore();
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredImages = React.useMemo(() => {
    const query = searchQuery.toLowerCase();
    return products.filter(image => 
      image.title.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          {profile && <ProfileSection profile={profile} />}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Product Catalog</h1>
          </div>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {filteredImages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <ImageCard key={image.id} {...image} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}