import Sidenav from "@/components/Sidenav/Sidenav";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full bg-primary md:px-4 z-30 fixed bottom-0 md:static flex-none md:w-64 md:order-1 md:py-4  order-2">
        <Sidenav />
      </div>
      <div className="flex-grow flex items-center justify-center md:items-start  p-6 md:overflow-y-auto pb-20 md:px-12 md:py-8 md:order-2 order-1">
        {children}
      </div>
    </div>
  );
}
