// // Navbar.tsx
// import { Link } from 'react-router-dom';
// import { Shield, Upload, Download } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { ModeToggle } from '@/components/mode-toggle';

// export default function Navbar() {
//   return (
//     <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-16 lg:h-20 items-center px-4 lg:px-8 max-w-7xl mx-auto">
//         <Link to="/" className="flex items-center space-x-3 lg:space-x-4 group">
//           <div className="relative">
//             <Shield className="h-8 w-8 lg:h-10 lg:w-10 text-primary transition-colors group-hover:text-primary/90" />
//             <Shield className="absolute inset-0 h-8 w-8 lg:h-10 lg:w-10 text-primary/20 blur-[2px] transition-all group-hover:blur-[4px]" />
//           </div>
//           <div className="flex flex-col -space-y-1">
//             <span className="text-xl lg:text-2xl font-bold tracking-tight">CipherShare</span>
//             <span className="text-xs lg:text-sm text-muted-foreground">Secure File Transfer</span>
//           </div>
//         </Link>
//         <div className="flex-1" />
//         <div className="flex items-center space-x-4 lg:space-x-6">
//           <Link to="/share">
//             <Button variant="ghost" size="sm" className="hover:bg-primary/10 lg:text-base">
//               <Upload className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
//               Share
//             </Button>
//           </Link>
//           <Link to="/retrieve">
//             <Button variant="ghost" size="sm" className="hover:bg-primary/10 lg:text-base">
//               <Download className="mr-2 h-4 w-4 lg:h-5 lg:w-5" />
//               Retrieve
//             </Button>
//           </Link>
//           <ModeToggle />
//         </div>
//       </div>
//     </nav>
//   );
// }
import { Link } from 'react-router-dom';
import { Shield, Upload, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="relative">
            <Shield className="h-8 w-8 text-primary transition-colors group-hover:text-primary/90" />
            <Shield className="absolute inset-0 h-8 w-8 text-primary/20 blur-[2px] transition-all group-hover:blur-[4px]" />
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-xl font-bold tracking-tight">CipherShare</span>
            <span className="text-xs text-muted-foreground">Secure File Transfer</span>
          </div>
        </Link>
        <div className="flex-1" />
        <div className="flex items-center space-x-4">
          <Link to="/share">
            <Button variant="ghost" size="sm" className="hover:bg-primary/10">
              <Upload className="mr-2 h-4 w-4" />
              Share
            </Button>
          </Link>
          <Link to="/retrieve">
            <Button variant="ghost" size="sm" className="hover:bg-primary/10">
              <Download className="mr-2 h-4 w-4" />
              Retrieve
            </Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}