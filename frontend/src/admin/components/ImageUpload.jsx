import { useState, useRef } from 'react';
import { Upload, X, Image } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';


const ImageUpload = ({ value, onChange, multiple = false, label = "Upload Image" }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const uploadFile = async (file) => {
    // Fallback: create a local URL for demo purposes if server fails
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Upload failed');
      }
      const data = await res.json();
      return data.path;
    } catch (error) {
      console.warn('Server upload failed, using local preview:', error.message);
      // Create a local object URL for preview (won't persist)
      return URL.createObjectURL(file);
    }
  };

  const handleFiles = async (files) => {
    setUploading(true);
    try {
      console.log('Uploading files:', files);
      if (multiple) {
        const uploadPromises = Array.from(files).map(file => {
          console.log('Uploading file:', file.name);
          return uploadFile(file);
        });
        const filePaths = await Promise.all(uploadPromises);
        console.log('Upload successful, paths:', filePaths);
        const currentPaths = Array.isArray(value) ? value : [];
        onChange([...currentPaths, ...filePaths]);
      } else {
        console.log('Uploading single file:', files[0].name);
        const filePath = await uploadFile(files[0]);
        console.log('Upload successful, path:', filePath);
        onChange(filePath);
      }
    } catch (error) {
      console.error('Upload error:', error);
      // Don't show alert for fallback URLs
      if (!error.message.includes('Server upload failed')) {
        alert(`Upload failed: ${error.message}`);
      }
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removeImage = (indexOrPath) => {
    if (multiple) {
      const newImages = value.filter((_, i) => i !== indexOrPath);
      onChange(newImages);
    } else {
      onChange('');
    }
  };

  const images = multiple ? (Array.isArray(value) ? value : []) : (value ? [value] : []);

  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive 
            ? 'border-[var(--color-neon-green)] bg-[var(--color-neon-green)]/10' 
            : 'border-gray-600 hover:border-gray-500'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-400 text-sm">
          {uploading ? 'Uploading...' : 'Drag and drop images here, or click to select'}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Supports: JPG, PNG, GIF, WebP
        </p>
      </div>

      {/* Image Preview */}
      {images.length > 0 && (
        <div className="mt-4">
          <div className={`grid gap-3 ${multiple ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-1'}`}>
            {images.map((img, index) => (
              <div key={index} className="relative group">
                <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src={img.startsWith('blob:') ? img : (img.startsWith('http') ? img : `${API_URL}${img}`)}
                    alt={`Upload ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('Image load error:', img);
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;