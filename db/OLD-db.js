import {randomUUID} from "node:crypto"

export class Aluno {

  #alunos = new Map()

  list(){
    return Array.from(this.#alunos.entries())
    .map((alunoArray)=>{
      const alunoId = alunoArray[0]
      const data = alunoArray[1]

      return{
        alunoId,
        ...data
      }
    })
  }

  create(aluno){
    const alunoId = randomUUID();
    this.#alunos.set(alunoId, aluno)
  }

  update(id, aluno){
    this.#alunos.set(id, aluno)
  }

  selectAluno(idChip) {
    for (const [alunoId, aluno] of this.#alunos.entries()) {
      if (aluno.idChip === idChip) {
        return { alunoId, ...aluno }; // Retorna o aluno com o alunoId
      }
    }
    return null; // Retorna null se nenhum aluno com o idChip foi encontrado
  
  }
  
}
