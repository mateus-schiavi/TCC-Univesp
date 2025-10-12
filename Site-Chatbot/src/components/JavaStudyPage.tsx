import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Send, User, Minimize2, HelpCircle, Star, BookOpen, Calculator, Beaker, Globe, Code } from 'lucide-react';
import robotIcon from '../assets/RobotIcon.png';


interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'Olá! Em que posso ajudar?',
    isBot: true,
    timestamp: new Date(Date.now() - 300000)
  },
  {
    id: '2',
    text: 'Sim, quero muito saber o que estudar para a prova de Java. Gostaria de uma ajuda na rotina de estudos.',
    isBot: false,
    timestamp: new Date(Date.now() - 270000)
  },
  {
    id: '3',
    text: 'Ótimo! Vou te ajudar a organizar seus estudos para a prova de Java. Para criar um plano de estudos eficiente, preciso saber algumas coisas:\n\n1. Quando é a sua prova?\n2. Quais tópicos de Java estão no programa?\n3. Qual é o seu nível atual de conhecimento em Java?\n\nEnquanto isso, posso te dar algumas dicas gerais sobre os tópicos mais importantes de Java que costumam cair em provas.',
    isBot: true,
    timestamp: new Date(Date.now() - 240000)
  },
  {
    id: '4',
    text: 'Sim, como faço para estudar somente os tópicos importantes?',
    isBot: false,
    timestamp: new Date(Date.now() - 210000)
  },
  {
    id: '5',
    text: 'Excelente pergunta! Vou te mostrar uma estratégia focada nos tópicos essenciais de Java:\n\n📚 **TÓPICOS FUNDAMENTAIS:**\n\n1. **Orientação a Objetos (MUITO IMPORTANTE)**\n   • Classes e Objetos\n   • Herança e Polimorfismo\n   • Encapsulamento\n   • Interfaces e Classes Abstratas\n\n2. **Estruturas de Dados**\n   • Arrays e ArrayLists\n   • Collections (List, Set, Map)\n   • Manipulação de Strings\n\n3. **Exceções**\n   • Try-catch-finally\n   • Tipos de exceções\n   • Criar exceções personalizadas\n\n4. **Conceitos Básicos**\n   • Modificadores de acesso\n   • Métodos (static, final, etc)\n   • Construtores\n\n📝 **ROTINA DE ESTUDOS SUGERIDA:**\n\n**Dia 1-2:** Orientação a Objetos (3-4 horas/dia)\n**Dia 3:** Estruturas de Dados (3 horas)\n**Dia 4:** Exceções e Tratamento de Erros (2 horas)\n**Dia 5:** Revisão e Exercícios Práticos (4 horas)\n\n💡 **DICA IMPORTANTE:**\nFoque 70% do tempo em PRATICAR código e apenas 30% em teoria. Java se aprende programando!\n\nQuer que eu explique algum desses tópicos em detalhes?',
    isBot: true,
    timestamp: new Date(Date.now() - 180000)
  }
];

export function JavaStudyPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
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
    
    if (message.includes('orientação') || message.includes('objetos') || message.includes('oo')) {
      return 'Orientação a Objetos é o coração do Java! Vou explicar os 4 pilares:\n\n1. **Encapsulamento**: Proteger dados usando private/public\n2. **Herança**: Reutilizar código através de extends\n3. **Polimorfismo**: Mesmo método, comportamentos diferentes\n4. **Abstração**: Esconder complexidade\n\nQuer um exemplo prático de algum deles?';
    }
    
    if (message.includes('herança') || message.includes('extends')) {
      return 'Herança em Java permite criar classes baseadas em outras:\n\n```java\npublic class Animal {\n    protected String nome;\n    public void emitirSom() { }\n}\n\npublic class Cachorro extends Animal {\n    @Override\n    public void emitirSom() {\n        System.out.println("Au au!");\n    }\n}\n```\n\nA classe Cachorro herda atributos e métodos de Animal!';
    }
    
    if (message.includes('exceç') || message.includes('exception')) {
      return 'Exceções em Java são fundamentais!\n\n```java\ntry {\n    int resultado = 10 / 0;\n} catch (ArithmeticException e) {\n    System.out.println("Erro: " + e.getMessage());\n} finally {\n    System.out.println("Sempre executa");\n}\n```\n\nLembre: try-catch protege seu código de erros inesperados!';
    }

    if (message.includes('obrigad')) {
      return 'Por nada! Estou aqui para te ajudar a dominar Java. Continue praticando e você vai arrasar na prova! 💪🚀';
    }
    
    return 'Entendi! Posso explicar qualquer tópico de Java em detalhes. Pergunte sobre: Orientação a Objetos, Herança, Polimorfismo, Exceções, Collections, ou qualquer outro conceito que você precise estudar!';
  };

  const quickQuestions = [
    "Explicar Polimorfismo",
    "O que são Interfaces?",
    "Collections em Java",
    "Diferença entre Abstract e Interface"
  ];

  const javaTopics = [
    { icon: Code, name: "Programação Orientada a Objetos", color: "from-red-500 to-orange-500" },
    { icon: BookOpen, name: "Collections Framework", color: "from-blue-500 to-cyan-500" },
    { icon: Calculator, name: "Tratamento de Exceções", color: "from-purple-500 to-pink-500" },
    { icon: Globe, name: "Entrada e Saída (I/O)", color: "from-green-500 to-emerald-500" }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Demonstração - Estudo de Java
          </h1>
          <p className="text-xl text-blue-200">
            Veja como o Cogni.IA pode ajudar você a estudar para suas provas
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Java Topics */}
          <div className="lg:col-span-1 space-y-4">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Tópicos de Java</h3>
              <div className="space-y-3">
                {javaTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all cursor-pointer border border-white/10"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-r ${topic.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <topic.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white text-sm">{topic.name}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-lg font-semibold text-white mb-4">Recursos do Cogni.IA</h3>
              <ul className="space-y-2 text-blue-200 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Planos de estudo personalizados</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Exemplos de código práticos</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Explicações detalhadas</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Foco nos tópicos importantes</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Suporte para todas as linguagens</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm border-orange-500/30">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-2">Dica de Estudo</h4>
                <p className="text-sm text-blue-100">
                  Pratique escrevendo código todos os dias. A melhor forma de aprender programação é programando!
                </p>
              </div>
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
                      <p className="text-sm text-blue-200">Ajudando com Java</p>
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
                    className={`flex items-start space-x-3 ${
                      !message.isBot ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <Avatar className={`w-8 h-8 flex-shrink-0 ${
                      message.isBot 
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
                        className={`p-3 rounded-2xl ${
                          message.isBot
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
                    placeholder="Digite sua dúvida sobre Java..."
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
        <Card className="mt-6 p-6 bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-sm border-orange-500/30">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-2">
              Continue aprendendo com o Cogni.IA! 🚀
            </h3>
            <p className="text-blue-200 mb-4">
              Este é um exemplo de como nosso chatbot pode criar planos de estudo personalizados e explicar conceitos complexos de programação de forma simples e eficiente.
            </p>
            <div className="flex justify-center gap-4 text-sm text-blue-100">
              <span>📚 Planos personalizados</span>
              <span>•</span>
              <span>💻 Exemplos práticos</span>
              <span>•</span>
              <span>⚡ Respostas rápidas</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
