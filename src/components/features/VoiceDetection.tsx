import React, { useState } from "react";

const VoiceDetection = () => {
  const [isListening, setIsListening] = useState(false);

  const toggleDetection = () => {
    setIsListening(!isListening);
    console.log(isListening ? "Stopped listening" : "Started listening");
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-semibold mb-4">Voice Threat Detection</h2>

      <p className="text-gray-600 mb-6">
        This feature detects stress or threat patterns in voice.
      </p>

      <button
        onClick={toggleDetection}
        className={`px-6 py-3 rounded-lg text-white text-lg transition ${
          isListening ? "bg-red-500" : "bg-green-600"
        }`}
      >
        {isListening ? "Stop Detection" : "Start Voice Detection"}
      </button>

      <p className="mt-4 text-gray-500">
        Status:{" "}
        <span className={isListening ? "text-red-500" : "text-green-600"}>
          {isListening ? "Listening..." : "Idle"}
        </span>
      </p>
    </div>
  );
};

export default VoiceDetection;
