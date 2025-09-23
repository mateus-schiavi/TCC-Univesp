'use server';
const PORT = 5432;

export async function actionSubmit(formData:FormData){
    console.log('Action triggered');
    const msg = formData.get('name_textarea');
    await new Promise(r=>setTimeout(r, 3000));
}
