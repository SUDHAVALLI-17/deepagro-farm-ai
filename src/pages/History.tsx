import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Leaf, Bug, Beaker, MessageCircle, MoreVertical, Share2, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockHistory = [
  {
    id: "1",
    type: "crop",
    title: "Rice Prediction",
    result: "Rice",
    date: new Date(2025, 0, 10),
    confidence: 95,
  },
  {
    id: "2",
    type: "disease",
    title: "Leaf Blight Detection",
    result: "Leaf Blight - Moderate",
    date: new Date(2025, 0, 9),
    confidence: 92,
  },
  {
    id: "3",
    type: "fertilizer",
    title: "NPK Recommendation",
    result: "NPK 19:19:19",
    date: new Date(2025, 0, 8),
    confidence: 88,
  },
  {
    id: "4",
    type: "crop",
    title: "Wheat Prediction",
    result: "Wheat",
    date: new Date(2025, 0, 7),
    confidence: 91,
  },
];

const History = () => {
  const [activeTab, setActiveTab] = useState("all");

  const getIcon = (type: string) => {
    switch (type) {
      case "crop":
        return <Leaf className="h-5 w-5 text-primary" />;
      case "disease":
        return <Bug className="h-5 w-5 text-destructive" />;
      case "fertilizer":
        return <Beaker className="h-5 w-5 text-accent" />;
      default:
        return <MessageCircle className="h-5 w-5 text-purple-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "crop":
        return "Crop";
      case "disease":
        return "Disease";
      case "fertilizer":
        return "Fertilizer";
      default:
        return "Chat";
    }
  };

  const filteredHistory =
    activeTab === "all"
      ? mockHistory
      : mockHistory.filter((item) => item.type === activeTab);

  return (
    <div className="pb-20 min-h-screen">
      <PageHeader
        title="History"
        subtitle="Your predictions and consultations"
        showBack={false}
      />

      <div className="max-w-lg mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="crop">Crop</TabsTrigger>
            <TabsTrigger value="disease">Disease</TabsTrigger>
            <TabsTrigger value="fertilizer">Fertilizer</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          {filteredHistory.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No records found</p>
            </Card>
          ) : (
            filteredHistory.map((item) => (
              <Card key={item.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-muted">
                    {getIcon(item.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.date.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="shrink-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge variant="outline">{getTypeLabel(item.type)}</Badge>
                      <span className="text-sm font-medium text-foreground">
                        {item.result}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.confidence}% confidence
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
