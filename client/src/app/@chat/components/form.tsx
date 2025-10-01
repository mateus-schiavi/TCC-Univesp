// import { actionSubmit } from '../submit';
import { ButtonSubmit } from './button';
import type { IChatResponse } from '#/types/IChatResponse';
type typeOptimistic = (action: IChatResponse[] | ((pendingState: IChatResponse[]) => IChatResponse[])) => void;

export function FormText({setOptimistic}: {setOptimistic: typeOptimistic}){
    async function actionSubmit(formData:FormData){
        const msg = formData.get('name_textarea')?.toString() ?? '';
        const padrao = {pergunta: msg, resposta: "Aguarde um momento, estou pensando..."};
        setOptimistic(p=>[...p, padrao]);

        const response = await fetch('http://localhost:3000/api',
            {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({msg})
            });
        // return response;
        return;
    }

    return(
        <form className='chat-form' action={actionSubmit}>
            <div>
                <textarea name="name_textarea" id="id_textarea" placeholder='Converse...'/>
            </div>
            <ButtonSubmit/>
        </form>
    )
}
