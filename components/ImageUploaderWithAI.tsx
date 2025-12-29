// components/ImageUploader.tsx
import React, { useState } from 'react';

export default function ImageUploader() {
  const [preview, setPreview] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setImages([]);
  };

  const handleGenerate = async () => {
    if (!preview) return;

    const input = document.querySelector('input[type=file]') as HTMLInputElement;
    if (!input?.files?.[0]) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('image', input.files[0]);

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.images) {
        setImages(data.images);
      } else {
        alert('No se recibieron imágenes generadas.');
      }
    } catch (error) {
      alert('Error al generar imágenes.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Sube una imagen floral</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" style={{ width: 300, marginTop: 10 }} />}
      {preview && (
        <div>
          <button onClick={handleGenerate} disabled={loading} style={{ marginTop: 10 }}>
            {loading ? 'Generando...' : 'Generar 4 variantes con IA'}
          </button>
        </div>
      )}
      <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {images.map((img, i) => (
          <img key={i} src={img} alt={`Variante ${i + 1}`} style={{ width: 200 }} />
        ))}
      </div>
    </div>
  );
}
