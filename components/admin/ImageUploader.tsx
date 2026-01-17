"use client";

import { useState } from "react";

export default function ImageUploader({
  value,
  onChange,
}: {
  value?: string;
  onChange: (dataUrl: string | null) => void;
}) {
  const [preview, setPreview] = useState<string | null>(value || null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return onChange(null);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreview(result);
      onChange(result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Image</label>
      <input type="file" accept="image/*" onChange={handleFile} />
      {preview && (
        <img src={preview} alt="preview" className="w-48 h-32 object-cover mt-2 rounded" />
      )}
    </div>
  );
}
