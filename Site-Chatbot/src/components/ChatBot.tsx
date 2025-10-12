import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Send, User, Maximize2, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import robotIcon from '../assets/robotIcon.png';

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
}

// Predefined questions and answers
const predefinedQA = [
  {
    question: "Como calcular derivadas?",
    answer: "Para calcular derivadas, você precisa aplicar as regras de derivação. As principais regras são:\n\n1. Regra da potência: d/dx(x^n) = n*x^(n-1)\n2. Regra da soma: d/dx(f+g) = f' + g'\n3. Regra do produto: d/dx(f*g) = f'*g + f*g'\n4. Regra da cadeia: d/dx(f(g(x))) = f'(g(x))*g'(x)\n\nQual tipo de função você precisa derivar?"
  },
  {
    question: "O que é integral definida?",
    answer: "A integral definida representa a área sob uma curva em um intervalo [a,b]. É calculada como:\n\n∫[a,b] f(x)dx = F(b) - F(a)\n\nonde F(x) é a primitiva de f(x).\n\nÉ muito usada para calcular áreas, volumes, trabalho físico e outras aplicações práticas. Precisa de ajuda com algum exemplo específico?"
  },
  {
    question: "Como resolver equações do 2° grau?",
    answer: "Para resolver equações do tipo ax² + bx + c = 0, use a fórmula de Bhaskara:\n\nx = (-b ± √(b²-4ac)) / 2a\n\nOnde:\n• Δ = b² - 4ac (discriminante)\n• Se Δ > 0: duas raízes reais diferentes\n• Se Δ = 0: uma raiz real (raízes iguais)\n• Se Δ < 0: não há raízes reais\n\nTem alguma equação específica para resolver?"
  },
  {
    question: "Explique a 2ª Lei de Newton",
    answer: "A Segunda Lei de Newton (Princípio Fundamental da Dinâmica) estabelece que:\n\nF = m × a\n\nOnde:\n• F = Força resultante (em Newtons)\n• m = massa do corpo (em kg)\n• a = aceleração (em m/s²)\n\nIsso significa que a aceleração de um corpo é diretamente proporcional à força aplicada e inversamente proporcional à sua massa. Quer ver exemplos de aplicação?"
  },
  {
    question: "O que são matrizes?",
    answer: "Matrizes são arranjos retangulares de números organizados em linhas e colunas. Exemplo de matriz 2x3:\n\nA = [ a11  a12  a13 ]\n    [ a21  a22  a23 ]\n\nOperações principais:\n• Adição: soma elemento a elemento\n• Multiplicação por escalar: multiplica todos os elementos\n• Multiplicação de matrizes: produto linha × coluna\n• Determinante e inversa (para matrizes quadradas)\n\nSobre qual operação você tem dúvidas?"
  },
  {
    question: "Como funciona energia cinética?",
    answer: "Energia cinética é a energia associada ao movimento de um corpo. É calculada pela fórmula:\n\nEc = (1/2) × m × v²\n\nOnde:\n• Ec = energia cinética (em Joules)\n• m = massa (em kg)\n• v = velocidade (em m/s)\n\nObservações importantes:\n• Quanto maior a velocidade, maior a energia (relação quadrática)\n• Depende do referencial escolhido\n• Sempre é um valor positivo ou zero\n\nPrecisa de ajuda com algum exercício?"
  }
];


async function sendMessage(userMessage : string) {

    try {
    const response = await fetch('http://127.0.0.1:8000/api/chat/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pergunta: userMessage }),
    });
 
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
 
    const data = await response.json();
    return data.response; // texto da resposta do bot
  } catch (error) {
    console.error('Erro ao se comunicar com o backend:', error);
    return 'Desculpe, ocorreu um erro ao se comunicar com o servidor.';
  }
}
  
