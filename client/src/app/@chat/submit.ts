'use server';
// import axios from 'axios';

const hostname = 'localhost';
const path = '/api';
const PORT = 5432;

const url = `${hostname}:${PORT}${path}`;

export async function actionSubmit(formData:FormData){
    console.log('Action triggered');
    const msg = formData.get('name_textarea')?.toString();
    const response = await fetch('http://localhost:3000/api',
        {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({msg})
        });
    // console.log(response);
}
