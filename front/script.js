const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const nextMsgBtn = document.getElementById('nextMsgBtn');

let noBtnClicks = 0;
let noBtnScale = 1;
let yesBtnScale = 1;

noBtn.addEventListener('click', () => {
  noBtnClicks++;
  noBtnScale *= 0.85;
  yesBtnScale *= 1.15;
  noBtn.style.transform = `scale(${noBtnScale})`;
  yesBtn.style.transform = `scale(${yesBtnScale})`;
  if (noBtnClicks >= 5) {
    noBtn.style.transition = 'opacity 0.5s';
    noBtn.style.opacity = '0';
    setTimeout(() => {
      noBtn.style.display = 'none';
      yesBtn.style.transform = 'scale(1)';
      mostrarModal(); // Mostra o modal após o botão sumir
    }, 500);
  }
});

yesBtn.addEventListener('click', () => {
  // Efeito de confete usando canvas-confetti
  if (window.confetti) {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  } else {
    // Carrega o script do confetti se não estiver presente
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
    script.onload = () => {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    };
    document.body.appendChild(script);
  }
  // Tocar música de comemoração com volume reduzido
  const audio = document.getElementById('audioComemoracao');
  if (audio) {
    audio.volume = 0.1;
    audio.currentTime = 0.5;
    audio.play();
  }
  // Enviar notificação por e-mail via backend
  fetch('', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      subject: 'Pedido aceito! 🎉',
      text: 'O botão SIM foi clicado! Parabéns, ela aceitou!'
    })
  });
  // Trocar para "nova página" via JS
  setTimeout(() => {
    // Permitir scroll normalmente
    document.body.style.overflow = 'auto';
    document.body.style.height = '';
    document.body.classList.add('aceito');
    document.body.innerHTML = `
      <style>
        body.aceito {
          background: linear-gradient(135deg, #f8ffae 0%, #43c6ac 100%);
          animation: bgMove 10s ease-in-out infinite alternate;
          font-family: 'Segoe UI', 'Poppins', Arial, sans-serif;
          transition: background 1s;
        }
        @keyframes bgMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .aceito-main {
          min-height:100vh;
          width:100%;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:flex-start;
          padding:0;
          margin:0;
          animation: fadeIn 1.2s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: none; }
        }
        .aceito-titulo {
          font-size:2.5em;
          color:#a4508b;
          margin-top:48px;
          margin-bottom:24px;
          text-shadow: 0 2px 16px #fff7, 0 1px 0 #fff;
          letter-spacing: 1px;
          font-family: 'Poppins', 'Segoe UI', Arial, sans-serif;
        }
        .aceito-bloco {
          background: rgba(255,255,255,0.92);
          border-radius: 22px;
          box-shadow: 0 8px 32px rgba(164,80,139,0.13), 0 1.5px 0 #fff;
          padding: 36px 32px 32px 32px;
          margin-bottom: 32px;
          margin-top: 0;
          width: 95%;
          max-width: 700px;
          border: 2.5px solid #a4508b22;
          backdrop-filter: blur(2px);
        }
        .aceito-img {
          border-radius: 18px;
          box-shadow: 0 4px 18px #a4508b33;
          border: 2px solid #fff;
          background: #fff;
          transition: transform 0.3s;
        }
        .aceito-img:hover {
          transform: scale(1.07) rotate(-2deg);
          box-shadow: 0 8px 32px #a4508b44;
        }
        .aceito-texto {
          color: #5a2d5c;
          font-size: 1.18em;
          line-height: 1.7;
          margin: 0 0 0 0;
          font-family: 'Segoe UI', 'Poppins', Arial, sans-serif;
          text-align: justify;
        }
        .aceito-btn {
          margin-top: 32px;
          background: linear-gradient(90deg, #a4508b 0%, #5f0a87 100%);
          color: #fff;
          font-size: 1.25em;
          font-weight: 600;
          border: none;
          border-radius: 12px;
          padding: 16px 38px;
          box-shadow: 0 4px 18px #a4508b33;
          cursor: pointer;
          transition: background 0.3s, transform 0.2s, box-shadow 0.2s;
          letter-spacing: 1px;
        }
        .aceito-btn:hover {
          background: linear-gradient(90deg, #5f0a87 0%, #a4508b 100%);
          transform: scale(1.07);
          box-shadow: 0 8px 32px #a4508b44;
        }
        @media (max-width: 700px) {
          .aceito-bloco { padding: 18px 6px 18px 6px; }
          .aceito-titulo { font-size: 1.5em; margin-top: 24px; }
          .aceito-img { width: 120px !important; min-width: 80px !important; }
        }
      </style>
      <div class="aceito-main">
        <h1 class="aceito-titulo">Agr sim da pra dizer que namoramos, né?</h1>
        <div class="aceito-bloco">
          <div style='display:flex;align-items:center;justify-content: center; justify-items: center;gap:32px;flex-wrap:wrap;'>
            <img src='https://i.postimg.cc/nz4yvHRv/image.png' alt='Foto casal' class="aceito-img" style='width:512px;min-width:120px;max-width:40vw;'>
            <p class="aceito-texto">
              Meu amor, desde que nos conhecemos, eu senti que a gente se daria muito bem, cada conversa, cada risada, fomos nos conectando cada vez mais e mais. Eu não tava esperando por conhecer alguém ou me apaixonar, mas meio que aconteceu, né? Enfim, vc não tem ideia de quanto eu to pulando de alegria e felicidade agora KKKKKKKKKKK<br><br>
              Vc é a mulher que quero na minha vida até o final, sabe aquilo de "Você conseguiria se ver no futuro com essa pessoa?", então, eu definitivamente consigo nos ver juntos no futuro. Com vc eu me sinto tão bem, sei lá, só a sua companhia ja me acalma e me deixa feliz, todos os momentos que estive contigo foram maravilhosos pra mim, e espero que o mesmo seja verdade pra ti <3<br><br>
              Eu amo cada detalhe seu, seu jeito, sua voz, sua risada, seu humor q é bem parecido com o meu, seu rosto, seu cabelo(mesmo que esteja diferente a cada mes). E eu também amo muito a forma como eu me sinto amado e cuidado contigo. Espero que agora a gente continue da mesma forma, se tratando como sempre, e se amando cada vez mais.
            </p>
          </div>
          <div style='display:flex;align-items:center;gap:32px;flex-wrap:wrap-reverse;margin-top:32px;'>
            <p class="aceito-texto">
              Sei bem que tem dias que são uma merda, e até já passamos por dias que estavam horríveis pra gente, mesmo em pouco tempo, e eu definitivamente quero ser a pessoa que vai estar do teu lado em todos os momentos, eu te quero, eu te amo e eu te preciso, seja em momentos bons ou ruins, felizes ou tristes, eu espero que eu possa estar contigo em todos esses momentos.<br><br>
              É claro que ainda quero te fazer um outro pedido pessoalmente, com a aliança mais linda desse mundo, e da forma mais especial possível, mas não achava justo continuar esperando até esse momento sem ter algo definitivo, algo pra dizer "Agora estamos juntos, estamos namorando", sabe?<br><br>
              Agora, oficialmente, somos namorados e nesse momento tenho certeza que sou a pessoa mais feliz do mundo, e espero que tu também esteja. Eu te amo muito, e quero passar o resto da minha vida contigo.<br><br>
            </p>
            <img src='https://i.postimg.cc/8z7n6k8d/casal2.jpg' alt='Foto juntos' class="aceito-img" style='width:180px;min-width:120px;max-width:40vw;'>
          </div>
          <div style='display:flex;align-items:center;gap:32px;flex-wrap:wrap;margin-top:32px;'>
            <img src='https://i.postimg.cc/3x3QzSGq/casal3.jpg' alt='Mais um momento' class="aceito-img" style='width:180px;min-width:120px;max-width:40vw;'>
            <p class="aceito-texto">
              Espero que nossa vontade de estar um com o outro nunca deixe de existir, e só aumente, assim com o o que sentimos um pelo outro, eu te amo MUITO mesmo, meu bem.<br><br>
              Ficou parecendo uma carta né? Acho que vou encerrar como se fosse uma também.<br><br>
              <span style='font-size:1.1em;color:#a4508b;'>Com todo meu amor,</span><br>Eduardo.
            </p>
          </div>
        </div>
        <button onclick="location.reload()" class="aceito-btn">Voltar para o início</button>
      </div>
    `;
  }, 2400); // espera um pouco para o confete/música
});

