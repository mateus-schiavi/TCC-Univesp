export interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export interface ChatBotProps {
  isDialog?: boolean;
  isDarkMode?: boolean;
  playSound?: (type: 'message' | 'click' | 'toggle') => void;
  onExpandToPage?: () => void;
  onMinimize?: () => void;
  onClose?: () => void;
  onMinimizeToHome?: () => void;
  onCloseToHome?: () => void;
  messages: Message[];
  addMessage: (message: Message) => void;
}
