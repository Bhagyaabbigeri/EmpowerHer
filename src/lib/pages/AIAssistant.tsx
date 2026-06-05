import { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, Shield, Scale, Swords, AlertTriangle } from "lucide-react";

type Message = {
  role: 'assistant' | 'user';
  content: string;
};

const quickQuestions = [
  { icon: Shield, text: "What are my rights if harassed?" },
  { icon: Scale, text: "How to file a police complaint?" },
  { icon: Swords, text: "Basic self-defense tips" },
  { icon: AlertTriangle, text: "What to do in an emergency?" }
];

const responses: Record<string, string> = {
  "rights": "If you're being harassed, you have the right to file a complaint under Section 354 (assault to outrage modesty) or Section 509 IPC (insulting modesty). You can also file under the Sexual Harassment of Women at Workplace Act, 2013 if it's workplace-related. Always document evidence and report to the nearest police station or Women's Helpline 181.",
  "police": "To file a police complaint: 1) Go to the nearest police station or call 100/181. 2) File a written complaint (FIR for cognizable offenses). 3) Get a copy of the FIR. 4) You can also file online through the state police portal. Remember, the police MUST register your complaint - it's your legal right.",
  "self-defense": "Basic self-defense tips: 1) Stay aware of your surroundings. 2) Trust your instincts. 3) Use your voice loudly to attract attention. 4) Target vulnerable areas: eyes, nose, throat, groin. 5) Use everyday objects as shields. 6) Create distance and escape when possible. 7) Take a self-defense class.",
  "emergency": "In an emergency: 1) Call 100 (Police) or 181 (Women Helpline). 2) Use SOS features on your phone. 3) Share your live location with trusted contacts. 4) Make noise to attract attention. 5) Move towards crowded areas. 6) Remember key helplines: NCW - 7827-170-170, Domestic Violence - 181."
};

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your safety assistant. Ask me anything about self-defense, safety laws, emergency tips, or legal rights."
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getResponse = (question: string): string => {
    const q = question.toLowerCase();
    if (q.includes('right') || q.includes('harass')) return responses.rights;
    if (q.includes('police') || q.includes('complaint') || q.includes('fir')) return responses.police;
    if (q.includes('self') || q.includes('defense') || q.includes('defend')) return responses['self-defense'];
    if (q.includes('emergency') || q.includes('help') || q.includes('danger')) return responses.emergency;
    
    return "I can help you with information about safety laws, self-defense tips, emergency procedures, and your legal rights. Please ask me a specific question about these topics, or tap one of the quick question buttons above!";
  };

  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getResponse(messageText);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <Header />
      
      <main className="px-4 py-6 space-y-4 max-w-lg mx-auto">
        {/* Hero Section */}
        <section className="text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 text-primary mb-2">
            <Bot className="h-6 w-6" />
            <h1 className="font-display text-2xl font-bold text-gradient">
              WSafe AI Assistant
            </h1>
          </div>
        </section>

        {/* Quick Questions */}
        <section className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex flex-wrap gap-2 justify-center">
            {quickQuestions.map((q, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs gap-1"
                onClick={() => handleSend(q.text)}
              >
                <q.icon className="h-3 w-3" />
                {q.text}
              </Button>
            ))}
          </div>
        </section>

        {/* Chat Area */}
        <section className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <Card className="min-h-[400px] flex flex-col">
            <CardContent className="p-4 flex-1 overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-coral-light text-foreground rounded-bl-md'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <span className="text-coral font-semibold text-xs block mb-1">WSafe:</span>
                    )}
                    {message.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-coral-light text-foreground p-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-coral rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-coral rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-coral rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Fixed Input Area */}
      <div className="fixed bottom-20 left-0 right-0 p-4 bg-background border-t">
        <div className="max-w-lg mx-auto flex gap-2">
          <Input
            placeholder="Type a safety-related question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          <Button 
            onClick={() => handleSend()}
            className="bg-coral hover:bg-coral/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default AIAssistant;
