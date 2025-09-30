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
}
