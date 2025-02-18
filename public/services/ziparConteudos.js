const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

// Função para compactar e gerar o arquivo ZIP
function ziparConteudo(res, arquivosDir) {
  const outputFileName = 'arquivos_compactados.zip';
  const outputPath = path.join(__dirname, outputFileName);
  
  // Criar o stream de saída
  const output = fs.createWriteStream(outputPath);
  
  // Criar o arquivador ZIP
  const archive = archiver('zip', {
    zlib: { level: 9 }  // Definindo o nível de compressão
  });

  // Quando o arquivo ZIP for gerado com sucesso, o arquivo será enviado para o cliente
  output.on('close', () => {
    console.log(`Arquivo compactado com sucesso. Tamanho total: ${archive.pointer()} bytes.`);
    res.download(outputPath, outputFileName, () => {
      // Remover o arquivo ZIP após o download
      fs.unlinkSync(outputPath);
    });
  });

  // Se ocorrer um erro durante a criação do arquivo
  archive.on('error', (err) => {
    console.error('Erro ao compactar:', err);
    res.status(500).send('Erro ao compactar os arquivos.');
  });

  // Configurar a resposta para a compactação
  res.attachment(outputFileName);

  // Pipe para o stream de saída
  archive.pipe(output);

  // Adiciona o conteúdo do diretório 'arquivos' ao arquivo ZIP
  archive.directory(arquivosDir, false);  // false significa não incluir o diretório raiz no ZIP

  // Finalizar a compactação
  archive.finalize();
}

// Exportando a função para ser usada em outros arquivos
module.exports =  ziparConteudo ;
