import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-cream/15 flex flex-col font-sans">
      {/* Header occupies 64px sticky top */}
      <Header />
      
      <div className="flex flex-1 relative">
        {/* Sidebar occupies 256px on desktop (lg breakpoint) */}
        <Sidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 min-h-[calc(100vh-64px)] lg:pl-64 pb-20 lg:pb-8 flex flex-col">
          <div className="flex-1 w-full max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8 animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
