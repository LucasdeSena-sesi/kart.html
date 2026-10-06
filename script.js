// 1. Inicializacao do banco de usuarios no localStorage caso nao exista
if (!localStorage.getItem('usuarios')) {
    const bancoInicial = [
        { usuario: 'admin', senha: '123' },
        { usuario: 'piloto1', senha: '123' }
    ];
    localStorage.setItem('usuarios', JSON.stringify(bancoInicial));
}

// 2. Logica da tela de login (index.html)
const formLogin = document.getElementById('form');

if (formLogin) {
    formLogin.addEventListener('submit', function(e) {
        e.preventDefault();

        const usuarioDigitado = document.getElementById('usuario').value;
        const senhaDigitada = document.getElementById('senha').value;

        const usuarios = JSON.parse(localStorage.getItem('usuarios'));

        const usuarioEncontrado = usuarios.find(function(user) {
            return user.usuario === usuarioDigitado && user.senha === senhaDigitada;
        });

        if (usuarioEncontrado) {
            localStorage.setItem('usuarioLogado', usuarioDigitado);
            window.location.href = 'home.html';
        } else {
            alert('Piloto ou senha incorreta!');
        }
    });
}

// 3. Logica da tela principal e agendamento (home.html)
const cardHome = document.querySelector('.card-home');

if (cardHome) {
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    // Se nao houver piloto salvo na sessao, redireciona para o login
    if (!usuarioLogado) {
        window.location.href = 'index.html';
    } else {
        document.getElementById('mensagemBoasVindas').textContent = 'Bem-vindo, piloto ' + usuarioLogado + '!';
    }

    // Processamento do agendamento com envio para o WhatsApp
    const formAgendamento = document.getElementById('formAgendamento');
    if (formAgendamento) {
        formAgendamento.addEventListener('submit', function(e) {
            e.preventDefault();
            const data = document.getElementById('dataCorrida').value;
            const pista = document.getElementById('pistaCorrida').value;

            document.getElementById('statusAgendamento').textContent = 'Redirecionando para o WhatsApp...';

            const telefone = '5541987663825';
            const textoMensagem = 'Ola! Gostaria de agendar uma corrida no kartodromo.\nPiloto: ' + usuarioLogado + '\nData: ' + data + '\nPista: ' + pista;
            
            const linkWhatsApp = 'https://wa.me/' + telefone + '?text=' + encodeURIComponent(textoMensagem);

            window.open(linkWhatsApp, '_blank');
        });
    }

    // Botao para deslogar
    const btnSair = document.getElementById('btnSair');
    if (btnSair) {
        btnSair.addEventListener('click', function() {
            localStorage.removeItem('usuarioLogado');
            window.location.href = 'index.html';
        });
    }
}