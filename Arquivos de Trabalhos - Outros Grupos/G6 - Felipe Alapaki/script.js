const respostasCorretas = {
    q1: "b",
    q2: "c",
    q3: "a",
    q4: "a",
    q5: "b",
    q6: "b",
    q7: "b",
    q8: "c",
    q9: "b",
    q10: "b",
};

const formulario = document.querySelector("#quiz-form");
const feedback = document.querySelector("#feedback");

formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    let acertos = 0;

    Object.entries(respostasCorretas).forEach(([questao, respostaCorreta]) => {
        const respostaSelecionada = formulario.querySelector(
            `input[name="${questao}"]:checked`,
        );

        if (respostaSelecionada && respostaSelecionada.value === respostaCorreta) {
            acertos++;
        }
    });

    feedback.textContent = `Você acertou ${acertos} de 10 questões respondidas. O gabarito é: 1-B, 2-C, 3-A, 4-A, 5-B, 6-B, 7-B, 8-C, 9-B, 10-B.`;
    feedback.hidden = false;
});
