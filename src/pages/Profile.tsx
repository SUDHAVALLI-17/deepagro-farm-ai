import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  User,
  MapPin,
  Sprout,
  Bell,
  Globe,
  Info,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Profile = () => {
  return (
    <div className="pb-20 min-h-screen">
      <PageHeader title="Profile" subtitle="Manage your account" showBack={false} />

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Profile Info */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-2xl font-bold">
              JD
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">John Doe</h2>
              <p className="text-sm text-muted-foreground">Farmer</p>
              <Button variant="link" className="p-0 h-auto text-primary">
                Edit Profile
              </Button>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Location:</span>
              <span className="font-medium">Karnataka, India</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Sprout className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Farm Size:</span>
              <span className="font-medium">5 Acres</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Sprout className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Primary Crops:</span>
              <span className="font-medium">Rice, Cotton</span>
            </div>
          </div>
        </Card>

        {/* Settings */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notifications
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive alerts and updates
                </p>
              </div>
              <Switch id="push-notifications" defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="weather-alerts">Weather Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get weather warnings
                </p>
              </div>
              <Switch id="weather-alerts" defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="pest-alerts">Pest Outbreak Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Regional pest warnings
                </p>
              </div>
              <Switch id="pest-alerts" defaultChecked />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="tips">Tips & Suggestions</Label>
                <p className="text-sm text-muted-foreground">
                  Daily farming tips
                </p>
              </div>
              <Switch id="tips" />
            </div>
          </div>
        </Card>

        {/* Preferences */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Preferences
          </h3>

          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-start">
              <Globe className="h-4 w-4 mr-3" />
              Language: English
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <User className="h-4 w-4 mr-3" />
              Units: Metric
            </Button>
          </div>
        </Card>

        {/* App Information */}
        <Card className="p-6 mb-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            App Information
          </h3>

          <div className="space-y-3">
            <Button variant="ghost" className="w-full justify-start">
              <Info className="h-4 w-4 mr-3" />
              About DeepAgro
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <HelpCircle className="h-4 w-4 mr-3" />
              Help & Support
            </Button>
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-sm text-muted-foreground">Version</span>
              <span className="text-sm font-medium">1.0.0</span>
            </div>
          </div>
        </Card>

        {/* Logout */}
        <Button variant="destructive" className="w-full">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;
