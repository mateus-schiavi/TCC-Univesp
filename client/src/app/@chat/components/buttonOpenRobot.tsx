import Image from 'next/image';

const SIZE = 30;

export function ButtonOpenRobot({ setState }: {setState: React.Dispatch<React.SetStateAction<boolean>>}){
    function handleClick() {
        // ref.current?.show();
        setState(p => !p);
    }
    return <button className='assistance flex-center' onClick={handleClick}><Image src='/mark-question.svg' alt='question mark' width={SIZE} height={SIZE} /></button>;
}