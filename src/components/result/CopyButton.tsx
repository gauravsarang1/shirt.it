import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleCopy}
      className="flex items-center gap-2 px-6 h-12 border border-white/20 bg-white text-black rounded-xl text-sm font-bold hover:bg-gray-100 transition-all active:scale-95"
    >
      {isCopied ? (
        <Check className="h-4 w-4 text-green-600" />
      ) : (
        <Copy className="h-4 w-4 text-gray-500" />
      )}
      <span className="hidden sm:inline">
        {isCopied ? 'Copied' : 'Copy to clipboard'}
      </span>
      <span className="sm:hidden">
        {isCopied ? 'Copied' : 'Copy'}
      </span>
    </Button>
  );
}
