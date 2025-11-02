// Função para enviar mensagem ao backend
export async function sendMessageToBackend(userMessage: string) {
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