export function ChatBot({ isDialog = false, isDarkMode = false, playSound, onExpandToPage }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! 👋 Sou o Cogni.IA, seu assistente virtual universitário especializado em exatas.\n\nPosso ajudar com: Matemática, Física, Cálculo, Álgebra Linear e muito mais!\n\nSelecione uma pergunta abaixo ou digite sua dúvida.',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    playSound?.('message');

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Check if question matches any predefined question
    for (const qa of predefinedQA) {
      if (message.includes(qa.question.toLowerCase().substring(0, 10))) {
        return qa.answer;
      }
    }
    
    // Keyword matching for other topics
    if (message.includes('derivada') || message.includes('calcular derivadas')) {
      return predefinedQA[0].answer;
    }
    
    if (message.includes('integral')) {
      return predefinedQA[1].answer;
    }
    
    if (message.includes('equação') || message.includes('2° grau') || message.includes('bhaskara')) {
      return predefinedQA[2].answer;
    }
    
    if (message.includes('newton') || message.includes('força') || message.includes('dinâmica')) {
      return predefinedQA[3].answer;
    }
    
    if (message.includes('matriz') || message.includes('matrizes')) {
      return predefinedQA[4].answer;
    }
    
    if (message.includes('energia') || message.includes('cinética')) {
      return predefinedQA[5].answer;
    }
    
    // Default introduction message
    return 'Olá! 👋 Sou o Cogni.IA, seu assistente virtual universitário especializado em exatas.\n\nPosso ajudar com: Matemática, Física, Cálculo, Álgebra Linear e muito mais!\n\nSelecione uma pergunta sugerida abaixo ou digite sua dúvida específica sobre qualquer tópico de exatas.';
  };

  const handleQuickQuestion = (question: string) => {
    playSound?.('click');
    setInputText(question);
    // Auto-send after a brief delay
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <motion.div 
      className={`${isDialog ? 'h-full flex flex-col' : 'fixed inset-0 flex items-center justify-center p-4 sm:p-6'} ${isDialog ? '' : 'pt-20 sm:pt-24'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`${isDialog ? 'h-full flex flex-col' : 'w-full max-w-4xl h-[calc(100vh-8rem)] sm:h-[600px]'} flex flex-col`}>
        {/* Chat Header */}
        <Card className={`${isDarkMode ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-blue-700 to-blue-800'} border-blue-600 ${isDialog ? 'rounded-t-2xl sm:rounded-t-3xl' : 'rounded-t-xl'} transition-colors duration-300`}>
          <div className="flex items-center justify-between p-3 sm:p-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Avatar className="w-10 h-10 sm:w-12 sm:h-12 bg-white p-0 border-2 border-white/30">
                <img src={robotIcon} alt="Cogni.IA" className="w-full h-full object-cover rounded-full" />
              </Avatar>
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-white">Cogni.IA</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-xs sm:text-sm text-green-300">On-line</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              {isDialog && onExpandToPage && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onExpandToPage}
                  className="text-white hover:bg-[#003A88] w-8 h-8 p-0 transition-all duration-300"
                  title="Expandir para página completa"
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Chat Messages */}
        <Card className={`flex-1 ${isDarkMode ? (isDialog ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700' : 'bg-[#0D1117]') : (isDialog ? 'bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600' : 'bg-white/5 backdrop-blur-sm')} ${isDialog ? '' : 'border-white/20'} ${isDialog ? '' : 'rounded-none'} overflow-hidden transition-colors duration-300`}>
          <div className="h-full overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start space-x-2 sm:space-x-3 ${
                  !message.isBot ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <Avatar className={`w-7 h-7 sm:w-8 sm:h-8 ${
                  message.isBot 
                    ? 'bg-white p-0' 
                    : 'bg-gradient-to-r from-green-500 to-blue-500'
                } flex-shrink-0`}>
                  {message.isBot ? (
                    <img src={robotIcon} alt="Bot" className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <AvatarFallback className="text-white bg-transparent">
                      <User className="w-3 h-3 sm:w-4 sm:h-4" />
                    </AvatarFallback>
                  )}
                </Avatar>
                
                <div className={`flex-1 max-w-[85%] sm:max-w-[80%] ${!message.isBot ? 'flex justify-end' : ''}`}>
                  <div
                    className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl ${
                      message.isBot
                        ? isDarkMode 
                          ? 'bg-gray-700/80 text-white border border-gray-600/50'
                          : 'bg-white/10 text-white border border-white/20'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    }`}
                  >
                    <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                    <p className="text-[10px] sm:text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString('pt-BR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <div className="flex items-start space-x-2 sm:space-x-3">
                <Avatar className="w-7 h-7 sm:w-8 sm:h-8 bg-white p-0 flex-shrink-0">
                  <img src={robotIcon} alt="Bot" className="w-full h-full object-cover rounded-full" />
                </Avatar>
                <div className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl ${isDarkMode ? 'bg-gray-700/80 border border-gray-600/50' : 'bg-white/10 border border-white/20'}`}>
                  <div className="flex space-x-1">
                    <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-bounce ${isDarkMode ? 'bg-gray-300' : 'bg-white'}`}></div>
                    <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-bounce delay-100 ${isDarkMode ? 'bg-gray-300' : 'bg-white'}`}></div>
                    <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-bounce delay-200 ${isDarkMode ? 'bg-gray-300' : 'bg-white'}`}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </Card>

        {/* Quick Questions Panel */}
        <Card className={`${isDarkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-blue-800/95 border-blue-700'} ${isDialog ? '' : 'rounded-none'} transition-colors duration-300`}>
          <div className="p-2 sm:p-3">
            <div className="flex items-center space-x-2 mb-2">
              <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              <p className="text-[10px] sm:text-xs text-white font-medium">Perguntas Rápidas:</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2">
              {predefinedQA.map((qa, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickQuestion(qa.question)}
                  className={`text-[10px] sm:text-xs rounded-lg px-2 py-1.5 sm:px-3 sm:py-2 h-auto ${
                    isDarkMode 
                      ? 'text-white bg-gray-700 border-gray-600 hover:bg-[#003A88]' 
                      : 'text-white bg-white/10 border-white/30 hover:bg-[#003A88]'
                  } transition-all duration-300`}
                  title={qa.question}
                >
                  {qa.question.length > 20 ? qa.question.substring(0, 20) + '...' : qa.question}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {/* Message Input */}
        <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-blue-900/90 border-blue-700'} ${isDialog ? 'rounded-b-2xl sm:rounded-b-3xl' : 'rounded-b-xl'} transition-colors duration-300`}>
          <div className="p-2.5 sm:p-4">
            <div className="flex space-x-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Digite sua mensagem..."
                className={`flex-1 text-xs sm:text-sm ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500'
                    : 'bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40'
                } transition-colors duration-300`}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-[#003A88] hover:to-[#003A88] text-white px-3 sm:px-4 transition-all duration-300"
              >
                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
