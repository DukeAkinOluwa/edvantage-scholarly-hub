
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Award, Copy, Share2, Check, Twitter, Facebook, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAchievements } from '@/contexts/AchievementContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const ShareableAchievements: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { userPoints, earnedAchievements, getShareableLink } = useAchievements();
  const { toast } = useToast();
  const [shareableLink, setShareableLink] = useState('');
  
  const handleShare = () => {
    const link = getShareableLink();
    setShareableLink(link);
    setIsDialogOpen(true);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareableLink);
    setCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: "The shareable link has been copied to your clipboard"
    });
    
    // Reset copied state after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };
  
  const shareOnSocialMedia = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    let shareUrl = '';
    const text = `Check out my achievements on Edvantage! I've earned ${earnedAchievements.length} achievements and ${userPoints} points.`;
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareableLink)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareableLink)}&quote=${encodeURIComponent(text)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareableLink)}`;
        break;
    }
    
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <Button 
        onClick={handleShare}
        className="flex items-center"
      >
        <Share2 className="h-4 w-4 mr-2" />
        Share Achievements
      </Button>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share your achievements</DialogTitle>
            <DialogDescription>
              Anyone with the link can view your achievements and progress.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center space-x-2 mt-4">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="shareableLink">Shareable Link</Label>
              <Input
                id="shareableLink"
                value={shareableLink}
                readOnly
                className="w-full"
              />
            </div>
            <Button 
              type="button" 
              size="icon" 
              className="px-3"
              onClick={copyToClipboard}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="mt-4">
            <div className="text-sm font-medium mb-2">Or share directly</div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => shareOnSocialMedia('twitter')}
              >
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => shareOnSocialMedia('facebook')}
              >
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => shareOnSocialMedia('linkedin')}
              >
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-start mt-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Award className="h-4 w-4 mr-2" />
              {earnedAchievements.length} achievements · {userPoints} points
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Label component
const Label = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => (
  <label htmlFor={htmlFor} className="text-sm font-medium">
    {children}
  </label>
);

export default ShareableAchievements;
