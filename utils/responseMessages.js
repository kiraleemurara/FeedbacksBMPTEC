// Função para retornar a mensagem de sucesso
function successMessage() {
  return `
    <html>
      <head>
        <meta http-equiv="refresh" content="5; url='/'" />
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f0f8ff;
            margin: 0;
          }
          .card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
            text-align: center;
            max-width: 400px;
            width: 90%;
            animation: fadeIn 1s ease-in-out;
          }
          .message {
            font-size: 22px;
            color: green;
            margin-bottom: 10px;
          }
          .countdown {
            font-size: 18px;
            color: #333;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="message">Sucesso! Você será redirecionado em <span id="timer">5</span> segundos.</div>
        </div>
        <script>
          let count = 5;
          const timerElement = document.getElementById("timer");
          setInterval(() => {
            count--;
            if (count >= 0) {
              timerElement.textContent = count;
            }
          }, 1000);
        </script>
      </body>
    </html>
  `;
}

// Função para retornar a mensagem de erro
function errorMessage() {
  return `
    <html>
      <head>
        <meta http-equiv="refresh" content="5; url='/'" />
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #ffebee;
            margin: 0;
          }
          .card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
            text-align: center;
            max-width: 400px;
            width: 90%;
            animation: fadeIn 1s ease-in-out;
          }
          .message {
            font-size: 22px;
            color: red;
            margin-bottom: 10px;
          }
          .countdown {
            font-size: 18px;
            color: #333;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="message">Erro! Você será redirecionado em <span id="timer">5</span> segundos.</div>
        </div>
        <script>
          let count = 5;
          const timerElement = document.getElementById("timer");
          setInterval(() => {
            count--;
            if (count >= 0) {
              timerElement.textContent = count;
            }
          }, 1000);
        </script>
      </body>
    </html>
  `;
}

module.exports = {
  successMessage,
  errorMessage
};
