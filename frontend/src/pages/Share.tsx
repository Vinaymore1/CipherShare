import { useState } from 'react';
import { Upload, Copy, Check, FileText, File, Shield, Activity, Users, Clock, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { FileDropzone } from '@/components/FileDropzone';
import { api } from '@/lib/api';

const Footer = () => (
  <footer className="w-full border-t mt-8">
    <div className="container py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-semibold mb-2">CipherShare</h3>
          <p className="text-sm text-muted-foreground">
            Secure file and text sharing platform with end-to-end
            encryption
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
        <div className="sm:col-span-2 md:col-span-1">
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

export default function Share() {
  const [files, setFiles] = useState(null);
  const [text, setText] = useState('');
  const [shareCode, setShareCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShare = async () => {
    setIsLoading(true);
    try {
      let response;
      if (files) {
        response = await api.uploadFiles(files);
      } else {
        response = await api.shareText(text);
      }
      setShareCode(response.code.toString());
      toast.success(files ? 'Files uploaded successfully!' : 'Text shared successfully!');
    } catch (error) {
      toast.error('Failed to share content');
      console.error('Share error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    toast.success('Code copied to clipboard!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container py-4 md:py-8 px-4 md:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-6 md:space-y-8">
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle>Share Content Securely</CardTitle>
                </div>
                <CardDescription>
                  Your files and messages are encrypted end-to-end for maximum security
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="files" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="files" className="flex items-center gap-2">
                      <File className="h-4 w-4" />
                      Files
                    </TabsTrigger>
                    <TabsTrigger value="text" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Text
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="files" className="space-y-6">
                    <div className="space-y-2">
                      <Label>Upload Files</Label>
                      <FileDropzone files={files} onFilesChange={setFiles} />
                    </div>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={handleShare}
                      disabled={!files || isLoading}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {isLoading ? 'Encrypting & Uploading...' : 'Encrypt & Upload Files'}
                    </Button>
                  </TabsContent>

                  <TabsContent value="text" className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="text">Message</Label>
                      <Textarea
                        id="text"
                        placeholder="Enter your message to share securely..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="min-h-[200px]"
                      />
                    </div>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={handleShare}
                      disabled={!text.trim() || isLoading}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {isLoading ? 'Encrypting & Sharing...' : 'Encrypt & Share Message'}
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {shareCode && (
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <CardTitle>Secure Share Code</CardTitle>
                  </div>
                  <CardDescription>
                    Share this code with others to let them access your {files ? 'files' : 'message'}.
                    The code is valid for 1 hour only.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1">
                      <Input 
                        value={shareCode} 
                        readOnly 
                        className="font-mono text-lg text-center bg-muted"
                      />
                    </div>
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
                    {/* <Button 
                      variant="outline" 
                      size="icon"
                      onClick={copyToClipboard}
                      className="flex-shrink-0 hover:bg-primary/10 hover:text-primary border-2"
                    >
                      {isCopied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button> */}
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    This code is encrypted and can only be used once for security
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6 md:space-y-8">
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
                  description="Average encryption and upload time"
                />
                <StatsCard
                  icon={Lock}
                  title="Security Events"
                  value="0"
                  description="Security incidents in the past 30 days"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Why Choose CipherShare?</CardTitle>
                <CardDescription>
                  Industry-leading security features for your peace of mind
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm">End-to-end encryption</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm">24-hour automatic deletion</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-primary" />
                  <span className="text-sm">Zero-knowledge architecture</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm">Secure team sharing</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}