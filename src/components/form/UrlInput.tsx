import { Input } from '@/components/ui/input';

interface UrlInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function UrlInput({ value, onChange, disabled }: UrlInputProps) {
  return (
    <Input
      type="url"
      placeholder="Paste your long URL here..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="h-12 text-base font-medium border-none focus-visible:ring-0 bg-transparent px-4 py-3 placeholder:text-gray-300"
    />
  );
}
