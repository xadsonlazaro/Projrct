
let challenges = []; 
let currentChallenge = 0;
let score = 0; 

const title = document.getElementById("challenge-title"); 
const descEl = document.getElementById("challenge-description")
const nexBtn = document.getElementById("next-challenge") 
const edition = document.getElementById("run-code")
const resulEl = document.getElementById("result-message")
const scoreEl = document.getElementById("score")


fetch("challenges.json")
.then(res => res.json())
.then(data => { 
    challenges = data;
    loadChallenge(); 
}); 

function loadChallenge () { 
    const c = challenges[currentChallenge]; 
    titleEl.textContent = `Desafios: ${c.title}`;
    descEl.textContent = c.description; 
    edition.value = `function solve(input) {\n return \n}`;
    resulEl.textContent = "";
}

nexBtn.addEventListener("click", () => { 
    currentChallenge =  
    (currentChallenge + 1) % 
    challenges.length;
    loadChallenge();
}); 

runBtn.addEventListener("click", () => { 
    const userCode = editor.value;
    try { 
        const func = new 
        Function("input", userCode + `\nreturn solve(input);`);
        const input = challenges[currentChallenge].input; 
        const expected = challenges[currentChallenge].expected; 

        const result = func(input); 

        if (JSON.stringify(result) === JSON.stringify(expected)) { 
            resulEl.textContent = " ✔ Correto!"; 
            score += 10; 
            scoreEl.textContent = score;
             } else { 
                resulEl.textContent = ` Errado. Resultado: ${resulEl}, Esperado: ${expected}`;
        }
         } catch (err) { 
            resulEl.textContent = "  Erro no seu codigo" + err.message;
         }
});

















/*
 <input placeholder="Email" type="email" required >
                <img width="20" height="20"  src="https://img.icons8.com/ios/50/user--v1.png" alt="user--v1"/> 
                


                  <input placeholder="Senha" type="password" required> 
                <img width="20" height="20" src="https://img.icons8.com/windows/32/lock-2--v1.png" alt="lock-2--v1">
                <a href="#"> 
                */  

