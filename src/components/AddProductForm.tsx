import React from 'react';
import { ImageUploader } from './ImageUploader';

interface ProductFormData {
  title: string;
  image: File | null;
  link?: string;
}

interface AddProductFormProps {
  onSubmit: (data: ProductFormData) => void;
}

export function AddProductForm({ onSubmit }: AddProductFormProps) {
  const [formData, setFormData] = React.useState<ProductFormData>({
    title: '',
    image: null,
    link: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      image: null,
      link: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Image Title
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="link" className="block text-sm font-medium text-gray-700">
          Product Link (Optional)
        </label>
        <input
          type="url"
          id="link"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="https://example.com/product"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Image
        </label>
        <ImageUploader
          onImageUpload={(image) => setFormData({ ...formData, image })}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Add Image
      </button>
    </form>
  );
}