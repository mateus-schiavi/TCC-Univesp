import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface ContactPageProps {
  isDarkMode?: boolean;
}

export function ContactPage({ isDarkMode = false }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to a backend
    alert('Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.');
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={`min-h-screen p-4 sm:p-6 flex items-center justify-center transition-colors duration-300 ${isDarkMode ? 'bg-[#0D1117]' : ''}`}>
      <div className="max-w-3xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">Fale Conosco</h1>
          <p className="text-blue-200 text-sm sm:text-base lg:text-lg px-4">
            Estamos aqui para ajudar você a alcançar seus objetivos. Preencha o formulário abaixo e nossa equipe entrará em contato com você.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card className={`${isDarkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white'} p-6 sm:p-8 shadow-2xl transition-colors duration-300`}>
            <div className="mb-6">
              <h2 className={`text-xl sm:text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Entre em Contato</h2>
              <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Preencha o formulário abaixo e entraremos em contato o mais breve possível.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className={`block ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-2 text-sm sm:text-base`}>
                    Nome <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome completo"
                    required
                    className={`w-full ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : 'bg-gray-50 border-gray-200'} focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base`}
                  />
                </div>

                <div>
                  <label className={`block ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-2 text-sm sm:text-base`}>
                    E-mail <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    required
                    className={`w-full ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : 'bg-gray-50 border-gray-200'} focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className={`block ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-2 text-sm sm:text-base`}>Empresa</label>
                  <Input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Nome da sua empresa"
                    className={`w-full ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : 'bg-gray-50 border-gray-200'} focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base`}
                  />
                </div>

                <div>
                  <label className={`block ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-2 text-sm sm:text-base`}>Telefone</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(11) 99999-9999"
                    className={`w-full ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : 'bg-gray-50 border-gray-200'} focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base`}
                  />
                </div>
              </div>

              <div>
                <label className={`block ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-2 text-sm sm:text-base`}>
                  Mensagem <span className="text-red-500">*</span>
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Descreva como podemos ajudá-lo..."
                  required
                  rows={6}
                  className={`w-full ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder:text-gray-400' : 'bg-gray-50 border-gray-200'} focus:border-blue-500 focus:ring-blue-500 resize-none text-sm sm:text-base`}
                />
              </div>

              <Button
                type="submit"
                className={`w-full ${isDarkMode ? 'bg-blue-600 hover:bg-[#003A88]' : 'bg-gray-900 hover:bg-[#003A88]'} text-white py-4 sm:py-6 text-base sm:text-lg transition-all duration-300`}
              >
                Enviar Mensagem
              </Button>

              <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center mt-4`}>
                Ao enviar este formulário, você concorda com nossos termos de privacidade.
              </p>
            </form>
          </Card>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8"
        >
          <Card className={`${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/10 border-white/20'} backdrop-blur-sm p-5 sm:p-6 text-center transition-all duration-300 hover:bg-white/15`}>
            <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-blue-300 mx-auto mb-2 sm:mb-3" />
            <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Email</h3>
            <p className="text-blue-200 text-xs sm:text-sm">contato@cogni-ia.com</p>
          </Card>

          <Card className={`${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/10 border-white/20'} backdrop-blur-sm p-5 sm:p-6 text-center transition-all duration-300 hover:bg-white/15`}>
            <Phone className="w-7 h-7 sm:w-8 sm:h-8 text-blue-300 mx-auto mb-2 sm:mb-3" />
            <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Telefone</h3>
            <p className="text-blue-200 text-xs sm:text-sm">(11) 9999-9999</p>
          </Card>

          <Card className={`${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/10 border-white/20'} backdrop-blur-sm p-5 sm:p-6 text-center transition-all duration-300 hover:bg-white/15`}>
            <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-blue-300 mx-auto mb-2 sm:mb-3" />
            <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Localização</h3>
            <p className="text-blue-200 text-xs sm:text-sm">São Paulo, Brasil</p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
