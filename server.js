let challenges = [];
let currentChallenge = 0; 
let score = 0;

const titleEl = document.getElementById("challenge-title");
const descEl = document.getElementById("challenge-description")
const nextBtn = document.getElementById("next-challenge")
const runBtn = document.getElementById("run-code")
const edition = document.getElementById("run-code") 
const resultEl = document.getElementById("result-message")
const scoreEl = document.getElementById("score")

fetch("challenges.json") 
.then(res => res.json())
.then(date => { 
    challenges = date;
    loadChallenge();
})
.catch(err => { 
    console.error("Falha ao carregar desafios:", err); 
    resultEl.textContent = "Erro ao carregar desafios."
}); 


function loadChallenge() { 
    const c = challenges[currentChallenge]; 
    titleEl.textContent = `Desafio: ${c.title}`; 
    descEl.textContent = c.description; 
    
    edition.value = `function solve(input) {\n return; \n}`;
    resultEl.textContent = "";
}

nextBtn.addEventListener("click", () => { 
    currentChallenge = 
    (currentChallenge + 1) % 
    loadChallenge(); 
});

runBtn.addEventListener("click", () => { 
    const userCode = edition.value;

    try {
        const func = new Function("input", userCode + "\nreturn solve(input);");

        const input = challenges[currentChallenge].input; 
        const expected = challenges[currentChallenge].expected

        const result = func(input); 

        if (JSON.stringify(result) === JSON.stringify(expected)) { 
            result.textContent = "✅ Correto!"

            score += 10; 
            scoreEl.textContent = score; 
             } else { 
                resultEl.textContent = `❌ Errado. Recebido: ${result}, 
                Esperado: ${expected}`
        }
    } catch (err) { 
        resultEl.textContent = "⚠ Erro no codigo" + err.message;
         }
})