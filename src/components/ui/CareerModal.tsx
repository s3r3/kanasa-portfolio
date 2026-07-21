'use client';

import { motion } from 'framer-motion';
import { EASE } from '@/lib/animations';

interface CareerModalProps {
  id: string | null;
  onClose: () => void;
}

const PARTY_IMAGES = [1, 2, 3, 4, 5, 6, 7, 8];
const SHOES_NAMES = ['ROMAIN P.', 'MAD', 'ROMAIN A.', 'VINCENT P.', 'LAURENT', 'ELODIE'];
const PETS_NAMES = ['BILBO', 'MILA', 'ZAK', 'CAPUTI', 'JOSEE', 'HALI'];

export default function CareerModal({ id, onClose }: CareerModalProps) {
  if (!id) return null;

  const base = "bg-[#5a5651] text-white border border-black/30";
  const headerBtn = "px-4 py-2 hover:bg-black/20 border-r border-white/20";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="shadow-2xl max-w-[90vw] max-h-[85vh] overflow-auto"
    >
      {/* JOBS */}
      {id === 'jobs' && (
        <div className="bg-bg w-[600px] border border-black/20 font-sans">
          <div className="flex border-b border-black/20">
            <button onClick={onClose} className="px-4 py-2 hover:bg-neutral-100 border-r border-black/20 text-lg">×</button>
            <div className="px-4 py-2 flex items-center gap-2 text-xs uppercase font-medium">📁 JOBS LISTING</div>
            <div className="flex-1" />
          </div>
          <div className="p-6">
            <div className="flex gap-6 items-start">
              <div className="w-32 h-32 bg-neutral-200 rounded-sm bg-cover bg-center shrink-0" style={{ backgroundImage: 'url(/images/ascii-placeholder.jpg)' }} />
              <div className="flex-1">
                <h2 className="text-xl font-medium uppercase tracking-tight mb-2">Digital Strategist</h2>
                <p className="text-xs uppercase leading-relaxed font-mono">We&rsquo;re looking for a digital strategist who turns ideas into high-performing digital experiences.</p>
              </div>
              <div className="text-xl">↗</div>
            </div>
            <div className="mt-8 border border-black p-4 text-xs font-medium uppercase flex justify-between cursor-pointer hover:bg-black hover:text-white transition-colors">
              <span>Open Application</span>
              <span>↗</span>
            </div>
          </div>
        </div>
      )}

      {/* PLAYLIST */}
      {id === 'playlist' && (
        <div className={`${base} w-[500px] rounded-sm overflow-hidden`}>
          <div className="flex border-b border-white/20">
            <button onClick={onClose} className={headerBtn}>×</button>
            <div className="px-4 py-2 flex items-center gap-2 text-xs uppercase font-medium">📁 PLAYLIST Kanasa 2025</div>
            <div className="flex-1" />
          </div>
          <div className="px-4 py-2 flex gap-4 text-xs font-medium border-b border-white/20 bg-[#6d6862]">
            <span className="bg-bg text-fg px-2 py-0.5 rounded-sm">SPOTIFY</span>
            <span className="px-2 py-0.5 text-white/60">DEEZER</span>
          </div>
          <div className="p-4 bg-[#6d6862]">
            <div className="bg-[#28741e] rounded-lg p-4 flex gap-4 items-center">
              <div className="w-24 h-24 rounded-md bg-neutral-500 shrink-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/slide-1.jpg)' }} />
              <div className="flex-1 text-sm font-sans space-y-1">
                <div>1 <span className="ml-2">Tercel • Les Louanges</span></div>
                <div>2 <span className="ml-2 bg-bg/20 px-1 text-[8px] rounded-sm mr-1">E</span> Body Movin&rsquo; <span className="text-white/60 text-xs">• Beastie Boys</span></div>
                <div className="mt-4 text-xs text-white/70">Kanasa-MIX-2025 • Kanasa.Digital</div>
              </div>
              <div className="w-8 h-8 bg-bg rounded-full flex items-center justify-center text-[#28741e] shrink-0 cursor-pointer">▶</div>
            </div>
          </div>
        </div>
      )}

      {/* EMPLOYEE */}
      {id === 'employee' && (
        <div className="bg-bg w-[450px] border border-black/20 font-mono text-[10px]">
          <div className="flex border-b border-black/20">
            <button onClick={onClose} className="px-4 py-2 hover:bg-neutral-100 border-r border-black/20 text-lg font-sans">×</button>
            <div className="px-4 py-2 flex items-center gap-2 uppercase font-bold">📁 EMPLOYEE OF THE MONTH</div>
            <div className="flex-1" />
          </div>
          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <pre className="mb-6 opacity-80 leading-[1.1] text-xs whitespace-pre">{`   _/_/_/  _/_/   _/   _/
    _/    _/  _/ _/_/_/
   _/    _/_/   _/   _/`}</pre>
            <div className="flex flex-col gap-3 uppercase">
              <div>// 2021 ---------</div>
              <div>// ADRIEN VANDERPOTTE</div>
              <div>// NICOLAS BALDOVINI</div>
              <div>// STEPHANE AUGER</div>
              <div>// ELODIE DOUA</div>
              <div className="mt-2">// 2022 ---------</div>
              <div>// ADRIEN VANDERPOTTE</div>
              <div className="mt-2">// 2024 ---------</div>
              <div>// CATHERINE BROCHU</div>
              <div>// LAURENT VÉNÉROSY</div>
            </div>
          </div>
        </div>
      )}

      {/* PARTIES */}
      {(id === 'admin' || id === 'terrace' || id === 'launch') && (
        <div className={`${base} w-[550px]`}>
          <div className="flex font-sans border-b border-white/20">
            <button onClick={onClose} className={headerBtn}>×</button>
            <div className="px-4 py-2 flex items-center gap-2 text-xs uppercase font-medium bg-[#6d6862]">📁 {id.toUpperCase().replace('_', ' ')}</div>
            <div className="flex-1 bg-[#6d6862]" />
          </div>
          <div className="p-6 grid grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto bg-[#6d6862]">
            {PARTY_IMAGES.map((i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-full aspect-square bg-neutral-400 rounded-sm bg-cover bg-center" style={{ backgroundImage: `url(/images/slide-${(i % 5) + 1}.jpg)` }} />
                <span className="text-[10px] uppercase font-mono text-white/60">{id === 'launch' ? 'RLP' : id === 'terrace' ? 'TP' : 'AP'}_0{i}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SHOES / PETS */}
      {(id === 'shoes' || id === 'pets') && (
        <div className={`${base} w-[500px]`}>
          <div className="flex font-sans border-b border-white/20">
            <button onClick={onClose} className={headerBtn}>×</button>
            <div className="px-4 py-2 flex items-center gap-2 text-xs uppercase font-medium bg-[#6d6862]">📁 {id.toUpperCase()}</div>
            <div className="flex-1 bg-[#6d6862]" />
          </div>
          <div className="p-8 grid grid-cols-4 gap-x-4 gap-y-8 max-h-[60vh] overflow-y-auto bg-[#6d6862]">
            {(id === 'shoes' ? SHOES_NAMES : PETS_NAMES).map((name, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-full aspect-square bg-neutral-400 rounded-sm bg-cover bg-center" style={{ backgroundImage: 'url(/images/ascii-placeholder.jpg)' }} />
                <span className="text-[10px] uppercase font-sans tracking-wide text-center text-white/70">{name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BENEFITS */}
      {id === 'benefits' && (
        <div className="bg-bg w-[500px] border border-black/20 font-mono text-[10px]">
          <div className="flex border-b border-black/20">
            <button onClick={onClose} className="px-4 py-2 hover:bg-neutral-100 border-r border-black/20 text-lg font-sans">×</button>
            <div className="px-4 py-2 flex items-center gap-2 uppercase font-bold">📁 JOBS BENEFITS</div>
            <div className="flex-1" />
          </div>
          <div className="p-6 max-h-[65vh] overflow-y-auto leading-relaxed">
            <pre className="mb-4 opacity-80 text-[10px] leading-tight whitespace-pre">{` _                       _  __ _ _
| |__   ___ _ __   ___  (_)/ _(_) |_ ___
| '_ \\ / _ \\ '_ \\ / _ \\ | | |_| | __/ __|
| |_) |  __/ | | |  __/ | |  _| | |_\\__ \\
|_.__/ \\___|_| |_|\\___| |_|_| |_|\\__|___/`}</pre>
            <div className="space-y-4 uppercase">
              {[
                ['TIME OFF', 'A balanced life: beyond vacation days, enjoy a week off between Christmas and New Year\'s, plus LG2 group\'s company-wide holiday in November.'],
                ['FLEX DAYS', 'Five flex days to stretch your weekends, or finally book that spa day, hit the slopes, or binge a series.'],
                ['RRSP', 'Investing in your future: An RRSP program with matching contributions from LG2, for long-term peace of mind.'],
                ['INSURANCES', 'Comprehensive health, dental, and life insurance packages tailored to keep you and your loved ones protected.'],
              ].map(([title, desc]) => (
                <div key={title}>
                  <strong className="text-fg font-bold">// {title}</strong>
                  <p className="mt-1 opacity-80 font-sans text-xs">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RABBIT HOLE */}
      {id === 'rabbit' && (
        <div className="bg-black text-white w-[600px] border border-white/20 rounded-sm overflow-hidden font-sans">
          <div className="flex bg-[#2a2a2a] border-b border-white/10">
            <button onClick={onClose} className="px-4 py-2 hover:bg-bg/10 border-r border-white/10 text-lg">×</button>
            <div className="px-4 py-2 flex items-center gap-2 text-xs uppercase font-medium bg-black">📁 RABBIT_HOLE</div>
            <div className="flex-1 bg-black" />
          </div>
          <div className="relative w-full aspect-video bg-neutral-800 flex items-center justify-center">
            <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: 'url(/images/slide-5.jpg)' }} />
            <span className="relative z-10 text-2xl text-white/30 tracking-widest uppercase font-bold">SQUARESPACE</span>
            <div className="absolute top-4 left-4 bg-black/80 text-white px-3 py-2 text-xs rounded-md flex items-center gap-2 border border-white/20 z-10">
              <span>$</span> Sponsored content
            </div>
          </div>
          <div className="bg-black p-3 flex justify-between items-center text-[10px] uppercase font-mono text-white/50 border-t border-white/10">
            <div>JOËL AUCHU<br/>Kanasa-TJA-0716</div>
            <div>WELL THIS IS AN EXPENSIVE HOBBY.</div>
            <div className="text-sm">🔁</div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
