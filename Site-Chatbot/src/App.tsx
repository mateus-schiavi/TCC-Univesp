import { useState } from 'react';
import { Home } from './components/Home';
import { ChatBot } from './components/ChatBot';
import { DemoPage } from './components/DemoPage';
import { JavaStudyPage } from './components/JavaStudyPage';
import { TeamPage } from './components/TeamPage';
import { ContactPage } from './components/ContactPage';
import { Button } from './components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './components/ui/dialog';
import { MessageCircle, X, Moon, Sun } from 'lucide-react';
import { Message } from './types';
import robotIcon from './assets/RobotIcon.png';
import Logo from './assets/logo.png';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'chatbot' | 'demo' | 'javastudy' | 'team' | 'contact'>('home');
  const [showFloatingChat, setShowFloatingChat] = useState(true);
  const [isChatDialogOpen, setIsChatDialogOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Estado das mensagens elevado para App
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial-1', // Usar ID diferente para evitar conflito inicial
      text: 'Olá! 👋 Sou o Kombot.IA, seu assistente virtual universitário especializado em exatas.\n\nPosso ajudar com: Matemática, Física, Cálculo, Álgebra Linear e muito mais!\n\nSelecione uma pergunta abaixo ou digite sua dúvida.',
      isBot: true,
      timestamp: new Date()
    }
  ]);

  // Função para adicionar mensagens (passada para ChatBot)
  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  // Sound effects
  const playSound = (type: 'message' | 'click' | 'toggle') => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === 'message') {
      oscillator.frequency.value = 800;
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    } else if (type === 'click') {
      oscillator.frequency.value = 600;
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
    } else if (type === 'toggle') {
      oscillator.frequency.value = isDarkMode ? 400 : 600;
      gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
    }

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  const toggleDarkMode = () => {
    playSound('toggle');
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0D1117]' : 'bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600'} transition-colors duration-300`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode ? 'bg-[#161B22]/90' : 'bg-blue-900/90'} backdrop-blur-sm border-b ${isDarkMode ? 'border-gray-700' : 'border-blue-700'} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => { playSound('click'); setCurrentPage('home'); }}>
              {/* <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-white text-lg sm:text-xl font-bold">A</span> */}
              <img
                src={Logo}
                alt="kombot.ia Logo"
                className="h-6 sm:h-8" // Ajuste a altura (h-6, h-8, etc.) conforme necessário
              />
            </div>

            <div className="flex items-center space-x-2 sm:space-x-6">
              <Button
                variant="ghost"
                onClick={() => { playSound('click'); setCurrentPage('home'); }}
                className="text-white hover:bg-[#003A88] transition-all duration-300 text-xs sm:text-sm px-2 sm:px-4"
              >
                Início
              </Button>
              <Button
                variant={currentPage === 'chatbot' ? 'secondary' : 'ghost'}
                onClick={() => { playSound('click'); setCurrentPage('chatbot'); }}
                className="text-white hover:bg-[#003A88] transition-all duration-300 text-xs sm:text-sm px-2 sm:px-4"
              >
                Chatbot
              </Button>
              <Button
                variant={currentPage === 'team' ? 'secondary' : 'ghost'}
                onClick={() => { playSound('click'); setCurrentPage('team'); }}
                className="text-white hover:bg-[#003A88] transition-all duration-300 text-xs sm:text-sm px-2 sm:px-4"
              >
                Equipe
              </Button>
              <Button
                variant={currentPage === 'contact' ? 'secondary' : 'ghost'}
                onClick={() => { playSound('click'); setCurrentPage('contact'); }}
                className="text-white hover:bg-[#003A88] transition-all duration-300 text-xs sm:text-sm px-2 sm:px-4"
              >
                Contato
              </Button>
              <Button
                variant="ghost"
                onClick={toggleDarkMode}
                className="text-white hover:bg-[#003A88] transition-all duration-300 w-8 h-8 sm:w-10 sm:h-10 p-0"
                title={isDarkMode ? "Modo Claro" : "Modo Escuro"}
              >
                {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 sm:pt-20">
        {currentPage === 'home' && <Home onNavigateToChat={() => { playSound('click'); setCurrentPage('chatbot'); }} isDarkMode={isDarkMode} />}
        {currentPage === 'chatbot' && (
          <ChatBot
            isDarkMode={isDarkMode}
            playSound={playSound}
            messages={messages}
            addMessage={addMessage}

            // Modificada para abrir o diálogo na Home
            onMinimizeToHome={() => {
              playSound('click');
              setCurrentPage('home');      // 1. Volta para a página Home
              setIsChatDialogOpen(true); // 2. Abre a janela de diálogo do chat
            }}
            // Função de Fechar continua igual
            onCloseToHome={() => {
              playSound('click');
              setCurrentPage('home'); // Volta para a Home (sem abrir o diálogo)
            }}
          />
        )}

        {currentPage === 'demo' && <DemoPage />}
        {currentPage === 'javastudy' && <JavaStudyPage />}
        {currentPage === 'team' && <TeamPage isDarkMode={isDarkMode} />}
        {currentPage === 'contact' && <ContactPage isDarkMode={isDarkMode} />}
      </main>

      {/* ALTERADO PARA REMOVER O X VERMELHO */}
      {/* Floating Chat Button - Show on all pages except chatbot page */}
      {currentPage !== 'chatbot' && showFloatingChat && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
          <div className="relative group">
            {/* Main chat button */}
            <button
              onClick={() => { playSound('click'); setIsChatDialogOpen(true); }}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-[#003A88] hover:to-[#003A88] shadow-2xl hover:scale-110 transition-all duration-300 p-1 overflow-hidden relative z-0"
            >
              <img src={robotIcon} alt="Chatbot" className="w-full h-full object-cover rounded-full" />
            </button>

            {/* Pulse animation */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-ping opacity-20 pointer-events-none"></div>

            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-white rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <p className="text-xs sm:text-sm text-gray-800 font-medium">Experimente o Chatbot!</p>
              <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Dialog */}
      {isChatDialogOpen && (
        <Dialog open={isChatDialogOpen} onOpenChange={setIsChatDialogOpen}>
          <DialogContent className="max-w-[90vw] sm:max-w-md h-[80vh] sm:h-[600px] bg-transparent border-0 p-0 overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl chatbot-dialog-content flex flex-col">
            {/* <div className="h-full flex flex-col">
              <div className="flex-1 overflow-hidden"> */}
            {/* Alterado aqui -> adicionado minimizar e close */}
            <ChatBot
              isDialog={true}
              isDarkMode={isDarkMode}
              playSound={playSound}
              messages={messages}
              addMessage={addMessage}
              onExpandToPage={() => {
                playSound('click');
                setIsChatDialogOpen(false);
                setCurrentPage('chatbot');
              }}
              onMinimize={() => {
                playSound('click');
                setIsChatDialogOpen(false);
              }}
              onClose={() => { // Adicionado onClose aqui
                playSound('click');
                setIsChatDialogOpen(false);
              }}
            />
            {/* </div>
            </div> */}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}