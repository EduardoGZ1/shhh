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
  fetch('https://shhh-08re.onrender.com/api/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      subject: 'Pedido aceito! 🎉',
      text: 'O botão SIM foi clicado! Parabéns, ela aceitou!'
    })
  });
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
