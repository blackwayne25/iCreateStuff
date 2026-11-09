import { useEffect } from 'react';

const hasSpeechSynthesis =
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    'SpeechSynthesisUtterance' in window;

const useAIVoice = (text, triggerVoice, onTransition, onComplete) => {
    useEffect(() => {
        if (!hasSpeechSynthesis) {
            return undefined;
        }

        const speak = (message) => {
            if (!message) {
                return;
            }

            const utterance = new window.SpeechSynthesisUtterance(message);
            // Queue speech without interrupting other speech sources.
            window.speechSynthesis.speak(utterance);
        };

        if (triggerVoice) {
            speak(text);
        } else if (onTransition) {
            speak('Transitioning to the next screen!');
        } else if (onComplete) {
            speak('Stage completed!');
        }
    }, [text, triggerVoice, onTransition, onComplete]);
};

export default useAIVoice;
