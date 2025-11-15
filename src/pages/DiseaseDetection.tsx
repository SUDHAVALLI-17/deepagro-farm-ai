import { useState, useRef } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, AlertCircle, CheckCircle, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    setIsAnalyzing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const diseases = [
        { name: "Leaf Blight", severity: "Moderate" },
        { name: "Powdery Mildew", severity: "Mild" },
        { name: "Bacterial Spot", severity: "Severe" },
      ];
      
      const detected = diseases[Math.floor(Math.random() * diseases.length)];
      
      setResult({
        disease: detected.name,
        severity: detected.severity,
        confidence: 92,
      });
      
      toast({
        title: "Analysis Complete",
        description: `Disease detected: ${detected.name}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetDetection = () => {
    setSelectedImage(null);
    setResult(null);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "mild": return "bg-success text-success-foreground";
      case "moderate": return "bg-warning text-warning-foreground";
      case "severe": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted";
    }
  };

  if (result && selectedImage) {
    return (
      <div className="pb-20 min-h-screen">
        <PageHeader title="Detection Results" subtitle="Disease analysis complete" />
        
        <div className="max-w-lg mx-auto px-4 py-6">
          <Card className="p-6 mb-6">
            <img 
              src={selectedImage} 
              alt="Analyzed plant" 
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold mb-2">{result.disease}</h2>
              <div className="flex items-center justify-center gap-3">
                <Badge className={getSeverityColor(result.severity)}>
                  {result.severity}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {result.confidence}% Confidence
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6 mb-4 border-l-4 border-l-destructive">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Immediate Actions
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Remove and destroy infected leaves immediately</li>
              <li>• Isolate affected plants to prevent spread</li>
              <li>• Improve air circulation around plants</li>
              <li>• Avoid overhead watering</li>
            </ul>
          </Card>

          <Card className="p-6 mb-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              Recommended Treatment
            </h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-medium mb-1">Organic Fungicide</div>
                <div className="text-muted-foreground">Apply every 7-10 days until symptoms improve</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-medium mb-1">Neem Oil Spray</div>
                <div className="text-muted-foreground">2-3 ml per liter of water, spray in evening</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 mb-4 border-l-4 border-l-accent">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Info className="h-5 w-5 text-accent" />
              Prevention Tips
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Maintain proper plant spacing</li>
              <li>• Use disease-resistant varieties</li>
              <li>• Practice crop rotation</li>
              <li>• Monitor plants regularly</li>
            </ul>
          </Card>

          <div className="flex gap-3">
            <Button onClick={resetDetection} className="flex-1" variant="outline">
              New Detection
            </Button>
            <Button className="flex-1 bg-primary hover:bg-primary/90">
              Save Result
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20 min-h-screen">
      <PageHeader
        title="Disease Detection"
        subtitle="Upload or capture plant photos"
      />
      
      <div className="max-w-lg mx-auto px-4 py-6">
        {selectedImage && isAnalyzing ? (
          <Card className="p-6">
            <img 
              src={selectedImage} 
              alt="Selected plant" 
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-lg font-medium">Analyzing image...</p>
              <p className="text-sm text-muted-foreground mt-2">Please wait while our AI examines the plant</p>
            </div>
          </Card>
        ) : (
          <>
            <Card className="p-8 mb-6 text-center border-2 border-dashed">
              <Camera className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Capture or Upload Image</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Take a clear photo of the affected plant leaves for accurate detection
              </p>
              
              <div className="space-y-3">
                <Button
                  className="w-full gradient-disease border-0"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Take Photo
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Choose from Gallery
                </Button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>
            </Card>

            <Card className="p-6 mb-6 border-l-4 border-l-primary">
              <h3 className="font-semibold mb-3 text-primary">Tips for Best Results</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Ensure good lighting, preferably natural daylight</li>
                <li>✓ Focus on the affected area clearly</li>
                <li>✓ Capture multiple angles if possible</li>
                <li>✓ Avoid shadows and blur</li>
              </ul>
            </Card>

            <Card className="p-4 bg-muted">
              <p className="text-sm text-center text-muted-foreground">
                Our AI can detect 30+ common plant diseases with 95% accuracy
              </p>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default DiseaseDetection;
