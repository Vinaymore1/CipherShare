import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, Search, FileText, File, Shield, Activity, Users, Clock, Lock, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { api } from '@/lib/api';

// const Navbar = () => (
//   <nav className="w-full border-b">
//     <div className="container mx-auto px-4 py-4">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-2">
//           <Shield className="h-6 w-6 text-primary" />
//           <span className="text-xl font-semibold">SecureShare</span>
//         </div>
//       </div>
//     </div>
//   </nav>
// );

const Footer = () => (
  <footer className="w-full border-t mt-8">
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-semibold mb-2">CipherShare</h3>
          <p className="text-sm text-muted-foreground">
            Secure file and text sharing platform with end-to-end encryption
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>vvm82003@gmail.com</li>
            <li>8669131458</li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

const StatsCard = ({ icon: Icon, title, value, description }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-center space-x-2">
        <div className="p-2 bg-primary/10 rounded-full">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2">{description}</p>
    </CardContent>
  </Card>
);

export default function Retrieve() {
  const { code: urlCode } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState(urlCode || '');
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (urlCode) {
      handleRetrieve();
    }
  }, [urlCode]);

  const handleRetrieve = async () => {
    if (!code) return;
    
    setIsLoading(true);
    try {
      // Try to retrieve text first
      try {
        const textResponse = await api.retrieveText(code);
        setContent({
          type: 'text',
          content: textResponse.text
        });
      } catch {
        // If text retrieval fails, try file
        const fileResponse = await api.retrieveFile(code);
        setContent({
          type: 'files',
          content: 'File ready for download',
          downloadUrl: fileResponse.downloadUrl
        });
      }
      toast.success('Content retrieved successfully!');
    } catch (error) {
      console.error('Retrieve error:', error);
      toast.error('Failed to retrieve content');
      setContent(null);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (content?.content) {
      navigator.clipboard.writeText(content.content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      toast.success('Message copied to clipboard!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code) {
      navigate(`/retrieve/${code}`);
    }
  };

  const handleDownload = () => {
    if (content?.downloadUrl) {
      window.location.href = content.downloadUrl;
      toast.success('Download started');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-primary/20">
              <CardHeader className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle className="text-2xl md:text-3xl">Retrieve Shared Content</CardTitle>
                </div>
                <CardDescription className="text-base md:text-lg">
                  Enter the share code to access files or messages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <Label htmlFor="code" className="text-base">Share Code</Label>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Input
                        id="code"
                        placeholder="Enter share code..."
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        className="flex-1 text-base"
                      />
                      <Button 
                        type="submit" 
                        disabled={!code || isLoading}
                        className="w-full sm:w-auto h-12 text-base bg-primary hover:bg-primary/90"
                      >
                        <Search className="mr-2 h-5 w-5" />
                        {isLoading ? 'Finding...' : 'Find Content'}
                      </Button>
                    </div>
                  </div>
                </form>

                {content && (
                  <div className="mt-8 space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {content.type === 'files' ? (
                          <File className="h-5 w-5 text-primary" />
                        ) : (
                          <FileText className="h-5 w-5 text-primary" />
                        )}
                        <h3 className="text-xl md:text-2xl font-semibold">
                          {content.type === 'files' ? 'Shared Files' : 'Shared Message'}
                        </h3>
                      </div>
                      {content.type === 'text' && (
                        <Button
                          variant="outline"
                          onClick={copyToClipboard}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-primary/10 hover:text-primary border-primary/20"
                        >
                          {isCopied ? (
                            <>
                              <Check className="h-4 w-4" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              <span>Copy</span>
                            </>
                          )}
                        </Button>
                      )}
                    </div>

                    {content.type === 'text' ? (
                      <Card className="border-primary/20">
                        <CardContent className="pt-6">
                          <p className="whitespace-pre-wrap text-base md:text-lg">{content.content}</p>
                        </CardContent>
                      </Card>
                    ) : (
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90 h-12 text-base" 
                        onClick={handleDownload}
                      >
                        <Download className="mr-2 h-5 w-5" />
                        Download Files
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Statistics</CardTitle>
                <CardDescription>
                  Real-time metrics about our secure sharing platform
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <StatsCard
                  icon={Activity}
                  title="Active Shares"
                  value="2,847"
                  description="Total active secure shares in the last 24 hours"
                />
                <StatsCard
                  icon={Users}
                  title="Users"
                  value="1k+"
                  description="Trusted users sharing content securely"
                />
                <StatsCard
                  icon={Clock}
                  title="Average Time"
                  value="5.2s"
                  description="Average retrieval time"
                />
                <StatsCard
                  icon={Lock}
                  title="Security Events"
                  value="0"
                  description="Security incidents in the past 30 days"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

