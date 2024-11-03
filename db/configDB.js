import sqlite3 from 'sqlite3'
import { open } from 'sqlite';
 

// you would have to import / invoke this in another file
export async function openDb () {
  return open({
    filename: 'alunos.db',
    driver: sqlite3.Database
  })
}

  export async function insertAluno(aluno) {

    try {
        const db = await openDb();
            await db.run('INSERT INTO alunos(nome, matricula, turma, phoneResponsavel,nomeResponsavel, idChip) VALUES (?,?,?,?,?,?)', [aluno.nome, aluno.matrícula, aluno.turma, aluno.phoneResponsavel, aluno.nomeResponsavel, aluno.idChip]);
        console.log("dados isneridos com sucesso.");

    } catch (error) {
        console.log("Erro no INSERT do banco, erro:", error);
    }
}

export async function selectAllAlunos() {
    try {
        const db = await openDb();
        const alunos = await db.all('SELECT * FROM alunos'); // Use db.all() para obter todos os registros
        return alunos; // Retorna a lista de alunos
    } catch (error) {
        console.error("Erro ao selecionar alunos:", error); // Loga o erro para depuração
        throw error; // Re-throw the error to be handled by the calling function
    }
}

export async function selecAlunoChip(idChip) {

    try {
        const db = await openDb();
        const aluno = await db.get('SELECT * FROM alunos WHERE idChip = ?',[idChip])
       
        return aluno;
    } catch (error) {
        console.log("Erro ao selecioanr aluno por chip, erro:", error)
    }
    
}