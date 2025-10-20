
# ALTERAÇÕES E AJUSTES - FRONT-END

[Github Original](https://github.com/mateus-schiavi/TCC-Univesp)

## 🔧 1.Tirar o x de fechar o ícone do bichinho
* Alterado o trecho abaixo em **`App.tsx`**
#### ▶ Linha 117
### Código antigo
```ts
 {/* Floating Chat Button - Show on all pages except chatbot page */}
      {currentPage !== 'chatbot' && showFloatingChat && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50">
          <div className="relative group">
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                playSound('click');
                setShowFloatingChat(false);
              }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-[#003A88] rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 z-10"
            >
              <X className="w-4 h-4" />
            </button>
            
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
```
### Código Novo
```ts
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
```

## 🔧 2.botão de minimizar

* **Etapa 1**

Adicionado Minus à lista de importações da biblioteca lucide-react no arquivo **`ChatBot.tsx`**

### Antigo

```ts
import { Send, User, Maximize2, HelpCircle } from 'lucide-react';
```
### Novo

```ts
import { Send, User, Maximize2, HelpCircle, Minus, X } from 'lucide-react'; 
```
Adicionado uma nova propriedade opcional onMinimize e onClose na interface ChatBotProps.

#### ▶Linha 18
### Antigo

```ts
onExpandToPage?: () => void;
```
### Novo

```ts
onExpandToPage?: () => void;
onMinimize?: () => void;
onClose?: () => void; 
onMinimizeToHome?: () => void;
onCloseToHome?: () => void;
```
Na declaração da função ChatBot, adicionado onMinimize à desestruturação das propriedades.

#### ▶Linha 83
### Antigo

```ts
export function ChatBot({ isDialog = false, isDarkMode = false, playSound, onExpandToPage }: ChatBotProps) {
```
### Novo

```ts
export function ChatBot({ isDialog = false, isDarkMode = false, playSound, onExpandToPage, onMinimize, onClose, onMinimizeToHome, onCloseToHome }: ChatBotProps) { 
```
Dentro do Card do cabeçalho, ao lado do botão de maximizar, adicionado o novo botão para minimizar e fechar.

#### ▶ Linha 222

### Antigo
```ts
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
```

### Novo

```ts
<div className="flex items-center space-x-1">
              {isDialog ? (
                // Botões para o modo DIÁLOGO
                <>
                  {onExpandToPage && (
                    <Button variant="ghost" size="sm" onClick={onExpandToPage} className="text-white hover:bg-[#003A88] w-8 h-8 p-0 transition-all duration-300" title="Expandir para página completa">
                      <Maximize2 className="w-4 h-4" />
                    </Button>
                  )}
                  {/* BOTÃO DE MINIMIZAR  */}
                  {onMinimize && (
                    <Button variant="ghost" size="sm" onClick={onMinimize} className="text-white hover:bg-[#003A88] w-8 h-8 p-0 transition-all duration-300" title="Minimizar Chat">
                      <Minus className="w-4 h-4" />
                    </Button>
                  )}
                  {/* BOTÃO FECHAR */}
                  {onClose && (
                    <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-[#003A88] w-8 h-8 p-0 transition-all duration-300" title="Fechar Chat">
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </>
              ) : (
                // Botões para o modo TELA INTEIRA
                <>
                  {onMinimizeToHome && (
                    <Button variant="ghost" size="sm" onClick={onMinimizeToHome} className="text-white hover:bg-[#003A88] w-8 h-8 p-0 transition-all duration-300" title="Minimizar para Início">
                      <Minus className="w-4 h-4" />
                    </Button>
                  )}
                  {onCloseToHome && (
                    <Button variant="ghost" size="sm" onClick={onCloseToHome} className="text-white hover:bg-[#003A88] w-8 h-8 p-0 transition-all duration-300" title="Fechar e Voltar para Início">
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </>
              )}
            </div>
```
* **Etapa 2**
### //Para a tela expandida:
#### ▶Linha107

### Antigo
```ts
{/* Main Content */}
<main className="pt-16 sm:pt-20">
  {currentPage === 'home' && <Home /* ... */ />}
  {currentPage === 'chatbot' && <ChatBot isDarkMode={isDarkMode} playSound={playSound} />} 
  {/* ^^^^ Modificar esta linha ^^^^ */}
  {/* ... outras páginas ... */}
</main>
```
### Novo
```ts
{/* Main Content */}
{currentPage === 'chatbot' && (
  <ChatBot 
    isDarkMode={isDarkMode} 
    playSound={playSound}
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
  {/* ... outras páginas ... */}
</main>
```
* **Etapa 3**

No arquivo **`App.tsx`**:
#### ▶Linha 148

### Antigo
```ts
<ChatBot 
  isDialog={true}
  isDarkMode={isDarkMode}
  playSound={playSound}
  onExpandToPage={() => {
    playSound('click');
    setIsChatDialogOpen(false);
    setCurrentPage('chatbot');
  }}
/>
```
Adicionado a propriedade **onMinimize**:
### Novo
```ts
<ChatBot 
  isDialog={true}
  isDarkMode={isDarkMode}
  playSound={playSound}
  onExpandToPage={() => { /* ... */ }}
  onMinimize={() => {
    playSound('click');
    setIsChatDialogOpen(false);
  }}
  onClose={() => { // Adicionado onClose aqui
    playSound('click');
    setIsChatDialogOpen(false);
  }}
/>
```

Executado a mesma regra para adicionar um X personalizado e escondi o antigo no CSS
#### ▶Linha 2180
```css
.chatbot-dialog-content > button.absolute.top-4.right-4:has(svg) {
    display: none;
}
```

## 🔧 3. Adição de logotipo

`ChatBox.tsx`

#### ▶Linha 215

Troca do **h2** pela **img**

`App.tsx`

#### ▶Linha 63

Troca do **span** pela **img**

## 🔧 3. Barra de Rolagem chat flutuante

Causa Principal do Problema Corrigido:

O problema do cabeçalho sumindo e da falta de rolagem no modo diálogo (isDialog={true}) era causado por uma combinação de:


* Havia divs extras dentro do <DialogContent> em App.tsx que criavam containers flex aninhados desnecessários, atrapalhando o cálculo de altura do componente ChatBot. 


* Flexbox Duplicado: Dentro de ChatBot.tsx, tanto o <motion.div> quanto o div interno aplicavam flex flex-col no modo diálogo, o que também confundia o layout. 

* Falta de Restrição: Os elementos que deveriam ter altura fixa (cabeçalho, perguntas rápidas, input) não tinham a classe shrink-0, permitindo que fossem "espremidos" verticalmente quando o conteúdo das mensagens crescia.

### Correções Aplicadas:

#### Em `App.tsx`:

🔹Simplificação do DialogContent: Removemos os divs intermediários que envolviam o <ChatBot> dentro do <DialogContent>. O <ChatBot> passou a ser filho direto. 

🔹Flexbox no DialogContent: Adicionamos flex flex-col diretamente à className do <DialogContent> para que ele se tornasse o container flex principal do diálogo. 

🔹Classe CSS: Adicionamos a classe chatbot-dialog-content ao DialogContent para permitir a ocultação do botão "X" padrão via CSS. 

## 

#### Em `ChatBot.tsx`:


🔹Correção do Flexbox Interno: Ajustamos o div logo dentro do <motion.div> para que ele não aplicasse flex flex-col quando isDialog fosse true, evitando a duplicação, já que o <motion.div> externo já fazia isso. 


🔹Adição de shrink-0: Incluímos a classe shrink-0 nos componentes <Card> do cabeçalho, do painel de perguntas rápidas e da área de input, garantindo que eles mantenham sua altura e não encolham.

## 🔧 4. Manter a conversa, na mudança de Chatbox

🔹A interface Message foi movida para src/types.ts.

🔹O estado messages e uma função addMessage para atualizá-lo foram movidos para App.tsx.

🔹messages e addMessage são passados como props para ambas as instâncias do <ChatBot> em App.tsx.

🔹ChatBot.tsx foi atualizado para receber e usar messages e addMessage via props, removendo seu estado interno messages. Ele ainda gerencia inputText e isTyping internamente por simplicidade.

🔹O useEffect em ChatBot.tsx que chama scrollToBottom agora depende da prop messages.

🔹Com essas alterações, o estado da conversa (messages) é gerenciado pelo componente App e compartilhado entre as duas formas de exibição do chat (diálogo e tela cheia), garantindo que a conversa persista ao alternar entre elas.

## 🔧 5. Cor de seleção de botão

Utilizada a variante ghost a todos os botões e usando **cn** para estilizar o botão ativo com sublinhado e os inativos com uma cor diferente

```ts
import { cn } from './components/ui/utils';
```

####  ▶Linha 87

```ts
<div className="flex items-center space-x-2 sm:space-x-6">
              {/* Botão Início */}
              <Button
                variant="ghost" // Sempre ghost
                onClick={() => { playSound('click'); setCurrentPage('home'); }}
                className={cn(
                  "hover:bg-[#003A88] transition-all duration-300 text-xs sm:text-sm px-2 sm:px-4", // Classes base + hover
                  currentPage === 'home'
                    ? 'text-white underline underline-offset-4' // Estilo ativo
                    : 'text-blue-200 hover:text-white' // Estilo inativo
                )}
              >
                Início
              </Button>

              {/* Botão Chatbot */}
              <Button
                variant="ghost" // Sempre ghost
                onClick={() => { playSound('click'); setCurrentPage('chatbot'); }}
                className={cn(
                  "hover:bg-[#003A88] transition-all duration-300 text-xs sm:text-sm px-2 sm:px-4", // Classes base + hover
                  currentPage === 'chatbot'
                    ? 'text-white underline underline-offset-4' // Estilo ativo
                    : 'text-blue-200 hover:text-white' // Estilo inativo
                )}
              >
                Chatbot
              </Button>

              {/* Botão Equipe */}
              <Button
                variant="ghost" // Sempre ghost
                onClick={() => { playSound('click'); setCurrentPage('team'); }}
                className={cn(
                  "hover:bg-[#003A88] transition-all duration-300 text-xs sm:text-sm px-2 sm:px-4", // Classes base + hover
                  currentPage === 'team'
                    ? 'text-white underline underline-offset-4' // Estilo ativo
                    : 'text-blue-200 hover:text-white' // Estilo inativo
                )}
              >
                Equipe
              </Button>

              {/* Botão Contato */}
              <Button
                variant="ghost" // Sempre ghost
                onClick={() => { playSound('click'); setCurrentPage('contact'); }}
                className={cn(
                  "hover:bg-[#003A88] transition-all duration-300 text-xs sm:text-sm px-2 sm:px-4", // Classes base + hover
                  currentPage === 'contact'
                    ? 'text-white underline underline-offset-4' // Estilo ativo
                    : 'text-blue-200 hover:text-white' // Estilo inativo
                )}
              >
                Contato
              </Button>

              {/* Botão Dark Mode (sem alterações) */}
              <Button
                variant="ghost"
                onClick={toggleDarkMode}
                className="text-white hover:bg-[#003A88] transition-all duration-300 w-8 h-8 sm:w-10 sm:h-10 p-0"
                title={isDarkMode ? "Modo Claro" : "Modo Escuro"}
              >
                {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
              </Button>
            </div>
            
```

* variant="ghost": Aplicado a todos os botões de navegação.

* className={cn(...)}: Usado para combinar as classes base e as classes condicionais.

* Classes Base: Incluem hover:bg-[#003A88], transition-all, duration-300, tamanhos de texto e paddings.

* Estilo Ativo: text-white underline underline-offset-4 aplicado quando currentPage corresponde ao botão.

* Estilo Inativo: text-blue-200 hover:text-white aplicado aos outros botões


## 🔧 5. Altura dos cards do time, status fake e icone e-mail

No arquivo `TeamPages.tsx`:
### ➡ Altura dos cards

```ts
<motion.div
  key={index}
  className="h-full" // <--- Adicionado esta classe
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
>
```
```ts
<Card
  className={`${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/10 border-white/20'} backdrop-blur-sm hover:bg-white/15 transition-all duration-300 group overflow-hidden h-full flex flex-col`}> // <--- Adicionado h-full flex flex-col

```
# 
### ➡ Status Fake
* Apenas comentado o bloco
```ts
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
```
#
### ➡ Icone de E-mail
* Apenas comentado o bloco

```ts
{/* <button className={`w-8 h-8 ${isDarkMode ? 'bg-gray-700 hover:bg-[#003A88]' : 'bg-white/10 hover:bg-[#003A88]'} rounded-full flex items-center justify-center text-white transition-all duration-300`}>
    <Mail className="w-4 h-4" />
</button> */}
```

## 🔧 6. Ajuste no fomulario de Contato

No Arquivo `ContactPage.tsx`:

* Removido o bloco "Empresa e ajustado posição e tamanho dos demais campos:

```ts
<form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">

              {/* Container ajustado */}
              <div className="space-y-4 sm:space-y-6">

                {/* Linha 1: Nome (ocupa 100%) */}
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

                {/* Linha 2: E-mail e Telefone lado a lado */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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

                  <div>
                    <label className={`block ${isDarkMode ? 'text-gray-200' : 'text-gray-700'} mb-2 text-sm sm:text-base`}>
                      Telefone
                    </label>
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

              {/* Botão Enviar */}
              <Button
                type="submit"
                className={`w-full ${isDarkMode ? 'bg-blue-600 hover:bg-[#003A88]' : 'bg-gray-900 hover:bg-[#003A88]'} text-white py-4 sm:py-6 text-base sm:text-lg transition-all duration-300`}
              >
                Enviar Mensagem
              </Button>

              {/* Texto de privacidade */}
              <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center mt-4`}>
                Ao enviar este formulário, você concorda com nossos termos de privacidade.
              </p>
            </form>

```

## 🔧 6. Removido telefone e alterado email nos cards para contato

No Arquivo `ContactPage.tsx`:

* Alterado email no card 1 e comentado card2
* Alterado o sm:grid-cols de 3 para 2

```ts
{/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8"
        >
          <Card className={`${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/10 border-white/20'} backdrop-blur-sm p-5 sm:p-6 text-center transition-all duration-300 hover:bg-white/15`}>
            <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-blue-300 mx-auto mb-2 sm:mb-3" />
            <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Email</h3>
            <p className="text-blue-200 text-xs sm:text-sm">atendimento@kombotia.com.br</p>
          </Card>

          {/* <Card className={`${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/10 border-white/20'} backdrop-blur-sm p-5 sm:p-6 text-center transition-all duration-300 hover:bg-white/15`}>
            <Phone className="w-7 h-7 sm:w-8 sm:h-8 text-blue-300 mx-auto mb-2 sm:mb-3" />
            <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Telefone</h3>
            <p className="text-blue-200 text-xs sm:text-sm">(11) 9999-9999</p>
          </Card> */}

          <Card className={`${isDarkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/10 border-white/20'} backdrop-blur-sm p-5 sm:p-6 text-center transition-all duration-300 hover:bg-white/15`}>
            <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-blue-300 mx-auto mb-2 sm:mb-3" />
            <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Localização</h3>
            <p className="text-blue-200 text-xs sm:text-sm">São Paulo, Brasil</p>
          </Card>
        </motion.div>
```