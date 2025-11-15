import { FeatureCard } from "@/components/FeatureCard";
import { Card } from "@/components/ui/card";
import { Leaf, Bug, Beaker, MessageCircle, Cloud, Droplets, ThermometerSun, Bell } from "lucide-react";

const Home = () => {
  const weatherData = {
    temperature: 28,
    humidity: 65,
    rainfall: "Low",
  };

  return (
    <div className="pb-20 min-h-screen">
      {/* Header */}
      <div className="gradient-crop text-white px-4 pt-6 pb-8 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Hello, Farmer! 👋</h1>
              <p className="text-white/90 text-sm flex items-center gap-1">
                <Cloud className="h-4 w-4" />
                Your Location
              </p>
            </div>
            <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition">
              <Bell className="h-5 w-5" />
            </button>
          </div>

          {/* Weather Cards */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="bg-white/10 backdrop-blur border-white/20 p-4 text-center">
              <ThermometerSun className="h-6 w-6 mx-auto mb-2 text-white" />
              <div className="text-2xl font-bold text-white">{weatherData.temperature}°C</div>
              <div className="text-xs text-white/80">Temperature</div>
            </Card>
            <Card className="bg-white/10 backdrop-blur border-white/20 p-4 text-center">
              <Droplets className="h-6 w-6 mx-auto mb-2 text-white" />
              <div className="text-2xl font-bold text-white">{weatherData.humidity}%</div>
              <div className="text-xs text-white/80">Humidity</div>
            </Card>
            <Card className="bg-white/10 backdrop-blur border-white/20 p-4 text-center">
              <Cloud className="h-6 w-6 mx-auto mb-2 text-white" />
              <div className="text-2xl font-bold text-white">{weatherData.rainfall}</div>
              <div className="text-xs text-white/80">Rainfall</div>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-lg mx-auto px-4 mt-6">
        <h2 className="text-xl font-bold mb-4">Smart Agriculture Tools</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <FeatureCard
            title="Crop Prediction"
            icon={Leaf}
            gradient="gradient-crop"
            to="/crop-prediction"
          />
          <FeatureCard
            title="Disease Detection"
            icon={Bug}
            gradient="gradient-disease"
            to="/disease-detection"
          />
          <FeatureCard
            title="Fertilizer Guide"
            icon={Beaker}
            gradient="gradient-fertilizer"
            to="/fertilizer-prediction"
          />
          <FeatureCard
            title="AI Assistant"
            icon={MessageCircle}
            gradient="gradient-ai"
            to="/assistant"
          />
        </div>

        {/* Quick Tips */}
        <Card className="p-4 mb-6 border-l-4 border-l-primary">
          <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
            <Leaf className="h-5 w-5" />
            Today's Farming Tip
          </h3>
          <p className="text-sm text-muted-foreground">
            Early morning is the best time for irrigation as it reduces water loss due to evaporation and allows plants to absorb nutrients efficiently.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Home;
