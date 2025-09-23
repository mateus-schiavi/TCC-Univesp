import Image from 'next/image';
import svg_robot from './robot.svg';

export function Header({reff}: {reff: React.RefObject<HTMLDialogElement | null>}){
    return(
        <div className='chat-header flex-center'>
            <div><Image src={svg_robot} alt='robot icon' width={100} height={100}/></div>
            <div>Assisnte Virtual</div>
            <div>
                <button onClick={() => reff.current?.close()} className='close'>X</button>
            </div>
        </div>
    );
}