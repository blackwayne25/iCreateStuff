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
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
        };

        if (triggerVoice) {
            speak(text);
        } else if (onTransition) {
            speak('Transitioning to the next screen!');
        } else if (onComplete) {
            speak('Stage completed!');
        }

        return () => {
            window.speechSynthesis.cancel();
        };
    }, [text, triggerVoice, onTransition, onComplete]);
};

export default useAIVoice;
