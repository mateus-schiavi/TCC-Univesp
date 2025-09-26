import { actionSubmit } from '../submit';
import { ButtonSubmit } from './button';

export function FormText(){
    return(
        <form className='chat-form' action={actionSubmit}>
            <div>
                <textarea name="name_textarea" id="id_textarea" placeholder='Converse...'/>
            </div>
            <ButtonSubmit/>
        </form>
    )
}
