import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Sprout, Target, CheckCircle } from "lucide-react";

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="pb-20 min-h-screen">
      <PageHeader title={t("about_deepagro")} subtitle={t("app_information")} />

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Sprout className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{t("app_name")}</h2>
              <p className="text-sm text-muted-foreground">{t("version")} 1.0.0</p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {t("about_description")}
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Target className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-semibold">{t("our_mission")}</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {t("mission_text")}
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-semibold">{t("features")}</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>{t("feature_1")}</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>{t("feature_2")}</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>{t("feature_3")}</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <span>{t("feature_4")}</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default About;
