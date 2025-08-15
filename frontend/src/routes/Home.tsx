import { useState } from "react";
import { Main } from "../components/home/Main";
import { Navbar } from "../components/home/Navbar";
import { Sidebar } from "../components/home/Sidebar";
import { HeaderBG } from "../components/home/HeaderBG";
import { HeaderContent } from "../components/home/HeaderContent";
import { HeaderStats } from "../components/home/HeaderStats";
import { Newsletter } from "../components/home/Newsletter";

export function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <Navbar
          onPress={() => {
            setMobileMenuOpen(true);
          }}
        />
        <Sidebar
          menuValue={mobileMenuOpen}
          onClose={() => {
            setMobileMenuOpen(false);
          }}
        />
      </header>
      <Main />
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <HeaderBG />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <HeaderContent />
          <HeaderStats />
        </div>
        <Newsletter />
      </div>
    </div>
  );
}
