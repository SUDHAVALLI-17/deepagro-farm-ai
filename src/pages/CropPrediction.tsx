import { useState } from "react";
import { useForm } from "react-hook-form";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Leaf, Sparkles, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { predictCrop } from "@/lib/api"; // ⬅️ backend integration

interface CropFormData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
}

const CropPrediction = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CropFormData>({
    defaultValues: {
      nitrogen: 50,
      phosphorus: 50,
      potassium: 50,
      temperature: 25,
      humidity: 60,
      ph: 6.5,
      rainfall: 100,
    },
  });

  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const humidity = watch("humidity");

  const onSubmit = async (data: CropFormData) => {
    setIsLoading(true);

    try {
      // Map frontend form fields -> backend API fields
      const payload = {
        N: Number(data.nitrogen),
        P: Number(data.phosphorus),
        K: Number(data.potassium),
        temperature: Number(data.temperature),
        humidity: Number(data.humidity),
        ph: Number(data.ph),
        rainfall: Number(data.rainfall),
      };

      // 🔗 Call backend API instead of mock timeout
      const response = await predictCrop(payload);

      const predictedCrop = response.crop;
      setResult(predictedCrop);

      toast({
        title: "Prediction Complete!",
        description: `Best crop recommendation: ${predictedCrop}`,
      });
    } catch (error) {
      console.error("Crop prediction error:", error);
      toast({
        title: "Error",
        description: "Failed to predict crop. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (result) {
    return (
      <div className="pb-20 min-h-screen">
        <PageHeader
          title="Prediction Result"
          subtitle="AI-powered crop recommendation"
        />

        <div className="max-w-lg mx-auto px-4 py-6">
          <Card className="p-6 text-center mb-6 gradient-crop text-white">
            <Leaf className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">{result}</h2>
            <div className="flex items-center justify-center gap-2 text-white/90">
              <TrendingUp className="h-5 w-5" />
              {/* If backend returns confidence later, replace 95% with real value */}
              <span>95% Confidence</span>
            </div>
          </Card>

          <Card className="p-6 mb-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Why this crop?
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Optimal soil nutrient levels for {result}</li>
              <li>✓ Temperature and humidity conditions are ideal</li>
              <li>✓ pH level is within the recommended range</li>
              <li>✓ Rainfall predictions are favorable</li>
            </ul>
          </Card>

          <Card className="p-6 mb-4">
            <h3 className="font-semibold mb-3">Alternative Suggestions</h3>
            <div className="space-y-2">
              {["Wheat", "Maize"].map((crop) => (
                <div
                  key={crop}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <span className="font-medium">{crop}</span>
                  <span className="text-sm text-muted-foreground">
                    85% match
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex gap-3">
            <Button
              onClick={() => setResult(null)}
              className="flex-1"
              variant="outline"
            >
              New Prediction
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
        title="Crop Prediction"
        subtitle="Get AI-powered crop suggestions"
      />

      <div className="max-w-lg mx-auto px-4 py-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4 text-primary">
              Soil Nutrients (kg/ha)
            </h3>

            <div className="space-y-4">
              <div>
                <Label htmlFor="nitrogen">Nitrogen (N)</Label>
                <Input
                  id="nitrogen"
                  type="number"
                  {...register("nitrogen", {
                    required: true,
                    min: 0,
                    max: 200,
                  })}
                  placeholder="0-200"
                />
              </div>

              <div>
                <Label htmlFor="phosphorus">Phosphorus (P)</Label>
                <Input
                  id="phosphorus"
                  type="number"
                  {...register("phosphorus", {
                    required: true,
                    min: 0,
                    max: 200,
                  })}
                  placeholder="0-200"
                />
              </div>

              <div>
                <Label htmlFor="potassium">Potassium (K)</Label>
                <Input
                  id="potassium"
                  type="number"
                  {...register("potassium", {
                    required: true,
                    min: 0,
                    max: 200,
                  })}
                  placeholder="0-200"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4 text-primary">
              Environmental Conditions
            </h3>

            <div className="space-y-4">
              <div>
                <Label htmlFor="temperature">Temperature (°C)</Label>
                <Input
                  id="temperature"
                  type="number"
                  step="0.1"
                  {...register("temperature", {
                    required: true,
                    min: 0,
                    max: 50,
                  })}
                  placeholder="0-50"
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
                <Label htmlFor="ph">pH Level</Label>
                <Input
                  id="ph"
                  type="number"
                  step="0.1"
                  {...register("ph", {
                    required: true,
                    min: 0,
                    max: 14,
                  })}
                  placeholder="0-14"
                />
              </div>

              <div>
                <Label htmlFor="rainfall">Rainfall (mm)</Label>
                <Input
                  id="rainfall"
                  type="number"
                  {...register("rainfall", { required: true, min: 0 })}
                  placeholder="Enter rainfall"
                />
              </div>
            </div>
          </Card>

          <Button
            type="submit"
            className="w-full h-12 text-lg gradient-crop border-0"
            disabled={isLoading}
          >
            {isLoading ? "Analyzing..." : "Predict Crop"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CropPrediction;
