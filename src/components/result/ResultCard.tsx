import { CopyButton } from './CopyButton';

interface ResultCardProps {
  shortCode: string;
}

export function ResultCard({ shortCode }: ResultCardProps) {
  if(import.meta.env.SERVER_ORIGIN === undefined) {
    throw new Error('SERVER_ORIGIN is not defined in environment variables');
  }
  const shortUrl = `${import.meta.env.SERVER_ORIGIN}/${shortCode}`;

  return (
    <div className="bg-black rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-between mt-8 shadow-2xl shadow-black/20 gap-6 border border-white/5">
      <div className="flex flex-col gap-1.5 min-w-0 text-left">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Short Link Ready</span>
        <span className="text-lg sm:text-xl font-bold text-white truncate selection:bg-white selection:text-black">{shortUrl.replace(/^https?:\/\//, '')}</span>
      </div>
      <div className="flex items-center">
        <CopyButton text={shortUrl} />
      </div>
    </div>
  );
}
