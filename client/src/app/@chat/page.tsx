'use client';
import React from 'react';

import "./dialog.css";

import { Header } from './components/header';
import { actionSubmit } from './submit';
import { ButtonSubmit } from './components/button';
import { ButtonOpenRobot } from './components/buttonOpenRobot';

export default function Page() {
    const ref = React.useRef<HTMLDialogElement>(null);
    const [state, setState] = React.useState(false);

    return (
        <>
            <dialog ref={ref} open={state}>
                <Header reff={ref}/>
                <div className='chat-content'>
                    <div className='chat-message-item sent'>Olá, eu gostaria de ajuda.</div>
                    <div className='chat-message-item received'>Olá, sou seu assistente virtual e vou lhe ajudar!</div>
                </div>
                <form className='chat-form' action={actionSubmit}>
                    <div>
                        <textarea name="name_textarea" id="id_textarea" placeholder='Converse...'/>
                    </div>
                    <ButtonSubmit/>
                </form>
            </dialog>
            <ButtonOpenRobot setState={setState}/>
        </>
    )
}
