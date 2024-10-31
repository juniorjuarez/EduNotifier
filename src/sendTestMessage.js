import twilio from 'twilio';

// Configuração do Twilio
const accountSid = 'ACb582bb0a864aad2dd5ece4f47ed4eb48';
const authToken = '95b7036afd45f7c9991127de3051fa2b';

const client = twilio(accountSid, authToken);

const numberTest = 'whatsapp:+553892229666'; // Número de destino
const sandboxNumber = 'whatsapp:+14155238886'; // Número do sandbox do Twilio


const teste = "3892229666"

async function enviarMensagem(phone) {

    if (!phone.includes("whatsapp:+55")) {
        phone= "whatsapp:+55" + phone;
    }

    const newNumber = phone;

    const messageAluno = 'Olá, teste de mensagem! ese deu certo, hehee, aluno zezim'+ phone;
    
    try {
        const message = await client.messages.create({
            from: sandboxNumber,
            body: messageAluno, // Altere para 'body'
            to: newNumber,
        });
        console.log('Mensagem enviada com sucesso! SID:', message.sid);
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
    }
}

export { enviarMensagem };