// Apresentação inicial
const intro = document.getElementById('intro');
const introMessage = document.getElementById('introMessage');
const mainContainer = document.getElementById('mainContainer');

const mensagens = [
  'Oiiii meu bem, entãoooo',
  'Tenho algo pra te dizer',
  'Sei que você já deve imaginar o que é, mas bom...',
  'Desde que nos conhecemos, nós nos aproximamos muito e até hoje eu não fiz um pedido de namoro',
  'Então, não que seja um momento especial ou algo do tipo, mas é o momento que eu escolhi pra isso',
  'Não é algo tão elaborado, mas é de coração, gastei um bom tempo pensando no que faria'
];

let msgIndex = 0;

function mostrarMensagem(direcao = 'inicial') {
  const contador = document.getElementById('contadorTempo');
  if (direcao === 'slide') {
    introMessage.classList.add('slide-out');
    setTimeout(() => {
      introMessage.classList.remove('slide-out');
      msgIndex++;
      if (msgIndex < mensagens.length) {
        introMessage.textContent = mensagens[msgIndex];
        introMessage.classList.add('slide-in');
        setTimeout(() => {
          introMessage.classList.remove('slide-in');
        }, 250); // animação mais rápida
      } else {
        intro.style.opacity = '0';
        setTimeout(() => {
          intro.style.display = 'none';
          mainContainer.style.display = '';
          if (contador) contador.style.display = '';
        }, 400); // transição mais rápida
      }
    }, 250); // tempo menor entre as falas
  } else {
    introMessage.textContent = mensagens[msgIndex];
    if (contador) contador.style.display = 'none';
  }
}

