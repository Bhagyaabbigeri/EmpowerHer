import { Card, CardContent } from "@/components/ui/card";
import { EmergencyAlert } from "@/components/EmergencyAlert";

export default function EmergencyAlertPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Card className="border-red-200 hover:border-red-300 transition-colors">
          <CardContent className="pt-6">
            <EmergencyAlert />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
