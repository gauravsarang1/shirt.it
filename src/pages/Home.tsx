import { useState } from 'react';
import { Container } from '@/components/layout/Container';
import { UrlForm } from '@/components/form/UrlForm';
import { ResultCard } from '@/components/result/ResultCard';
import { urlService, ShortenResponse } from '@/services/api';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';

export function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ShortenResponse | null>(null);

  const handleShorten = async (url: string) => {
    setIsLoading(true);
    setResult(null);
    try {
      const data = await urlService.shorten(url);
      setResult(data);
    } catch (error: any) {
      const message = error.response?.data?.error || 'Something went wrong. Please try again.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white flex flex-col relative overflow-hidden font-sans">
      <div className="grid-bg" />
      
      {/* Header */}
      <header className="fixed top-0 w-full glass z-50 border-b border-gray-100/50">
        <div className="max-w-[1024px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-black rounded-lg flex items-center justify-center shadow-lg shadow-black/10">
              <div className="w-1.5 h-4 bg-white rotate-12 rounded-full"></div>
            </div>
            <span className="font-bold tracking-tight text-lg text-black">shrt.it</span>
          </div>
          <nav className="hidden md:flex gap-8 text-[13px] font-semibold text-gray-400 uppercase tracking-widest">
            <a href="#" className="text-black transition-colors">Dashboard</a>
            <a href="#" className="hover:text-black transition-colors">Analytics</a>
            <a href="#" className="hover:text-black transition-colors">API</a>
          </nav>
          <div className="md:hidden">
             <div className="w-8 h-8 rounded-full border border-gray-200 flex flex-col items-center justify-center gap-1">
                <div className="w-4 h-0.5 bg-black"></div>
                <div className="w-4 h-0.5 bg-black"></div>
             </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center pt-32 pb-24 z-10">
        <Container className="w-full max-w-xl px-6 py-0 md:py-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-10 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 mb-6 group cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">System Online</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-5 text-black leading-[1.1]">
              Shorten links. <br /> 
              <span className="text-gray-300">Share faster.</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-[280px] sm:max-w-md mx-auto leading-relaxed">
              The high-performance URL shortener built for minimalists. 
              Secure, fast, and remarkably simple.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <UrlForm onSubmit={handleShorten} isLoading={isLoading} />
            
            <AnimatePresence mode="wait">
              {result && (
                <motion.div
                  key={result.shortCode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ResultCard shortCode={result.shortCode} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-20 w-full"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-1 h-3 bg-black rounded-full"></div>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">Activity Feed</h3>
              </div>
              <div className="hidden sm:flex gap-1 items-center">
                <span className="text-[10px] text-gray-300 uppercase font-bold tracking-tighter">Shortcut</span>
                <span className="kbd">⌘ K</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { code: 'shrt.it/linear-app', url: 'linear.app/features/cycle-management', clicks: '1.2k', time: '2m' },
                { code: 'shrt.it/design-res', url: 'dribbble.com/shots/14293810', clicks: '842', time: '1h' }
              ].map((item, i) => (
                <div 
                  key={i}
                  className="group flex items-center justify-between p-5 bg-white border border-gray-100/80 rounded-2xl hover:border-gray-300 hover:glow-shadow transition-all duration-300 cursor-pointer"
                >
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="text-sm font-bold text-black group-hover:text-black transition-colors">{item.code}</span>
                    <span className="text-xs text-gray-400 truncate max-w-[160px] sm:max-w-[300px]">{item.url}</span>
                  </div>
                  <div className="text-right flex items-center gap-6">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-black">{item.clicks}</span>
                      <span className="text-[9px] uppercase text-gray-400 font-bold tracking-wider">Clicks</span>
                    </div>
                    <div className="w-px h-6 bg-gray-100"></div>
                    <span className="text-[10px] font-bold text-gray-300 uppercase">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </Container>
      </main>

      <footer className="py-10 border-t border-gray-50 z-10 bg-white shadow-[0_-1px_0_0_rgba(0,0,0,0.02)]">
        <div className="max-w-[1024px] mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] font-bold text-gray-300 uppercase tracking-[0.3em]">
          <div className="flex gap-4">
            <span>SQLite Engine</span>
            <span className="opacity-30">•</span>
            <span>V1.0.4 Stable</span>
          </div>
          <span className="text-gray-200">Built for high sharing performance</span>
          <div className="flex gap-4">
            <span>Clean Architecture</span>
            <span className="opacity-30">•</span>
            <span>Zero ORM</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