nextMsgBtn.addEventListener('click', () => {
  if (msgIndex < mensagens.length) {
    mostrarMensagem('slide');
  }
});

// Countdown reverso desde 18/06/2025
function atualizarContador() {
  const inicio = new Date('2025-06-18T00:00:00');
  const agora = new Date();
  let diff = agora - inicio;
  if (diff < 0) diff = 0;
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);
  const texto = `Fazem ${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos que a gnt começou a se aproximar`;
  const contador = document.getElementById('contadorTempo');
  if (contador) contador.textContent = texto;
}
setInterval(atualizarContador, 1000);
window.addEventListener('DOMContentLoaded', () => {
  mostrarMensagem();
  atualizarContador();
});

// Modal personalizado
function mostrarModal() {
  if (document.getElementById('modalNamoro')) return;
  const modal = document.createElement('div');
  modal.id = 'modalNamoro';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100vw';
  modal.style.height = '100vh';
  modal.style.background = 'rgba(0,0,0,0.5)';
  modal.style.display = 'flex';
  modal.style.alignItems = 'center';
  modal.style.justifyContent = 'center';
  modal.style.zIndex = '9999';
  const box = document.createElement('div');
  box.style.background = '#fff';
  box.style.padding = '32px 28px';
  box.style.borderRadius = '18px';
  box.style.boxShadow = '0 4px 24px rgba(0,0,0,0.18)';
  box.style.fontSize = '1.3em';
  box.style.color = '#a4508b';
  box.style.textAlign = 'center';
  box.textContent = 'Vai namorar comigo sim, ngm disse q vc tem opção';
  modal.appendChild(box);
  document.body.appendChild(modal);
  // Fechar ao clicar em qualquer lugar
  modal.addEventListener('click', () => {
    modal.remove();
  });
  // Fechar automaticamente após 2 segundos
  setTimeout(() => {
    if (document.body.contains(modal)) {
      modal.remove();
    }
  }, 2000);
}
