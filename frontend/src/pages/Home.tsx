import { Link } from 'react-router-dom';
import { Shield, Upload, Download, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-12 lg:pt-24">
        <div className="flex flex-col items-center justify-center text-center lg:min-h-[70vh]">
          {/* Logo and Title Section */}
          <div className="relative mb-8 lg:mb-12">
            <Shield className="h-12 w-12 md:h-16 md:w-16 lg:h-24 lg:w-24 text-primary animate-pulse" />
            <Shield className="absolute inset-0 h-12 w-12 md:h-16 md:w-16 lg:h-24 lg:w-24 text-primary/20 blur-[6px]" />
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-8xl font-bold tracking-tight bg-gradient-to-r from-primary/90 via-primary to-primary/90 bg-clip-text text-transparent pb-2 mb-6">
            CipherShare
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light max-w-2xl mb-8 lg:mb-12">
            Experience secure file sharing with end&#8209;to&#8209;end encryption
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 mb-16 lg:mb-24">
            <Link to="/share">
              <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90">
                <Upload className="mr-2 h-6 w-6" />
                Share Files
              </Button>
            </Link>
            <Link to="/retrieve">
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-8 text-lg hover:bg-primary/10 border-2"
              >
                <Download className="mr-2 h-6 w-6" />
                Retrieve Files
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto pb-16 lg:pb-24">
          <h2 className="text-2xl lg:text-4xl font-semibold text-center mb-12 lg:mb-16">
            Why Choose CipherShare?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <Card className="border-primary/10 bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Lock className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl lg:text-2xl">End-to-End Encryption</CardTitle>
                </div>
                <CardDescription className="text-base lg:text-lg">
                  Your files are encrypted before upload and remain secure throughout transmission
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-primary/10 bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl lg:text-2xl">No Registration</CardTitle>
                </div>
                <CardDescription className="text-base lg:text-lg">
                  Start sharing files instantly without creating an account or sign-up process
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-primary/10 bg-background/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl lg:text-2xl">Secure Access</CardTitle>
                </div>
                <CardDescription className="text-base lg:text-lg">
                  Access shared content with unique, one-time secure codes
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-t border-primary/10">
          <div className="max-w-7xl mx-auto py-16 lg:py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <h3 className="text-4xl lg:text-5xl font-bold text-primary">256-bit</h3>
                <p className="text-lg text-muted-foreground">Military-grade encryption</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl lg:text-5xl font-bold text-primary">24/7</h3>
                <p className="text-lg text-muted-foreground">Available worldwide</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl lg:text-5xl font-bold text-primary">100%</h3>
                <p className="text-lg text-muted-foreground">Private & secure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
