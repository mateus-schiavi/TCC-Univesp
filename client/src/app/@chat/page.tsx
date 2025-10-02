'use client';

import "./dialog.css";
import * as TanStackQuery from '@tanstack/react-query';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import svg_robot from './components/robot.svg';

import type { IChatResponse } from '#/types/IChatResponse';
import { getMessages } from './actions/getMessages';

const SIZE = 30;

interface Message {
  type: 'sent' | 'received';
  text: string;
}

export default function Page() {
  const [state, setState] = useState(false); // controla se o dialog está aberto
  const [messages, setMessages] = useState<Message[]>([
    { type: 'received', text: 'Olá, sou seu assistente virtual e vou lhe ajudar!' }
  ]);
  const [loading, setLoading] = useState(false); 
  const contentRef = useRef<HTMLDivElement>(null);

  // 1) Buscar mensagens já existentes no backend com TanStack
  const query = TanStackQuery.useQuery<Array<IChatResponse>>({
    queryKey: ["messages"],
    queryFn: getMessages,
    initialData: [{ pergunta: '', resposta: 'Infelizmente estou encontrando problemas em me conectar.' }]
  });

  // 2) Carregar as mensagens iniciais no estado local
  useEffect(() => {
    if (query.data) {
      const loaded = query.data
      .filter(msg => msg.resposta !== undefined)
      .map(msg => ({
        type: 'received' as const,
        text: msg.resposta!
      }));
      setMessages(prev => [...prev, ...loaded]);
    }
  }, [query.data]);

  // 3) Scroll automático sempre que mensagens mudarem
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // 4) Alterna abrir/fechar o diálogo
  const handleClick = () => setState(p => !p);

  // 5) Envio de mensagens
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const textarea = e.currentTarget.querySelector('textarea') as HTMLTextAreaElement;
    const userMessage = textarea.value.trim();
    if (!userMessage) return;

    // adiciona a mensagem localmente (feedback instantâneo)
    setMessages(prev => [...prev, { type: 'sent', text: userMessage }]);
    textarea.value = '';

    try {
      setLoading(true);

      // chamada ao backend
      const response = await fetch('http://127.0.0.1:8000/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pergunta: userMessage })
      });

      const data = await response.json();

      // adiciona resposta recebida
      setMessages(prev => [...prev, { type: 'received', text: data.response }]);

      // opcional: invalidar o cache do TanStack para atualizar histórico
      query.refetch();
    } catch (error) {
      console.error('Erro ao se comunicar com o backend:', error);
      setMessages(prev => [...prev, { type: 'received', text: 'Desculpe, ocorreu um erro.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <dialog open={state}>
        <div className='chat-header flex-center'>
          <div>
            <Image src={svg_robot} alt='robot icon' width={100} height={100} />
          </div>
          <div>Assistente Virtual</div>
          <div>
            <button onClick={() => setState(false)} className='close'>X</button>
          </div>
        </div>

        <div className='chat-content' ref={contentRef}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message-item ${msg.type}`}>{msg.text}</div>
          ))}
          {loading && <div className='chat-message-item received'>Digitando...</div>}
        </div>

        <form className='chat-form' onSubmit={handleSubmit}>
          <div>
            <textarea name="name_textarea" placeholder='Converse...' />
          </div>
          <div>
            <button type='submit' style={{ cursor: 'help' }}>→</button>
          </div>
        </form>
      </dialog>

      <button className='assistance flex-center' onClick={handleClick}>
        <Image src='/mark-question.svg' alt='question mark' width={SIZE} height={SIZE} />
      </button>
    </>
  );
}
