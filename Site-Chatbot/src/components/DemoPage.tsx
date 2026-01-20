import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Send, User, Bot, Minimize2, HelpCircle, Star, BookOpen, Calculator, Beaker, Globe } from 'lucide-react';
import robotIcon from '../assets/robotIcon.png';

import type { Message } from '../types';

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Olá! Eu sou o Cogni.IA, seu assistente educacional inteligente. Como posso ajudá-lo hoje?',
    isBot: true,
    timestamp: new Date(Date.now() - 180000)
  },
  {
    id: '2',
    text: 'Oi! Pode me explicar o que é derivada em matemática?',
    isBot: false,
    timestamp: new Date(Date.now() - 160000)
  },
  {
    id: '3',
    text: 'Claro! A derivada é um conceito fundamental do cálculo que representa a taxa de variação de uma função. Em termos simples, ela nos diz quão rápido algo está mudando em um determinado momento.\n\nPor exemplo, se você tem uma função que descreve a posição de um carro ao longo do tempo, a derivada dessa função nos dá a velocidade do carro.\n\nMatematicamente, a derivada de f(x) é escrita como f\'(x) ou df/dx, e é calculada usando o limite:\n\nf\'(x) = lim(h→0) [f(x+h) - f(x)]/h\n\nGostaria que eu explicasse com exemplos práticos?',
    isBot: true,
    timestamp: new Date(Date.now() - 140000)
  },
  {
    id: '4',
    text: 'Sim, por favor! Um exemplo seria ótimo.',
    isBot: false,
    timestamp: new Date(Date.now() - 120000)
  },
  {
    id: '5',
    text: 'Perfeito! Vamos usar um exemplo simples:\n\nSe f(x) = x², vamos calcular a derivada:\n\n1. Aplicamos a regra: f\'(x) = lim(h→0) [(x+h)² - x²]/h\n2. Expandindo: f\'(x) = lim(h→0) [x² + 2xh + h² - x²]/h\n3. Simplificando: f\'(x) = lim(h→0) [2xh + h²]/h\n4. Fatorando h: f\'(x) = lim(h→0) h(2x + h)/h\n5. Cancelando h: f\'(x) = lim(h→0) (2x + h)\n6. Resultado: f\'(x) = 2x\n\nEntão, a derivada de x² é 2x! 🎉\n\nIsso significa que se você tem uma parábola y = x², a inclinação em qualquer ponto x é 2x.',
    isBot: true,
    timestamp: new Date(Date.now() - 100000)
  }
];

export function DemoPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
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

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    if (message.includes('obrigad')) {
      return 'Por nada! Fico feliz em ajudar. Se tiver mais dúvidas sobre matemática ou qualquer outra matéria, é só perguntar! 😊';
    }

    if (message.includes('física') || message.includes('physics')) {
      return 'Física é fascinante! Posso explicar desde conceitos básicos de mecânica até tópicos avançados como física quântica. Qual área te interessa?';
    }

    if (message.includes('química') || message.includes('chemistry')) {
      return 'Química pode ser muito divertida! Posso ajudar com química orgânica, inorgânica, físico-química ou até mesmo reações. O que você gostaria de aprender?';
    }

    if (message.includes('história') || message.includes('history')) {
      return 'História nos ensina muito sobre o mundo! Que período ou região você gostaria de explorar? História do Brasil, mundial, antiga ou contemporânea?';
    }

    return 'Entendo sua dúvida! Posso ajudar com diversas matérias como matemática, física, química, história, português e muito mais. Seja mais específico sobre o que você gostaria de aprender e eu darei uma explicação detalhada!';
  };

  const quickQuestions = [
    "O que é integral?",
    "Explicar lei de Newton",
    "Tabela periódica",
    "Guerra Fria resumo"
  ];

  const subjects = [
    { icon: Calculator, name: "Matemática", color: "from-blue-500 to-cyan-500" },
    { icon: Beaker, name: "Química", color: "from-purple-500 to-pink-500" },
    { icon: Globe, name: "Geografia", color: "from-green-500 to-emerald-500" },
    { icon: BookOpen, name: "Literatura", color: "from-orange-500 to-red-500" }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Demonstração do Chatbot Educacional
          </h1>
          <p className="text-xl text-blue-200">
            Veja como nosso assistente de IA pode ajudar nos estudos
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Subjects */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Disciplinas Disponíveis</h3>
              <div className="space-y-3">
                {subjects.map((subject, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all cursor-pointer border border-white/10"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-r ${subject.color} rounded-lg flex items-center justify-center`}>
                      <subject.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white">{subject.name}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Recursos</h3>
              <ul className="space-y-2 text-blue-200 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Explicações personalizadas</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Exemplos práticos</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Respostas instantâneas</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Disponível 24/7</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Múltiplas disciplinas</span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-2">
            {/* Chat Header */}
            <Card className="p-4 mb-6 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 p-0 border-2 border-white/20">
                    <img src={robotIcon} alt="Cogni.IA" className="w-full h-full object-cover rounded-full" />
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Cogni.IA</h2>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <p className="text-sm text-blue-200">Online agora</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <Star className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <HelpCircle className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <Minimize2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Quick Questions */}
            <div className="mb-6">
              <p className="text-white mb-3 text-sm">Experimente perguntar:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputText(question)}
                    className="text-white bg-transparent border-white/30 hover:bg-white/10 text-xs"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <Card className="h-[600px] flex flex-col bg-white/5 backdrop-blur-sm border-white/20">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${!message.isBot ? 'flex-row-reverse space-x-reverse' : ''
                      }`}
                  >
                    <Avatar className={`w-8 h-8 ${message.isBot
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 p-0'
                      : 'bg-gradient-to-r from-green-500 to-blue-500'
                      }`}>
                      {message.isBot ? (
                        <img src={robotIcon} alt="Bot" className="w-full h-full object-cover rounded-full" />
                      ) : (
                        <AvatarFallback className="text-white bg-transparent">
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      )}
                    </Avatar>

                    <div className={`flex-1 max-w-[80%] ${!message.isBot ? 'flex justify-end' : ''}`}>
                      <div
                        className={`p-3 rounded-2xl ${message.isBot
                          ? 'bg-white/10 text-white border border-white/20'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 p-0">
                      <img src={robotIcon} alt="Bot" className="w-full h-full object-cover rounded-full" />
                    </Avatar>
                    <div className="p-3 rounded-2xl bg-white/10 border border-white/20">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-white/20">
                <div className="flex space-x-2">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Digite sua dúvida aqui..."
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-blue-200 mt-2 text-center">
                  💡 Pressione Enter para enviar sua mensagem
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Info Banner */}
        <Card className="mt-6 p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-white/20">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-2">
              Pronto para começar?
            </h3>
            <p className="text-blue-200 mb-4">
              Este é apenas um exemplo de como nosso chatbot pode ajudar nos seus estudos.
              Experimente você mesmo e veja a diferença!
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
