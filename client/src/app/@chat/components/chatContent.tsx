import React from 'react';
import type { IChatResponse } from '#/types/IChatResponse';

export function ChatContent({data}:{data:IChatResponse[]}) {
  return (
    <div className="chat-content">
      {data.map((q, i) => (
        <React.Fragment key={i}>
          <div className="chat-message-item sent">{q.pergunta}</div>
          <div className="chat-message-item received">{q.resposta}</div>
        </React.Fragment>
      ))}
    </div>
  );
}
