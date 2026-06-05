import { useEffect, useRef, useState } from "react";
import { toast } from "@/hooks/use-toast";

type Props = {
  onThreatDetected: () => void | Promise<void>;
};

const KEYWORDS = [
  "help",
  "stop",
  "attack",
  "assault",
  "rape",
  "danger",
  "no",
  "don't",
  "dont",
  "sos",
  "save me",
];

export default function VoiceThreatDetector({ onThreatDetected }: Props) {
  const recognitionRef = useRef<any | null>(null);
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    const win = window as any;
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
      toast({ title: "Voice Detect Unsupported", description: "Your browser does not support the Web Speech API." });
      return;
    }

    setSupported(true);
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      try {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript as string;
          const t = transcript.toLowerCase();
          for (const k of KEYWORDS) {
            if (t.includes(k)) {
              toast({ title: "Voice Threat Detected", description: `Detected keyword: ${k}` });
              if (onThreatDetected) onThreatDetected();
              // stop listening after detection to avoid duplicate triggers
              recognition.stop();
              return;
            }
          }
        }
      } catch (err) {
        console.error("VoiceThreatDetector result handling error:", err);
      }
    };

    recognition.onerror = (e: any) => {
      console.warn("Speech recognition error", e);
    };

    recognition.onend = () => {
      // auto-restart unless explicitly stopped
      try {
        recognition.start();
      } catch (err) {
        // ignore
      }
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (err) {
      console.warn("Could not start speech recognition", err);
    }

    return () => {
      try {
        recognition.onresult = null;
        recognition.onerror = null;
        recognition.onend = null;
        recognition.stop();
      } catch (err) {
        // ignore
      }
    };
  }, [onThreatDetected]);

  return null;
}
