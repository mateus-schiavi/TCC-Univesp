export interface IChatResponse {
    // id: number; // Se o banco de dados contém dados de todos usuários, usar um identificador para separar cada um
    pergunta: string;
    resposta?: string;
}