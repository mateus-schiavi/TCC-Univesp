import ReactDom from 'react-dom';

export function ButtonSubmit(){
    const formStatus = ReactDom.useFormStatus();
    
    return(<button type='submit' style={{cursor: 'help'}} disabled={formStatus.pending}>→</button>);
}