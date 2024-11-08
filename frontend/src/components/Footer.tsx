// // Footer.tsx
// import { Github } from 'lucide-react';

// export default function Footer() {
//   return (
//     <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-16 lg:h-20 items-center px-4 lg:px-8 max-w-7xl mx-auto">
//         <p className="text-sm lg:text-base text-muted-foreground">
//           © 2024 CipherShare. All rights reserved.
//         </p>
//         <div className="flex-1" />
//         <a
//           href="https://github.com"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-muted-foreground hover:text-foreground transition-colors"
//         >
//           <Github className="h-5 w-5 lg:h-6 lg:w-6" />
//         </a>
//       </div>
//     </footer>
//   );
// }

import { Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <p className="text-sm text-muted-foreground">
          © 2024 CipherShare. All rights reserved.
        </p>
        <div className="flex-1" />
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground"
        >
          <Github className="h-5 w-5" />
        </a>
      </div>
    </footer>
  );
}