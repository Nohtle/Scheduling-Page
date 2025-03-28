document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("agendamento-form");
    const telefoneInput = document.getElementById("telefone");

    // Máscara para o campo de telefone
    telefoneInput.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, "");
        
        if (value.length > 0) {
            // Formata conforme regra brasileira
            if (value.length <= 2) {
                value = `(${value}`;
            } else if (value.length <= 6) {
                value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
            } else if (value.length <= 10) {
                value = `(${value.substring(0, 2)}) ${value.substring(2, 6)}-${value.substring(6)}`;
            } else {
                value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
            }
        }
        
        e.target.value = value;
    });

    // Validação da data - não permite datas anteriores ao dia atual
    const dataInput = document.getElementById("data");
    const hoje = new Date();
    const dataMinima = hoje.toISOString().split("T")[0];
    dataInput.setAttribute("min", dataMinima);

    // Exibir feedback de campos enquanto o usuário digita
    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach(input => {
        input.addEventListener("blur", () => {
            if (input.value.trim() === "" && input.hasAttribute("required")) {
                input.classList.add("invalid");
                input.classList.remove("valid");
            } else {
                input.classList.remove("invalid");
                input.classList.add("valid");
            }
        });

        input.addEventListener("input", () => {
            if (input.classList.contains("invalid") && input.value.trim() !== "") {
                input.classList.remove("invalid");
                input.classList.add("valid");
            }
        });
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Validação final do formulário
        let formValido = true;
        inputs.forEach(input => {
            if (input.hasAttribute("required") && input.value.trim() === "") {
                input.classList.add("invalid");
                formValido = false;
            }
        });

        if (!formValido) {
            showNotification("Por favor, preencha todos os campos obrigatórios.", "error");
            return;
        }

        // Captura os dados do formulário
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const telefone = document.getElementById("telefone").value;
        const data = document.getElementById("data").value;
        const hora = document.getElementById("hora").value;
        const servico = document.getElementById("servico").value;
        const observacoes = document.getElementById("observacoes").value;

        // Formatar data para exibição
        const dataFormatada = formatarData(data);
        
        // Aqui você pode enviar os dados para um servidor
        // Por agora, vamos apenas simular o envio

        // Exibe uma mensagem de sucesso
        showNotification("Agendamento realizado com sucesso!", "success");

        // Simula o envio de uma mensagem de confirmação via WhatsApp
        const servicoText = servico ? `Serviço: ${getServicoNome(servico)}` : "";
        const observacoesText = observacoes ? `\nObservações: ${observacoes}` : "";
        
        const mensagem = `Olá ${nome}, seu agendamento foi confirmado!\n\nData: ${dataFormatada}\nHorário: ${hora}\n${servicoText}${observacoesText}\n\nObrigado por agendar conosco!`;
        const whatsappLink = `https://wa.me/?text=${encodeURIComponent(mensagem)}`;

        // Pergunta se o usuário deseja enviar a confirmação via WhatsApp
        setTimeout(() => {
            if (confirm("Deseja receber a confirmação via WhatsApp?")) {
                window.open(whatsappLink, "_blank");
            }
            
            // Limpa o formulário após o envio
            form.reset();
            inputs.forEach(input => {
                input.classList.remove("valid");
            });
            
            // Redireciona ou faz alguma outra ação após o envio bem-sucedido
            // window.location.href = "confirmacao.html";
        }, 1000);
    });

    // Função para formatar a data
    function formatarData(dataString) {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    // Função para obter o nome do serviço pelo valor
    function getServicoNome(valor) {
        const servicos = {
            'consulta': 'Consulta',
            'avaliacao': 'Avaliação',
            'revisao': 'Revisão'
        };
        return servicos[valor] || valor;
    }

    // Função para mostrar notificações
    function showNotification(message, type) {
        // Verifica se já existe uma notificação e remove
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Cria o elemento de notificação
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        // Adiciona ao corpo do documento
        document.body.appendChild(notification);

        // Anima a entrada da notificação
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Remove após alguns segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
});