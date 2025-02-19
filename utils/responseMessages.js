// Função para retornar a mensagem de sucesso
function successMessage() {
    return `
      <html>
        <head>
          <meta http-equiv="refresh" content="3; url='/'" />
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding-top: 50px; }
            .message { font-size: 24px; color: green; }
          </style>
        </head>
        <body>
          <div class="message">Sucesso! Você será redirecionado.</div>
        </body>
      </html>
    `;
  }
  
  // Função para retornar a mensagem de erro
  function errorMessage() {
    return `
      <html>
        <head>
          <meta http-equiv="refresh" content="3; url='/'" />
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding-top: 50px; }
            .message { font-size: 24px; color: red; }
          </style>
        </head>
        <body>
          <div class="message">Erro. Você será redirecionado.</div>
        </body>
      </html>
    `;
  }
  
  module.exports = {
    successMessage,
    errorMessage
  };