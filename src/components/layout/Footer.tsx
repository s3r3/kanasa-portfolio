'use client';

import Link from 'next/link';
import { useUIStore } from '@/store/useUIStore';

export default function Footer() {
  const { toggleContact } = useUIStore();

  return (
    <footer className="bg-[#cec9c0] text-black pt-32 pb-8 px-6 md:px-12 border-t border-black/10 flex flex-col justify-between min-h-[70vh]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full mb-24">
        <div className="hidden lg:block lg:col-span-5" />

        <div className="col-span-1 lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-12 text-sm uppercase">
          {/* Nav */}
          <ul className="flex flex-col gap-3 font-medium">
            <li><Link href="/work" className="hover:italic transition-all w-max">[ ] WORK</Link></li>
            <li><Link href="/about" className="hover:italic transition-all w-max">[ ] ABOUT</Link></li>
            <li><Link href="/services" className="hover:italic transition-all w-max">[ ] SERVICES</Link></li>
            <li>
              <button onClick={toggleContact} className="hover:italic transition-all w-max text-left">[ ] CONTACT</button>
            </li>
          </ul>

          {/* Social */}
          <ul className="flex flex-col gap-3 font-medium">
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:italic transition-all w-max">[ ] INSTAGRAM</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:italic transition-all w-max">[ ] LINKEDIN</a></li>
            <li><a href="https://bsky.app" target="_blank" rel="noopener noreferrer" className="hover:italic transition-all w-max">[ ] BLUESKY</a></li>
            <li><a href="https://awwwards.com" target="_blank" rel="noopener noreferrer" className="hover:italic transition-all w-max">[ ] AWWWARDS</a></li>
          </ul>

          {/* Contact */}
          <div className="flex flex-col gap-5 font-medium">
            <div className="grid grid-cols-[24px_1fr] items-start">
              <span>A</span>
              <p className="leading-tight">
                4051 MOLSON STREET<br />
                SUITE 100, MONTREAL, QC,<br />
                H1Y 3L1
              </p>
            </div>
            <div className="grid grid-cols-[24px_1fr] items-start">
              <span>P</span>
              <p>+1 514 281-8901</p>
            </div>
            <div className="grid grid-cols-[24px_1fr] items-start">
              <span>E</span>
              <a href="mailto:INFO@REF.DIGITAL" className="underline decoration-1 underline-offset-4 hover:italic transition-all">
                INFO@REF.DIGITAL
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-12 w-full mt-auto">
        <div className="text-[10rem] md:text-[14rem] lg:text-[18rem] leading-[0.7] tracking-tighter font-medium -ml-3 md:-ml-4">
          REF
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-end gap-10 xl:gap-16 pb-2">
          <ul className="flex flex-wrap gap-6 text-xs uppercase font-medium">
            <li><a href="#" className="hover:underline underline-offset-4">FRANÇAIS</a></li>
            <li><a href="#" className="hover:underline underline-offset-4">PRIVACY POLICY</a></li>
            <li><a href="#" className="hover:underline underline-offset-4">TERMS AND CONDITIONS</a></li>
            <li><a href="#" className="hover:underline underline-offset-4">COOKIES SETTINGS</a></li>
          </ul>

          <div className="flex items-center gap-6 shrink-0">
            <div className="text-4xl font-bold tracking-tighter leading-none">lg2</div>
            <div className="flex flex-col items-center justify-center leading-none">
              <span className="text-[8px] font-bold">Certified</span>
              <div className="w-10 h-10 border-[1.5px] border-black rounded-full flex items-center justify-center text-xl font-bold mt-0.5">B</div>
              <span className="text-[6px] font-bold mt-0.5">Corporation</span>
            </div>
            <div className="bg-black text-[#cec9c0] w-10 h-12 flex flex-col items-start justify-center p-1 leading-[0.8] font-bold text-sm tracking-tight">
              <span>So</span><span>DA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
