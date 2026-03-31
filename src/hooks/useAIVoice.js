import { useEffect } from 'react';

const useAIVoice = (text, triggerVoice, onTransition, onComplete) => {
    useEffect(() => {
        // Function to handle text-to-speech
        const speak = (text) => {
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        };

        // Handle voice triggers for AI personalities
        const handleVoiceTrigger = () => {
            if (triggerVoice) {
                speak(text);
            }
        };

        // Handle screen transitions
        const handleScreenTransition = () => {
            if (onTransition) {
                speak('Transitioning to the next screen!');
            }
        };

        // Handle stage completion messages
        const handleCompletion = () => {
            if (onComplete) {
                speak('Stage completed!');
            }
        };

        // Listen for events
        handleVoiceTrigger();
        handleScreenTransition();
        handleCompletion();

    }, [text, triggerVoice, onTransition, onComplete]);
};

export default useAIVoice;