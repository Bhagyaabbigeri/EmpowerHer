import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import VoiceDetection from "@/components/features/VoiceDetection";

const VoiceDetectionPage = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Voice Detection" />
      <main className="px-4 py-6 max-w-lg mx-auto">
        <VoiceDetection />
      </main>
      <BottomNav />
    </div>
  );
};

export default VoiceDetectionPage;