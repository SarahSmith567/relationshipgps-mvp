import React, { useState } from 'react';

interface VoiceInputButtonProps {
  onTranscription?: (text: string) => void;
  size?: 'small' | 'medium' | 'large';
}

const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({ 
  onTranscription, 
  size = 'medium' 
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  const startRecording = () => {
    setIsRecording(true);
    // TODO: Implement actual voice recording
  };

  const stopRecording = () => {
    setIsRecording(false);
    // TODO: Implement transcription
    const mockTranscription = 'This is a mock transcription';
    if (onTranscription) {
      onTranscription(mockTranscription);
    }
    setShowModal(false);
  };

  const cancelRecording = () => {
    setIsRecording(false);
    setShowModal(false);
  };

  return (
    <>
      <button
        className={`voice-input-button ${size} ${isRecording ? 'recording' : ''}`}
        onClick={handleClick}
        aria-label="Voice input"
      >
        <span className="mic-icon">🎤</span>
      </button>

      {showModal && (
        <div className="voice-modal-overlay" onClick={cancelRecording}>
          <div className="voice-modal" onClick={(e) => e.stopPropagation()}>
            <div className="voice-modal-content">
              <h3>Voice Input</h3>
              
              {!isRecording ? (
                <div className="voice-ready">
                  <div className="mic-icon-large">🎤</div>
                  <p>Tap to start recording</p>
                  <button className="btn btn-primary" onClick={startRecording}>
                    Start Recording
                  </button>
                </div>
              ) : (
                <div className="voice-recording">
                  <div className="recording-indicator">
                    <div className="pulse-dot"></div>
                    <span>Recording...</span>
                  </div>
                  <div className="waveform">
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                    <div className="wave-bar"></div>
                  </div>
                  <button className="btn btn-danger" onClick={stopRecording}>
                    Stop Recording
                  </button>
                </div>
              )}

              <button className="btn btn-secondary" onClick={cancelRecording}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VoiceInputButton;
