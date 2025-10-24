import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Send, User, Maximize2, HelpCircle, Minus, X } from 'lucide-react';
import { motion } from 'motion/react';
import { Message as RemoteMessage } from '../types';
import robotIcon from '../assets/robotIcon.png';
import Logo from '../assets/logo.png';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatBotProps {
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

// Respostas curtas e objetivas
const predefinedQA = [
  {
    question: "Como calcular derivadas?",
    answer: "Para derivar uma função, use regras básicas: Potência, Soma, Produto e Cadeia. Ex: derivada de x³ → 3x²."
  },
  {
    question: "O que é integral definida?",
    answer: "Calcula a área sob uma curva entre a e b: ∫_a^b f(x) dx = F(b)-F(a). Usada em áreas, volumes e trabalho."
  },
  {
    question: "Como resolver equações do 2° grau?",
    answer: "Equação: ax²+bx+c=0. Bhaskara: Δ=b²-4ac → x=(-b±√Δ)/(2a). Ou fatoração quando possível."
  },
  {
    question: "Explique a 2ª Lei de Newton",
    answer: "F = m × a. Força = massa × aceleração. Aceleração aumenta com força, diminui com massa."
  },
  {
    question: "O que são matrizes?",
    answer: "Matrizes: números em linhas e colunas. Ex: 2x3 [[a11,a12,a13],[a21,a22,a23]]. Operações: soma, multiplicação, determinante, inversa."
  },
  {
    question: "Como funciona energia cinética?",
    answer: "Ec = ½·m·v². Quanto maior a velocidade, maior a energia. m = massa, v = velocidade."
  }
];

// Função para enviar mensagem ao backend
async function sendMessageToBackend(userMessage: string) {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/chat/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ pergunta: userMessage }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP ${response.status}: ${text}`);
    }

    const data = await response.json();
    return data.response ?? "Desculpe, resposta vazia do servidor.";
  } catch (error) {
    console.error('Erro no backend:', error);
    return 'Desculpe, ocorreu um erro ao se comunicar com o servidor.';
  }
}

// Função para retornar resposta rápida local (predefinedQA)
function getBotResponse(userMessage: string) {
  const msg = userMessage.toLowerCase();

  if (msg.includes('derivada')) return predefinedQA[0].answer;
  if (msg.includes('integral')) return predefinedQA[1].answer;
  if (msg.includes('equação') || msg.includes('2° grau') || msg.includes('bhaskara')) return predefinedQA[2].answer;
  if (msg.includes('newton') || msg.includes('força') || msg.includes('dinâmica')) return predefinedQA[3].answer;
  if (msg.includes('matriz') || msg.includes('matrizes')) return predefinedQA[4].answer;
  if (msg.includes('energia') && msg.includes('cinética')) return predefinedQA[5].answer;

  return "Olá! 👋 Sou o Kombot.IA, assistente de exatas. Posso ajudar com Matemática, Física, Cálculo e Álgebra Linear. Digite sua dúvida!";
}


export function ChatBot({
  isDialog = false,
  isDarkMode = false,
  playSound,
  onExpandToPage,
  onMinimize,
  onClose,
  onMinimizeToHome,
  onCloseToHome,
  messages,
  addMessage
}: ChatBotProps) {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll automático
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSendMessage = async (text?: string) => {
    const userText = text ?? inputText;
    if (!userText.trim()) return;
    playSound?.('message');

    const userMessage: Message = { id: Date.now().toString(), text: userText, isBot: false, timestamp: new Date() };
    addMessage(userMessage);
    setInputText('');
    setIsTyping(true);

    try {
      // 1️⃣ Resposta rápida local
      let botText = getBotResponse(userText);

      // 2️⃣ Se resposta é genérica, enviar para backend
      if (botText.startsWith("Olá! 👋")) botText = await sendMessageToBackend(userText);

      const botMessage: Message = { id: (Date.now()+1).toString(), text: botText, isBot: true, timestamp: new Date() };
      addMessage(botMessage);
    } catch {
      addMessage({ id: (Date.now()+1).toString(), text: "Erro ao se comunicar com o servidor.", isBot: true, timestamp: new Date() });
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    playSound?.('click');
    handleSendMessage(question);
  };

  return (
    <motion.div className={`${isDialog ? 'h-full flex flex-col' : 'fixed inset-0 flex items-center justify-center p-4 sm:p-6'} ${!isDialog && 'pt-20 sm:pt-24'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      
      <div className={`${isDialog ? 'h-full flex flex-col' : 'w-full max-w-4xl h-[calc(100vh-8rem)] sm:h-[600px] flex flex-col'}`}>
        
        {/* Header */}
        <Card className={`${isDarkMode ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-blue-700 to-blue-800'} border-blue-600 rounded-t-xl transition-colors duration-300 shrink-0 cursor-pointer`}>
          <div className="flex items-center justify-between p-3 sm:p-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Avatar className="w-10 h-10 sm:w-12 sm:h-12 bg-white p-0 border-2 border-white/30">
                <img src={robotIcon} alt="Kombot.IA" className="w-full h-full object-cover rounded-full" />
              </Avatar>
              <img src={Logo} alt="Kombot.IA Logo" className="h-6 sm:h-8" />
            </div>
            <div className="flex items-center space-x-1">
              {isDialog && onExpandToPage && <Button variant="ghost" size="sm" onClick={onExpandToPage}><Maximize2 /></Button>}
              {isDialog && onMinimize && <Button variant="ghost" size="sm" onClick={onMinimize}><Minus /></Button>}
              {isDialog && onClose && <Button variant="ghost" size="sm" onClick={onClose}><X /></Button>}
            </div>
          </div>
        </Card>

        {/* Chat Messages */}
        <Card className={`flex-1 overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-white/5 backdrop-blur-sm'} border-white/20`}>
          <div className="h-full overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
            {messages.map(msg => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                className={`flex items-start space-x-2 sm:space-x-3 ${!msg.isBot ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <Avatar className={`w-7 h-7 sm:w-8 sm:h-8 ${msg.isBot ? 'bg-white p-0' : 'bg-gradient-to-r from-green-500 to-blue-500'} flex-shrink-0`}>
                  {msg.isBot ? <img src={robotIcon} alt="Bot" className="w-full h-full object-cover rounded-full" /> : <AvatarFallback><User className="w-3 h-3 sm:w-4 sm:h-4" /></AvatarFallback>}
                </Avatar>
                <div className={`flex-1 max-w-[85%] sm:max-w-[80%] ${!msg.isBot ? 'flex justify-end' : ''}`}>
                  <div className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl ${msg.isBot ? isDarkMode ? 'bg-gray-700/80 text-white' : 'bg-white/10 text-white' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'}`}>
                    <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                    <p className="text-[10px] sm:text-xs opacity-70 mt-1">{msg.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex items-start space-x-2 sm:space-x-3">
                <Avatar className="w-7 h-7 sm:w-8 sm:h-8 bg-white p-0 flex-shrink-0"><img src={robotIcon} alt="Bot" className="w-full h-full object-cover rounded-full" /></Avatar>
                <div className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl ${isDarkMode ? 'bg-gray-700/80' : 'bg-white/10'}`}>
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-bounce bg-white"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-bounce delay-100 bg-white"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-bounce delay-200 bg-white"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </Card>

        {/* Quick Questions */}
        <Card className={`${isDarkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-blue-800/95 border-blue-700'} transition-colors duration-300 shrink-0`}>
          <div className="p-2 sm:p-3">
            <div className="flex items-center space-x-2 mb-2">
              <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              <p className="text-[10px] sm:text-xs text-white font-medium">Perguntas Rápidas:</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2">
              {predefinedQA.map((qa, idx) => (
                <Button key={idx} variant="outline" size="sm" onClick={() => handleQuickQuestion(qa.question)}
                  className={`text-[10px] sm:text-xs rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 h-auto ${isDarkMode ? 'text-white bg-gray-700 border-gray-600 hover:bg-[#003A88]' : 'text-white bg-white/10 border-white/30 hover:bg-[#003A88]'}`}>
                  {qa.question.length > 20 ? qa.question.substring(0,20)+'...' : qa.question}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Input */}
        <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-blue-900/90 border-blue-700'} rounded-b-xl transition-colors duration-300 shrink-0`}>
          <div className="p-2.5 sm:p-4 flex space-x-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Digite sua mensagem..."
              className={`flex-1 text-xs sm:text-sm ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : 'bg-white/10 border-white/20 text-white placeholder:text-white/60'}`}
            />
            <Button onClick={() => handleSendMessage()} disabled={!inputText.trim()} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-[#003A88] hover:to-[#003A88] text-white px-3 sm:px-4">
              <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </Card>

      </div>
    </motion.div>
  );
}
