'use client';

import Link from 'next/link';
import { useUIStore } from '@/store/useUIStore';
import TextAnimation3D from '@/components/ui/TextAnimation3D';

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
            <li><a href="https://www.instagram.com/kanasacreative/" target="_blank" rel="noopener noreferrer" className="hover:italic transition-all w-max">[ ] INSTAGRAM</a></li>
            <li><a href="https://www.linkedin.com/in/muhammad-farid-307029300/?locale=en" target="_blank" rel="noopener noreferrer" className="hover:italic transition-all w-max">[ ] LINKEDIN</a></li>
            <li><a href="https://github.com/s3r3" target="_blank" rel="noopener noreferrer" className="hover:italic transition-all w-max">[ ] GITHUB</a></li>
            <li><a href="https://www.behance.net/kanasa_creative" target="_blank" rel="noopener noreferrer" className="hover:italic transition-all w-max">[ ] BEHANCE</a></li>
          </ul>

          {/* Contact */}
          <div className="flex flex-col gap-5 font-medium">
            <div className="grid grid-cols-[24px_1fr] items-start">
              <span>A</span>
              <p className="leading-tight">Sigli, Aceh</p>
            </div>
            <div className="grid grid-cols-[24px_1fr] items-start">
              <span>P</span>
              <p>+6282185254073</p>
            </div>
            <div className="grid grid-cols-[24px_1fr] items-start">
              <span>E</span>
              <a href="mailto:creativekanasa@gmail.com" className="underline decoration-1 underline-offset-4 hover:italic transition-all">creativekanasa@gmail.com</a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-12 w-full mt-auto">
        <div className="flex flex-col gap-4">
          <TextAnimation3D text="KANASA" />
          <div className="text-[10rem] md:text-[14rem] lg:text-[18rem] leading-[0.7] tracking-tighter font-medium -ml-3 md:-ml-4 hidden">
            KANASA
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-end gap-10 xl:gap-16 pb-2">
          <ul className="flex flex-wrap gap-6 text-xs uppercase font-medium">
            <li><a href="#" className="hover:underline underline-offset-4">PRIVACY POLICY</a></li>
            <li><a href="#" className="hover:underline underline-offset-4">TERMS AND CONDITIONS</a></li>
          </ul>

          <div className="flex items-center gap-6 shrink-0">
            <span className="text-[10px] uppercase tracking-widest text-black/40">© 2026 Kanasa Creative</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
