const flags = {
    cracking1:"379f53e6f9166f07f6c31eba96e542475a1c220f1883c5fe85035546059e0e4b",
    cracking2:"225ac2651621a61361c479363102ce3ad4608354415a99911364a5f4503f2735",

    inforensique:"d075573a90333d47f0e95d5763f35efce7eff0868a25c34f19894ac352ad5815",

    web1:"34a3b7230c31a78c00b8253a6524021d7af8f967a5f60037a3a0e7b8502c5a08",
    web2: "28a864756857f8642a878be4245c604f86f87452d49c63c7b394d0751e6d4255",
    web3: "55c70f0559f33c3066127883584c688849f2b8a36c6a629636d7675f92273d2a",
    web4: "7b2e31562a03333e6918a58a74136f62083b7cf95098c47481754fe3d1a58a7f",
wweb5: "1817482273f5e55fe45c4e0b0452f1b7e05a109b55225330f1ae62234c038258",
    
    stegano1: "e70697711dedba935e4b25cf82b79878ce6d6911c471a251092891d4a9918b95",
    textures: "2966395340a631627993e3d149c718f4019053805373a69777174b1257406387",
    
    snakes: "d9d924294a625a25121b64e56b4f705596e385209c256f66d48281ed8e016149",
    ascii: "0636275c92c85b1fc945c7867571d34e1a2f47c3e317c2a2fe5a4439c4a7541f",
    hex: "b65c5364a51e54a55874283c5d6487e45133379532863955214050212f455331",
    base64: "b93c4b0714b79b69b61517406259e51b6679b369324628d09f4296b014234739",
    xor: "cc4a19269551c6c9a930129283f585d11e58284693b0638060a5e842416ec1a5",
};

// Get Firebase Auth and Firestore functions from the global scope
/*
const { auth } = window.firebaseAuth; // Assuming auth is globally available
const { markChallengeAsCompleted, updateChallengeUI } = window.ctfFirebaseFunctions; // Functions from firebase-auth.js
*/

function checkFlag(challenge) {
    const input = document.getElementById("flag-" + challenge);
    const result = document.getElementById("result-" + challenge);

    if (!input || !result) {
        console.error("ID introuvable pour :", challenge);
        return;
    }

    const hashed_input = CryptoJS.SHA256(input.value.trim()).toString();

    if (hashed_input === flags[challenge]) {
        result.textContent = "✅ Flag correct !";
        result.style.color = "lime";
        
        // Mark challenge as completed in Firestore if user is logged in

/*        if (auth.currentUser) {

            await markChallengeAsCompleted(auth.currentUser.uid, challenge);

            // Update UI for this specific challenge immediately

            updateChallengeUI([challenge]);

        }*/
        
    } else {
        result.textContent = "❌ Mauvais flag";
        result.style.color = "red";
    }

}




