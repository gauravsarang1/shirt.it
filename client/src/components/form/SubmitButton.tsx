import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  isLoading?: boolean;
  disabled?: boolean;
}

export function SubmitButton({ isLoading, disabled }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={disabled || isLoading}
      className="h-12 px-8 rounded-xl font-bold bg-black text-white hover:bg-gray-900 transition-all duration-300 w-full sm:w-auto shadow-lg shadow-black/10 active:scale-95"
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Shorten'}
    </Button>
  );
}
