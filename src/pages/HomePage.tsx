import React from 'react';
import { ImageCard } from '../components/ImageCard';
import { AddProductForm } from '../components/AddProductForm';
import { SearchBar } from '../components/SearchBar';
import { Plus, X, UserCircle } from 'lucide-react';
import { Product } from '../types/Product';
import { useProductStore } from '../store/productStore';
import { useProfileStore } from '../store/profileStore';
import { ProfileForm } from '../components/ProfileForm';

export function HomePage() {
  const { products, addProduct } = useProductStore();
  const { profile, updateProfile } = useProfileStore();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isAddingImage, setIsAddingImage] = React.useState(false);
  const [isEditingProfile, setIsEditingProfile] = React.useState(false);

  const handleAddImage = (formData: any) => {
    const newImage: Product = {
      id: Date.now().toString(),
      imageUrl: URL.createObjectURL(formData.image),
      title: formData.title,
      link: formData.link,
    };
    
    addProduct(newImage);
    setIsAddingImage(false);
  };

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
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Add New Products</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setIsEditingProfile(true)}
                className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                <UserCircle className="w-5 h-5" />
                Edit Profile
              </button>
              <button
                onClick={() => setIsAddingImage(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add Image
              </button>
            </div>
          </div>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {filteredImages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No images found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <ImageCard key={image.id} {...image} />
            ))}
          </div>
        )}
      </main>

      {/* Add Image Modal */}
      {isAddingImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setIsAddingImage(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Image</h2>
            <AddProductForm onSubmit={handleAddImage} />
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative">
            <button
              onClick={() => setIsEditingProfile(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h2>
            <ProfileForm
              initialProfile={profile}
              onSubmit={(newProfile) => {
                updateProfile(newProfile);
                setIsEditingProfile(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}