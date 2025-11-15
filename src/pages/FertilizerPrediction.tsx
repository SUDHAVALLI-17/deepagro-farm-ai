import { useState } from "react";
import { useForm } from "react-hook-form";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Beaker, Sparkles, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FertilizerFormData {
  temperature: number;
  humidity: number;
  moisture: number;
  soilType: string;
  cropType: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

const FertilizerPrediction = () => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FertilizerFormData>({
    defaultValues: {
      temperature: 25,
      humidity: 60,
      moisture: 50,
      nitrogen: 50,
      phosphorus: 50,
      potassium: 50,
    }
  });
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const humidity = watch("humidity");
  const moisture = watch("moisture");

  const onSubmit = async (data: FertilizerFormData) => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const fertilizers = ["Urea", "DAP", "NPK 10:26:26", "NPK 19:19:19", "Potash", "Ammonium Sulphate"];
      const predictedFertilizer = fertilizers[Math.floor(Math.random() * fertilizers.length)];
      
      setResult(predictedFertilizer);
      toast({
        title: "Recommendation Ready!",
        description: `Best fertilizer: ${predictedFertilizer}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to predict fertilizer. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (result) {
    return (
      <div className="pb-20 min-h-screen">
        <PageHeader title="Fertilizer Recommendation" subtitle="Optimized for your field" />
        
        <div className="max-w-lg mx-auto px-4 py-6">
          <Card className="p-6 text-center mb-6 gradient-fertilizer text-white">
            <Beaker className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">{result}</h2>
            <p className="text-white/90">Recommended Fertilizer</p>
          </Card>

          <Card className="p-6 mb-4">
            <h3 className="font-semibold mb-3">NPK Ratio</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <div className="text-2xl font-bold text-primary">19</div>
                <div className="text-xs text-muted-foreground">Nitrogen</div>
              </div>
              <div className="text-center p-3 bg-accent/10 rounded-lg">
                <div className="text-2xl font-bold text-accent">19</div>
                <div className="text-xs text-muted-foreground">Phosphorus</div>
              </div>
              <div className="text-center p-3 bg-warning/10 rounded-lg">
                <div className="text-2xl font-bold text-warning">19</div>
                <div className="text-xs text-muted-foreground">Potassium</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 mb-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Application Guidelines
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between p-3 bg-muted rounded-lg">
                <span className="text-muted-foreground">Quantity per Acre</span>
                <span className="font-semibold">50 kg</span>
              </div>
              <div className="flex justify-between p-3 bg-muted rounded-lg">
                <span className="text-muted-foreground">Application Timing</span>
                <span className="font-semibold">Before Sowing</span>
              </div>
              <div className="flex justify-between p-3 bg-muted rounded-lg">
                <span className="text-muted-foreground">Method</span>
                <span className="font-semibold">Broadcasting</span>
              </div>
              <div className="flex justify-between p-3 bg-muted rounded-lg">
                <span className="text-muted-foreground">Estimated Cost</span>
                <span className="font-semibold">₹1,200</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 mb-4 border-l-4 border-l-warning">
            <h3 className="font-semibold mb-2 text-warning">Safety Precautions</h3>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Wear gloves and mask during application</li>
              <li>• Keep away from water sources</li>
              <li>• Store in cool, dry place</li>
              <li>• Follow recommended dosage</li>
            </ul>
          </Card>

          <div className="flex gap-3">
            <Button onClick={() => setResult(null)} className="flex-1" variant="outline">
              New Prediction
            </Button>
            <Button className="flex-1 bg-accent hover:bg-accent/90">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Buy Nearby
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20 min-h-screen">
      <PageHeader
        title="Fertilizer Prediction"
        subtitle="Get precise fertilizer suggestions"
      />
      
      <div className="max-w-lg mx-auto px-4 py-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4 text-primary">Environmental Conditions</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="temperature">Temperature (°C)</Label>
                <Input
                  id="temperature"
                  type="number"
                  step="0.1"
                  {...register("temperature", { required: true })}
                />
              </div>

              <div>
                <Label>Humidity: {humidity}%</Label>
                <Slider
                  value={[humidity]}
                  onValueChange={(value) => setValue("humidity", value[0])}
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Soil Moisture: {moisture}%</Label>
                <Slider
                  value={[moisture]}
                  onValueChange={(value) => setValue("moisture", value[0])}
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4 text-primary">Soil & Crop Details</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="soilType">Soil Type</Label>
                <Select onValueChange={(value) => setValue("soilType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="red">Red Soil</SelectItem>
                    <SelectItem value="black">Black Soil</SelectItem>
                    <SelectItem value="alluvial">Alluvial Soil</SelectItem>
                    <SelectItem value="clay">Clay Soil</SelectItem>
                    <SelectItem value="sandy">Sandy Soil</SelectItem>
                    <SelectItem value="loamy">Loamy Soil</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="cropType">Crop Type</Label>
                <Select onValueChange={(value) => setValue("cropType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="cotton">Cotton</SelectItem>
                    <SelectItem value="sugarcane">Sugarcane</SelectItem>
                    <SelectItem value="maize">Maize</SelectItem>
                    <SelectItem value="groundnut">Groundnut</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4 text-primary">Current Soil Nutrients (kg/ha)</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="nitrogen">Nitrogen (N)</Label>
                <Input
                  id="nitrogen"
                  type="number"
                  {...register("nitrogen", { required: true })}
                />
              </div>

              <div>
                <Label htmlFor="phosphorus">Phosphorus (P)</Label>
                <Input
                  id="phosphorus"
                  type="number"
                  {...register("phosphorus", { required: true })}
                />
              </div>

              <div>
                <Label htmlFor="potassium">Potassium (K)</Label>
                <Input
                  id="potassium"
                  type="number"
                  {...register("potassium", { required: true })}
                />
              </div>
            </div>
          </Card>

          <Button
            type="submit"
            className="w-full h-12 text-lg gradient-fertilizer border-0"
            disabled={isLoading}
          >
            {isLoading ? "Analyzing..." : "Get Recommendation"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FertilizerPrediction;
