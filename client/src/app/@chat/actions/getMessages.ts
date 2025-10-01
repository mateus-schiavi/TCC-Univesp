'use server';
import axios from 'axios';

export async function getMessages(){
    const response = await axios.get("http://localhost:3000/api");
    return response.data;
}
