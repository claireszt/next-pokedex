import SideNav from "./ui/sidenav"; 
import "./ui/global.css"

export default function Layout({ children }: { children: React.ReactNode }) {
  // return (
  //   <html>
  //   <body className="flex h-screen flex-col md:flex-row md:overflow-hidden">
  //     <div className="w-full flex-none md:w-64">
  //       <SideNav />
  //     </div>
  //     <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
  //   </body>
  //   </html>
  // );
    return (
    <html>
    <body className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-gray-100">
      <div className="flex-grow p-5 md:overflow-y-auto md:p-5">{children}</div>
    </body>
    </html>
  );
}