import { Button } from './ui/button';
import { Card } from './ui/card';
import { MessageCircle, BookOpen, Users, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import robotImage from 'figma:asset/fd09fa77ada1dac09f4e5030b38fac742256ea53.png';

interface HomeProps {
  onNavigateToChat: () => void;
  isDarkMode?: boolean;
}

export function Home({ onNavigateToChat, isDarkMode = false }: HomeProps) {
  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#0D1117]' : ''}`}>
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 py-12 sm:py-20 mb-16 sm:mb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              className="space-y-6 sm:space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  Transforme Seu
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                    Aprendizado
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-blue-100 leading-relaxed">
                  com Inteligência Artificial Educacional
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-blue-200 max-w-lg">
                  Assistente virtual universitário focado na área de exatas. 
                  Tire dúvidas sobre matemática, física, cálculo e outras disciplinas 
                  com nosso chatbot inteligente desenvolvido especialmente para universitários.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={onNavigateToChat}
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-[#003A88] hover:to-[#003A88] text-black hover:text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 text-sm sm:text-base"
                >
                  Conversar com IA
                </Button>
              </div>
            </motion.div>

            {/* Right Content - AI Robot Image with Animation */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                ease: "easeOut"
              }}
            >
              <div className="relative z-10 flex items-center justify-center">
                <motion.div 
                  className="relative"
                  animate={{ 
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.img
                    src={robotImage}
                    alt="Cogni.IA Robot"
                    className="w-full max-w-sm sm:max-w-md mx-auto rounded-[50%] object-cover shadow-2xl"
                    style={{ aspectRatio: '1/1.2' }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </div>
              {/* Floating Elements */}
              <motion.div 
                className="absolute -top-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-cyan-400 rounded-full opacity-20"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              ></motion.div>
              <motion.div 
                className="absolute -bottom-6 -left-6 w-24 h-24 sm:w-32 sm:h-32 bg-blue-500 rounded-full opacity-15"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.15, 0.25, 0.15]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              ></motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`px-4 sm:px-6 py-12 sm:py-16 ${isDarkMode ? 'bg-gray-900/50' : 'bg-blue-800/30'} mb-16 sm:mb-24 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              Recursos do Assistente Virtual Universitário
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-blue-200 max-w-3xl mx-auto px-4">
              Ferramentas especializadas para estudantes de exatas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: MessageCircle,
                title: "Suporte 24/7",
                description: "Chat ao vivo com assistência disponível a qualquer hora"
              },
              {
                icon: BookOpen,
                title: "Foco em Exatas", 
                description: "Especializado em matemática, física, cálculo e engenharia"
              },
              {
                icon: Users,
                title: "Para Universitários",
                description: "Conteúdo adaptado ao nível universitário de exatas"
              },
              {
                icon: Zap,
                title: "Respostas Instantâneas",
                description: "Obtenha respostas rápidas e precisas para suas dúvidas"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className={`p-5 sm:p-6 ${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/10 border-white/20'} backdrop-blur-sm hover:bg-white/15 transition-all duration-300`}>
                  <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-blue-200">{feature.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-20">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            Pronto para Começar?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-blue-200 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Experimente nosso chatbot educacional gratuitamente e descubra como a IA pode transformar seus estudos.
          </p>
          <Button
            onClick={onNavigateToChat}
            size="lg"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-[#003A88] hover:to-[#003A88] hover:text-white text-black font-semibold px-8 sm:px-12 py-4 sm:py-6 rounded-xl text-base sm:text-lg transition-all duration-300"
          >
            Iniciar Conversa Agora
          </Button>
        </motion.div>
      </section>
    </div>
  );
}