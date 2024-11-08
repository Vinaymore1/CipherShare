import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import Share from '@/pages/Share';
import Retrieve from '@/pages/Retrieve';
import Footer from '@/components/Footer';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ciphershare-theme">
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/share" element={<Share />} />
              <Route path="/retrieve/:code?" element={<Retrieve />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;