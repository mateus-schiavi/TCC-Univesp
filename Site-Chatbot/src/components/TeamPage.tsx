import { Card } from './ui/card';
import { Avatar } from './ui/avatar';
import { Github, Linkedin } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface TeamPageProps {
  isDarkMode?: boolean;
}

export function TeamPage({ isDarkMode = false }: TeamPageProps) {
  const teamMembers: TeamMember[] = [

    {
      name: "Elessandro Marquezim",
      role: "Gerente de Projeto/Product Owner e Experiência do Usuário",
      image: "../src/assets/fotoElessandroMarquezim.png"
    },
    {
      name: "Rafael Ferreira",
      role: "Gerente de Projeto/ Product Owner e Especialista em Educação",
      image: "../src/assets/fotoRafaelFerreira.png"
    },
    {
      name: "Aline Vieira",
      role: "Gerente de Projeto/ Product Owner e Especialista em Educação",
      image: "../src/assets/fotoAlineVieira.png"
    },
    {
      name: "Elias carvalho",
      role: "Gerente de Projeto/ Product Owner e Analista de Dados",
      image: "../src/assets/fotoEliascarvalho.png"
    },
    {
      name: "Agatha Freitas",
      role: "Engenheira de IA/Desenvolvedora Frontend e UX/UI Designer",
      image: "../src/assets/fotoAgathaFreitas.png"
    },
    {
      name: "Mateus Schiavi",
      role: "Analista de Dados/ Desenvolvedor Backend e Engenheiro de IA",
      image: "../src/assets/fotoMateusSchiavi.png"
    },
    {
      name: "Ricardo Gazzi",
      role: "Gerente de Projeto/ Product Owner e QA/tester",
      image: "../src/assets/fotoRicardoGazzi.png"
    },

    {
      name: "Marcelo Junior",
      role: "Desenvolvedor Backend/Frotend e Experiência do Usuário",
      image: "../src/assets/fotoMarceloJunior.png"
    }
  ];

  return (
    <motion.div
      className={`min-h-screen px-4 sm:px-6 py-12 sm:py-20 transition-colors duration-300 ${isDarkMode ? 'bg-[#0D1117]' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Conheça Nossa Equipe
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-blue-200 max-w-3xl mx-auto mb-3 sm:mb-4 px-4">
            O time de especialistas por trás do Kombot.IA
          </p>
          <p className="text-sm sm:text-base lg:text-lg text-blue-300 max-w-2xl mx-auto px-4">
            Profissionais dedicados a revolucionar a educação através da inteligência artificial
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="h-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
            >
              <Card
                className={`${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/10 border-white/20'} backdrop-blur-sm hover:bg-white/15 transition-all duration-300 group overflow-hidden h-full flex flex-col`}
              >
                <div className="p-6 flex flex-col h-full">
                  {/* Avatar */}
                  <div className="mb-4 flex justify-center">
                    <div className="relative">
                      <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-white/20 group-hover:border-white/40 transition-all duration-300">
                        <ImageWithFallback
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </Avatar>
                      {/* Online indicator */}
                      <div className={`absolute bottom-2 right-2 w-4 h-4 sm:w-5 sm:h-5 bg-green-400 rounded-full border-4 ${isDarkMode ? 'border-gray-800' : 'border-blue-900'}`}></div>
                    </div>
                  </div>

                  {/* Member Info */}
                  <div className="text-center mb-4 flex-grow">
                    <h3 className="text-white mb-1 text-sm sm:text-base">{member.name}</h3>
                    <p className="text-xs sm:text-sm text-blue-300 min-h-[2.5rem]">{member.role}</p>
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-3 mt-auto">
                    <button className={`w-8 h-8 ${isDarkMode ? 'bg-gray-700 hover:bg-[#003A88]' : 'bg-white/10 hover:bg-[#003A88]'} rounded-full flex items-center justify-center text-white transition-all duration-300 `}>
                      <Linkedin className="w-4 h-4" />
                    </button>
                    <button className={`w-8 h-8 ${isDarkMode ? 'bg-gray-700 hover:bg-[#003A88]' : 'bg-white/10 hover:bg-[#003A88]'} rounded-full flex items-center justify-center text-white transition-all duration-300`}>
                      <Github className="w-4 h-4" />
                    </button>
                    {/* <button className={`w-8 h-8 ${isDarkMode ? 'bg-gray-700 hover:bg-[#003A88]' : 'bg-white/10 hover:bg-[#003A88]'} rounded-full flex items-center justify-center text-white transition-all duration-300`}>
                      <Mail className="w-4 h-4" />
                    </button> */}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        {/* <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <Card className={`p-4 sm:p-6 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-sm ${isDarkMode ? 'border-gray-700' : 'border-white/20'} text-center transition-colors duration-300`}>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">8</div>
            <p className="text-blue-200 text-xs sm:text-sm">Membros do Time</p>
          </Card>
          <Card className={`p-4 sm:p-6 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm ${isDarkMode ? 'border-gray-700' : 'border-white/20'} text-center transition-colors duration-300`}>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">50+</div>
            <p className="text-blue-200 text-xs sm:text-sm">Projetos Concluídos</p>
          </Card>
          <Card className={`p-4 sm:p-6 bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm ${isDarkMode ? 'border-gray-700' : 'border-white/20'} text-center transition-colors duration-300`}>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">10k+</div>
            <p className="text-blue-200 text-xs sm:text-sm">Usuários Ativos</p>
          </Card>
          <Card className={`p-4 sm:p-6 bg-gradient-to-br from-orange-600/20 to-red-600/20 backdrop-blur-sm ${isDarkMode ? 'border-gray-700' : 'border-white/20'} text-center transition-colors duration-300`}>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">99%</div>
            <p className="text-blue-200 text-xs sm:text-sm">Satisfação</p>
          </Card>
        </motion.div> */}

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <Card className={`p-6 sm:p-8 ${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/10 border-white/20'} backdrop-blur-sm transition-colors duration-300`}>
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8">
              Nossos Valores
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-2xl sm:text-3xl">🎯</span>
                </div>
                <h3 className="text-lg sm:text-xl text-white mb-1 sm:mb-2">Excelência</h3>
                <p className="text-blue-200 text-xs sm:text-sm">
                  Comprometidos com a mais alta qualidade em tudo que fazemos
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-2xl sm:text-3xl">🚀</span>
                </div>
                <h3 className="text-lg sm:text-xl text-white mb-1 sm:mb-2">Inovação</h3>
                <p className="text-blue-200 text-xs sm:text-sm">
                  Sempre buscando novas tecnologias e abordagens criativas
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-2xl sm:text-3xl">🤝</span>
                </div>
                <h3 className="text-lg sm:text-xl text-white mb-1 sm:mb-2">Colaboração</h3>
                <p className="text-blue-200 text-xs sm:text-sm">
                  Trabalhamos juntos para alcançar resultados extraordinários
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
