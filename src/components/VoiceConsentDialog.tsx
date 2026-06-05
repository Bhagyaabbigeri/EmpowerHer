import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Mic, AlertTriangle, CheckCircle2 } from "lucide-react";

type Props = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function VoiceConsentDialog({ open, onConfirm, onCancel }: Props) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-2 text-emerald-600">
            <Mic className="h-5 w-5" />
            <AlertDialogTitle>Enable Voice Threat Detection?</AlertDialogTitle>
          </div>
        </AlertDialogHeader>
        <AlertDialogDescription className="space-y-3">
          <p>
            Voice Threat Detection monitors audio input for danger keywords and automatically triggers an emergency SOS alert.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2">
            <div className="flex gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <span className="text-blue-900">
                <strong>Your browser will request microphone permission.</strong> This is necessary for voice detection to work.
              </span>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 space-y-2">
            <h4 className="font-semibold text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Keywords Monitored
            </h4>
            <p className="text-sm text-emerald-800">
              help, stop, attack, assault, danger, no, SOS, save me, and more.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <h4 className="font-semibold text-gray-900 text-sm mb-2">Privacy & Security</h4>
            <ul className="text-xs text-gray-700 space-y-1">
              <li>✓ Processing happens <strong>on your device only</strong></li>
              <li>✓ Audio is <strong>never recorded</strong> or sent to servers</li>
              <li>✓ You can disable anytime with one tap</li>
            </ul>
          </div>
        </AlertDialogDescription>

        <div className="flex gap-3">
          <AlertDialogCancel onClick={onCancel} className="flex-1">
            Not Now
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
            Enable Voice Detection
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default VoiceConsentDialog;
