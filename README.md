# EduConnect

EduConnect é um sistema simples de monitoramento escolar que utiliza o WhatsApp para enviar notificações automáticas aos responsáveis. Este projeto permite o cadastro de alunos, rastreamento de entrada na escola e envio de mensagens em tempo real via Twilio.

## Funcionalidades

- **Cadastro de Alunos**: Adiciona alunos com nome, idade, telefone do responsável e ID do chip.
- **Registro de Entrada**: Detecta o aluno pelo ID do chip e aciona uma notificação.
- **Notificações via WhatsApp**: Usa Twilio para enviar mensagens aos responsáveis, informando a entrada do aluno na escola.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento backend.
- **Express**: Framework para construção de APIs REST.
- **Twilio API**: Serviço de envio de mensagens WhatsApp.
- **UUID**: Biblioteca para geração de IDs únicos.
- **JavaScript (ES6)**: Para a lógica do servidor e manipulação de dados.

## Configuração e Execução

### Pré-requisitos

- Node.js (versão 14 ou superior)
- Conta Twilio e Sandbox configurado para WhatsApp

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/educonnect.git
   cd educonnect
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   Crie um arquivo `.env` na raiz do projeto e adicione suas credenciais do Twilio:

   ```
   TWILIO_ACCOUNT_SID=seuAccountSid
   TWILIO_AUTH_TOKEN=seuAuthToken
   SANDBOX_NUMBER=whatsapp:+14155238886 # número padrão do Twilio para testes
   ```

### Executando o Projeto

Inicie o servidor:

```bash
npm start
```

Acesse a API em `http://localhost:3333`.

## Endpoints

### Cadastro de Aluno

- **POST** `/cadastraAluno`
  - **Exemplo de Body**:
    ```json
    {
      "nome": "Joao",
      "idade": 10,
      "telefonePai": "38999999999",
      "idChip": "chip123"
    }
    ```

### Registrar Entrada do Aluno

- **POST** `/entradaAluno/:idChip`

### Buscar Aluno

- **GET** `/buscaAluno/:idChip`

## Exemplo de Uso

Para cadastrar um aluno:

```bash
curl -X POST http://localhost:3333/cadastraAluno -H "Content-Type: application/json" -d '{"nome": "Joao", "idade": 10, "telefonePai": "38999999999", "idChip": "chip123"}'
```

Para registrar uma entrada:

```bash
curl -X POST http://localhost:3333/entradaAluno/chip123
```

Para buscar um aluno:

```bash
curl -X GET http://localhost:3333/buscaAluno/chip123
```

## Contribuição

Contribuições são bem-vindas! Para sugestões e melhorias, crie uma issue ou faça um pull request.

## Licença

Este projeto está sob a licença MIT. 

