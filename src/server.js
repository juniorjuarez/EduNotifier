import {openDb, insertAluno, selectAllAlunos, selecAlunoChip} from '../db/configDB.js';
import express from 'express';
import twilio from 'twilio';
//import { Aluno } from '../db/db.js';
// Configuração do Twilio
// const accountSid = 'AC6eb4ce1f6570bbf99e7c3575390e0040';
// const authToken = 'f73302430c1ef942c7a5a1b657ec85af';

const accountSid = 'ACb582bb0a864aad2dd5ece4f47ed4eb48';
const authToken = '95b7036afd45f7c9991127de3051fa2b';
const client = twilio(accountSid, authToken);

const numberTest = 'whatsapp:+553892229666'; 
// const phoneBernard = "whatsapp:+553884062035"
const sandboxNumber = 'whatsapp:+14155238886';

const app = express();
const PORT = 3333;

async function enviarMensagem(phone, nomeAluno) {

  if (!phone.includes("whatsapp:+55") || phone.includes("-")) {
    phone = phone.replace("-",'')  
    phone= "whatsapp:+55" + phone;

  }

  const newNumber = phone;
  
  console.log(newNumber)
  const messageAluno = 'Olá, o(a) aluno(a) ' + nomeAluno + ' passou pela catraca da portaria';
  
  try {
      const message = await client.messages.create({
          from: sandboxNumber,
          body: messageAluno, // Altere para 'body'
          to: newNumber,
      });
      console.log('Mensagem enviada com sucesso! SID:', message.sid, phone);
  } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
  }
}

app.use(express.json());

app.get('/alunos/', async (req, res) => {
  try {
    
    const alunos = await selectAllAlunos();
    
    res.status(200).json(alunos)
    console.log(alunos)
    return alunos;
  } catch (error) {
    console.log(error)
    res.send(error)
  }
  
});

app.post('/cadastraAluno', async (req, res) => {
  try {
    const body = req.body;
    console.log(req.body)
    
    // const { nome, idade, telefonePai, idChip } = req.body;
    // if(body.telefonePai.includes("-")){

    //   body.telefonePai = telefonePai.replace("-", '')
    // }

    insertAluno(body)
    // dbAluno.create({
    //   nome,
    //   idade,
    //   telefonePai,
    //   idChip
    // })
    res.status(201).send(`Aluno ${body.nome} cadastrado com sucesso!`); // Uso do nome diretamente

  } catch (error) {
    console.error("Erro ao cadastrar aluno: ",error);
    res.status(500).send("Erro ao cadastrar");
  }
});

app.post('/entradaAluno/:idChip', async (req, res) => {
 
 try {
    
    const idChipReq = req.params.idChip;
    const aluno = await selecAlunoChip(idChipReq);
    enviarMensagem(aluno.phoneResponsavel, aluno.nome)
    console.log(aluno.nome)
 
 
   res.status(200).json(aluno)
 } catch (error) {
   console.log("Erro: ",error)
 }
 
});

app.get('/buscaAluno/:idChip', async(req, res)=>{
try {
  
   const idChipReq = req.params.idChip;
   const aluno = await selecAlunoChip(idChipReq);
   console.log(aluno.nome)

  res.status(200).json(aluno)
} catch (error) {
  console.log(error)
}
})

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
