const flags = {
    cracking1:"flag{rot13_facile}",
    cracking2:"flag{cyber}",

    inforensique1:"flag{Easy_cheesy}",

    web1:"flag{CTFWEB}",
    web2: "flag{W3bInv3st!gat0r}",
    web3: "flag{illusion_regarde_pas_ce_que_tu_vois}",
    web4: "flag{ADMIN_ACCESS_GRANTED}",
    
    stegano1: "flag{presquecaché}",
    textures: "flag{stegapause}",
    
    snakes: "crypto{z3n_0f_pyth0n}",
    ascii: "crypto{ASCII_pr1nt4bl3}",
    hex: "crypto{You_will_be_working_with_hex_strings_a_lot}",
    base64: "crypto{Base+64+Encoding+is+Web+Safe}",
    xor: "crypto{LYCEE}",
    };

function checkFlag(challenge) {
    const input = document.getElementById("flag-" + challenge);
    const result = document.getElementById("result-" + challenge);

    if (!input || !result) {
        console.error("ID introuvable pour :", challenge);
        return;
    }

    if (input.value.trim() === flags[challenge]) {
        result.textContent = "✅ Flag correct !";
        result.style.color = "lime";
    } else {
        result.textContent = "❌ Mauvais flag";
        result.style.color = "red";
    }
}