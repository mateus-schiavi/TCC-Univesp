import type { IChatResponse } from '#/types/IChatResponse';
// import type {NextRequest } from 'next/server';

// Fake API
const data: Array<IChatResponse> = [
    { pergunta: "Olá, preciso de ajuda", resposta: "Sou seu assistente virtual e vou lhe ajudar!" },
]

export async function GET() {
    return Response.json(data);
}

export async function POST(request: Request) {
    const j = await request.json();
    const response = Math.random().toString();
    const obj = { pergunta: j?.msg, resposta: response };
    data.push(obj);
    await new Promise(r=>setTimeout(r, 3000));
    return Response.json(obj);
}
