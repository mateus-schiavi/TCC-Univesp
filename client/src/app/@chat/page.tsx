'use client';
import Image from 'next/image';
import React from 'react';

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
                <button onClick={() => ref.current?.close()} className='close'>X</button>
                {/* <button type='submit' formMethod='dialog'>-</button> */}
                <div>Olá, sou seu assistente virtual e vou lhe ajudar!</div>
                <form>
                    <textarea name="name_textarea" id="id_textarea"></textarea>
                    <button type='submit'>Enviar</button>
                </form>
            </dialog>
            <button className='assistance' onClick={handleClick}><Image src='/mark-question.svg' alt='question mark' width={SIZE} height={SIZE} /></button>
        </>
    )
}
