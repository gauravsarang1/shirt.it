import React, { useState } from 'react';
import { UrlInput } from './UrlInput';
import { SubmitButton } from './SubmitButton';

interface UrlFormProps {
  onSubmit: (url: string) => Promise<void>;
  isLoading: boolean;
}

export function UrlForm({ onSubmit, isLoading }: UrlFormProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    await onSubmit(url);
    setUrl('');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-black/[0.03] p-2 mb-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 transition-all focus-within:border-gray-300 focus-within:shadow-2xl focus-within:shadow-black/[0.05]"
    >
      <div className="flex-1">
        <UrlInput value={url} onChange={setUrl} disabled={isLoading} />
      </div>
      <SubmitButton isLoading={isLoading} disabled={!url.trim()} />
    </form>
  );
}
