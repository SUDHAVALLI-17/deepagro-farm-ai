import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  Bug,
  Beaker,
  MessageCircle,
  MoreVertical,
  Share2,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("all");
  const [history, setHistory] = useState(mockHistory);

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
        return t("history_type_crop");
      case "disease":
        return t("history_type_disease");
      case "fertilizer":
        return t("history_type_fertilizer");
      default:
        return t("history_type_chat");
    }
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(t("confirm_delete"));
    if (!confirmed) return;

    setHistory((prev) => prev.filter((item) => item.id !== id));
    // 🔜 later: also call backend/Supabase delete here
  };

  const filteredHistory =
    activeTab === "all"
      ? history
      : history.filter((item) => item.type === activeTab);

  return (
    <div className="pb-20 min-h-screen">
      <PageHeader
        title={t("history")}
        subtitle={t("history_subtitle")}
        showBack={false}
      />

      <div className="max-w-lg mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">{t("history_tab_all")}</TabsTrigger>
            <TabsTrigger value="crop">{t("history_tab_crop")}</TabsTrigger>
            <TabsTrigger value="disease">
              {t("history_tab_disease")}
            </TabsTrigger>
            <TabsTrigger value="fertilizer">
              {t("history_tab_fertilizer")}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="space-y-4">
          {filteredHistory.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">{t("no_history")}</p>
            </Card>
          ) : (
            filteredHistory.map((item) => (
              <Card
                key={item.id}
                className="p-4 hover:shadow-md transition-shadow"
              >
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
                          <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              // TODO: implement share later
                              // e.g. navigator.share(...) if supported
                            }}
                          >
                            <Share2 className="h-4 w-4 mr-2" />
                            {t("share")}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            {t("delete")}
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
                        {item.confidence}% {t("confidence")}
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
