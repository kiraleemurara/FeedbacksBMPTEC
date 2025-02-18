const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { successMessage, errorMessage } = require('./utils/responseMessages'); // Importando as mensagens
const listarArquivosGerados = require('./public/services/listarArquivosGerados'); // Importando a função para listar os arquivos
const gerarQuestionario = require('./public/services/outputQuestionario'); // Importando a função de geração do DOCX
const ziparConteudo = require('./public/services/ziparConteudos');  // Importando a função de compactar arquivos
const excluirArquivos  = require('./public/services/excluirArquivos');


const pastaArquivos = path.join(__dirname, 'public', 'services', 'arquivos'); // Caminho da pasta onde os arquivos estão gerados
const app = express();

// Configuração do middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Servindo arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));
// Tornando a pasta de arquivos acessível publicamente
app.use('/arquivos', express.static(path.join(__dirname, 'public', 'services', 'arquivos')));

// Rota para carregar a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/index.html'));
});

// Rota para exibir o formulário de questionário
app.get('/questionario', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/questionario.html'));
});

// Rota de Metas Anuais
app.get('/metasAnuais', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/html/metasAnuais.html'));
});

// Rota para listar arquivos gerados
app.get('/api/arquivos', async (req, res) => {

  try {
    // Chama a função para listar os arquivos gerados
    const arquivos = await listarArquivosGerados(pastaArquivos);
    res.json(arquivos); // Retorna os arquivos encontrados para o frontend
  } catch (error) {
    console.error('Erro ao listar arquivos:', error);
    res.status(500).send('Erro ao listar arquivos gerados');
  }
});


// Endpoint de compactacao de arquivos
app.get('/compactar', (req, res) => {
  ziparConteudo(res, pastaArquivos); 
});


// Endpoint para excluir todos os arquivos dentro da pasta public/arquivos
app.delete('/excluirArquivos', async (req, res) => {
  try {
    const resultado = await excluirArquivos(pastaArquivos);
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Rota de envio de formulário
app.post('/submit', (req, res) => {
  const respostas = req.body;

  // Chamando a função para gerar o documento DOCX
  gerarQuestionario(respostas)
    .then((filePath) => {
      console.log(`Documento salvo em: ${filePath}`);
      // Envia a resposta de sucesso com a mensagem importada
      res.status(200).send(successMessage());
    })
    .catch((error) => {
      console.error('Erro ao gerar o arquivo DOCX', error);
      // Envia a resposta de erro com a mensagem importada
      res.status(500).send(errorMessage());
    });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
