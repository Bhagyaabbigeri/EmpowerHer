import { Button } from "./ui/button";
import { Shield, AlertTriangle, Zap, HeartPulse } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'threat-detection',
      title: 'AI Threat Detection',
      description: 'Real-time voice threat analysis',
      icon: <Shield className="h-5 w-5" />,
      color: 'bg-red-100 text-red-600',
      hoverColor: 'hover:bg-red-50',
      action: () => navigate('/ai-threat-detection')
    },
    {
      id: 'emergency',
      title: 'Emergency SOS',
      description: 'Quick help in danger',
      icon: <AlertTriangle className="h-5 w-5" />,
      color: 'bg-amber-100 text-amber-600',
      hoverColor: 'hover:bg-amber-50',
      action: () => console.log('Emergency SOS triggered')
    },
    {
      id: 'safety-check',
      title: 'Safety Check-in',
      description: 'Let contacts know you\'re safe',
      icon: <HeartPulse className="h-5 w-5" />,
      color: 'bg-green-100 text-green-600',
      hoverColor: 'hover:bg-green-50',
      action: () => console.log('Safety check-in triggered')
    },
    {
      id: 'quick-help',
      title: 'Quick Help',
      description: 'Get immediate assistance',
      icon: <Zap className="h-5 w-5" />,
      color: 'bg-blue-100 text-blue-600',
      hoverColor: 'hover:bg-blue-50',
      action: () => console.log('Quick help requested')
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            className={`h-24 flex flex-col items-center justify-center gap-2 p-3 text-center ${action.hoverColor}`}
            onClick={action.action}
          >
            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${action.color}`}>
              {action.icon}
            </div>
            <div>
              <p className="text-sm font-medium">{action.title}</p>
              <p className="text-xs text-muted-foreground">{action.description}</p>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
