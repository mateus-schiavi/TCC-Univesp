'use client';

import React from 'react';

import "./dialog.css";

import * as TanStackQuery from '@tanstack/react-query';

import { Header } from './components/header';
import { ChatContent } from './components/chatContent';
import { FormText } from './components/form';
import { ButtonOpenRobot } from './components/buttonOpenRobot';

import type { IChatResponse } from '#/types/IChatResponse';
import { getMessages } from './actions/getMessages';

export default function Page() {
    const ref = React.useRef<HTMLDialogElement>(null);
    const [state, setState] = React.useState(false);
    const query = TanStackQuery.useQuery<Array<IChatResponse>>({
        queryKey:["messages"],
        queryFn: getMessages,
        initialData: [{pergunta: '', resposta: 'Infelizmente estou encontrando problemas em me conectar.'}]});

    const [optimistic, setOptimistic] = React.useOptimistic(query?.data);

    // query.fetchStatus
    // if(query.isLoading)
    // if(query.isPending)
    // if(query.isError){ query.error }

    return (
        <>
            <dialog ref={ref} open={state}>
                <Header reff={ref}/>
                <ChatContent data={optimistic}/>
                <FormText setOptimistic={setOptimistic}/>
            </dialog>
            <ButtonOpenRobot setState={setState}/>
        </>
    )

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import './dialog.css';
import svg_robot from './robot.svg';

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
  const [loading, setLoading] = useState(false); // indicador de "digitando..."
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll automático para a última mensagem
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleClick = () => setState(p => !p);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ⚠️ impede que a página recarregue

    const textarea = e.currentTarget.querySelector('textarea') as HTMLTextAreaElement;
    const userMessage = textarea.value.trim();
    if (!userMessage) return;

    // Adiciona a mensagem do usuário
    setMessages(prev => [...prev, { type: 'sent', text: userMessage }]);
    textarea.value = '';

    try {
      setLoading(true);

      // Chamada para o backend Django
      const response = await fetch('http://127.0.0.1:8000/api/chat/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pergunta: userMessage })
      });

      const data = await response.json();

      // Adiciona a resposta do backend
      setMessages(prev => [...prev, { type: 'received', text: data.response }]);
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
