'use client';
import Image from 'next/image';
import React from 'react';

import "./dialog.css";

import svg_robot from './robot.svg';

const SIZE = 30;
const PORT = 5432;

export default function Page() {
    const ref = React.useRef<HTMLDialogElement>(null);
    const [state, setState] = React.useState(false);

    function handleClick() {
        // ref.current?.show();
        setState(p => !p);
    }
    return (
        <>
            <dialog ref={ref} open={state}>
                <div className='chat-header flex-center'>
                    <div><Image src={svg_robot} alt='robot icon' width={100} height={100}/></div>
                    <div>Assisnte Virtual</div>
                    <div>
                        <button onClick={() => ref.current?.close()} className='close'>X</button>
                    </div>
                </div>
                <div className='chat-content'>
                    <div className='chat-message-item sent'>Olá, eu gostaria de ajuda.</div>
                    <div className='chat-message-item received'>Olá, sou seu assistente virtual e vou lhe ajudar!</div>
                </div>
                <form className='chat-form'>
                    <div>
                        <textarea name="name_textarea" id="id_textarea" placeholder='Converse...'/>
                    </div>
                    <div><button type='submit' style={{cursor: 'help'}}>→</button></div>
                </form>
            </dialog>
            <button className='assistance flex-center' onClick={handleClick}><Image src='/mark-question.svg' alt='question mark' width={SIZE} height={SIZE} /></button>
        </>
    )
}
