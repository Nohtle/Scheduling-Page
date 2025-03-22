document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("agendamento-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Captura os dados do formulário
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const telefone = document.getElementById("telefone").value;
        const data = document.getElementById("data").value;
        const hora = document.getElementById("hora").value;

        // Simula o envio de uma mensagem de confirmação via WhatsApp
        const mensagem = `Olá ${nome}, seu agendamento foi confirmado para o dia ${data} às ${hora}.`;
        const whatsappLink = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;

        // Exibe uma mensagem de confirmação e redireciona para o WhatsApp
        if (confirm("Deseja enviar a confirmação via WhatsApp?")) {
            window.open(whatsappLink, "_blank");
        } else {
            alert("Agendamento confirmado! Você receberá um e-mail em breve.");
        }

        // Limpa o formulário após o envio
        form.reset();
    });
});