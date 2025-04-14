
import React, { useState, useRef } from 'react';
import { Camera, X, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface CaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCapture: (image: string, reflection: string, prompt: string) => void;
  dailyPrompt: string;
}

const CaptureModal: React.FC<CaptureModalProps> = ({ 
  open, 
  onOpenChange, 
  onCapture,
  dailyPrompt
}) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [reflection, setReflection] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const startCamera = async () => {
    try {
      setIsCapturing(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Unable to access camera');
      setIsCapturing(false);
    }
  };
  
  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCapturing(false);
    }
  };
  
  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(dataUrl);
        stopCamera();
        toast.success('Image captured!');
      }
    }
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCapturedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleSubmit = () => {
    if (capturedImage) {
      onCapture(capturedImage, reflection, dailyPrompt);
      resetForm();
    } else {
      toast.error('Please capture or upload an image first');
    }
  };
  
  const resetForm = () => {
    setCapturedImage(null);
    setReflection('');
    stopCamera();
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) stopCamera();
      onOpenChange(open);
    }}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-center">
            {capturedImage ? 'Capture Your Reflection' : 'Capture a Moment of Wonder'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="text-center mb-4">
            <p className="text-muted-foreground italic">"{dailyPrompt}"</p>
          </div>
          
          {!capturedImage ? (
            <div className="space-y-4">
              {isCapturing ? (
                <div className="relative rounded-lg overflow-hidden bg-muted aspect-video">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                    onClick={stopCamera}
                  >
                    <X size={16} />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="bg-muted rounded-full p-3">
                      <ImageIcon size={24} className="text-muted-foreground" />
                    </div>
                    <h3 className="font-medium">No image captured yet</h3>
                    <p className="text-sm text-muted-foreground">
                      Use your camera or upload an image
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex justify-center gap-4 mt-4">
                {isCapturing ? (
                  <Button onClick={captureImage} className="flex items-center gap-2 bg-wonder-600 hover:bg-wonder-700">
                    <Camera size={16} />
                    Capture Now
                  </Button>
                ) : (
                  <>
                    <Button onClick={startCamera} className="flex items-center gap-2 bg-wonder-600 hover:bg-wonder-700">
                      <Camera size={16} />
                      Use Camera
                    </Button>
                    <Button onClick={handleUploadClick} variant="outline" className="flex items-center gap-2">
                      <ImageIcon size={16} />
                      Upload Image
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleFileSelect} 
                      />
                    </Button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={capturedImage} 
                  alt="Captured moment" 
                  className="w-full object-contain max-h-[300px]" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reflection">Your Reflection</Label>
                <Textarea 
                  id="reflection"
                  placeholder="What does this moment make you feel or think about?"
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={resetForm}>
            Cancel
          </Button>
          
          {capturedImage && (
            <Button onClick={handleSubmit} className="bg-nature-600 hover:bg-nature-700 flex items-center gap-2">
              <CheckCircle size={16} />
              Save This Moment
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CaptureModal;
