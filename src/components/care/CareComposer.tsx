import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mic, MicOff, SendHorizonal } from "lucide-react";

import { Button } from "../common/Button";
import type { CarePageContent } from "../../types/care";

type SpeechRecognitionResultLike = {
  transcript?: string;
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: Array<Array<SpeechRecognitionResultLike>>;
};

type SpeechRecognitionInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

export interface CareComposerProps {
  placeholder: CarePageContent["composerPlaceholder"];
  isSending?: boolean;
  onSend: (message: string) => Promise<boolean | void> | boolean | void;
}

export function CareComposer({ placeholder, isSending = false, onSend }: CareComposerProps) {
  const shouldReduceMotion = useReducedMotion();
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const baseMessageRef = useRef("");

  useEffect(() => {
    const speechWindow = window as typeof window & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    const SpeechRecognitionAPI = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      return;
    }

    const recognition = new (SpeechRecognitionAPI as SpeechRecognitionConstructor)();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      let transcript = "";

      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        transcript += event.results[index][0]?.transcript || "";
      }

      const trimmedTranscript = transcript.trim();

      if (!trimmedTranscript) {
        return;
      }

      const baseMessage = baseMessageRef.current.trim();
      setMessage(baseMessage ? `${baseMessage} ${trimmedTranscript}` : trimmedTranscript);
    };

    recognition.onend = () => {
      setIsListening(false);
      baseMessageRef.current = "";
    };

    recognition.onerror = () => {
      setIsListening(false);
      baseMessageRef.current = "";
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, []);

  const handleMicClick = () => {
    const recognition = recognitionRef.current;

    if (!recognition || isSending) {
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
      return;
    }

    baseMessageRef.current = message;
    setIsListening(true);

    try {
      recognition.start();
    } catch (_error) {
      setIsListening(false);
      baseMessageRef.current = "";
    }
  };

  const handleSubmit = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isSending) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }

    const didSend = await onSend(trimmedMessage);

    if (didSend !== false) {
      setMessage("");
    }
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
      className="fixed bottom-[88px] left-0 right-0 z-20 w-full bg-gradient-to-t from-background via-background to-transparent px-gutter pb-5 pt-12 pointer-events-none lg:bottom-0 lg:left-64 lg:w-[calc(100%-256px)]"
    >
      <div className="mx-auto max-w-4xl pointer-events-auto relative lg:px-8">
        <form
          className="flex items-center gap-2 rounded-[1.4rem] border border-outline/70 bg-surface/95 px-3 py-3 shadow-soft backdrop-blur-xl transition-all focus-within:border-primary/30 focus-within:ring-2 focus-within:ring-primary/10 sm:gap-3 sm:px-4"
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit();
          }}
        >
          <Button
            variant="ghost"
            size="sm"
            className="h-11 w-11 shrink-0 rounded-full px-0 text-secondary hover:bg-primary-soft hover:text-primary"
            aria-label={isListening ? "Stop voice input" : "Voice input"}
            type="button"
            onClick={handleMicClick}
            disabled={isSending}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>

          <div className="relative min-w-0 flex-1">
            <input
              className="h-11 w-full appearance-none border-0 bg-transparent px-0 text-sm text-text outline-none ring-0 placeholder:text-text-muted focus:border-transparent focus:outline-none focus:ring-0 sm:text-base"
              placeholder={placeholder}
              type="text"
              value={message}
              disabled={isSending}
              onChange={(event) => setMessage(event.target.value)}
            />
          </div>

          <Button
            variant="primary"
            size="sm"
            className="h-11 w-11 shrink-0 rounded-full px-0 shadow-none"
            aria-label="Send message"
            type="submit"
            disabled={!message.trim() || isSending}
          >
            <SendHorizonal className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </motion.div>
  );
}
