const flags = {
    cracking1:"5bad3b6ef80fb6de4defcfb2f01dcf9ccf5260f55ae20e65240834c36af14228",
    cracking2:"036aadbb1a21a23a058aa6103537e3f94f0952c12ac75b0b706bfa8057d27500",

    inforensique:"987c5992f5179872c0cba714e28c27c209cd116cf99f74b0666dcf48e77868a8",

    web1: "8d1131b1ab675d1cd54fed668c517d5b7147473511d6822010744e82c1eccbdf",
    web2: "3f9807a61c3dbbc6e835125af3ae3e034e34eed9d4d249ef7e665dd159199f5f",
    web3: "02d97da998a7f83432428f39ecc838d5f119b27763e7ad7b2db025da9783da47",
    web4: "2f00a2dfe3562426624a2e0f621241542920aadabfc273687b2b64cb7d6dfe37",
    web5: "d3a96ff474082295e583ee6748c4e07847296b65a7785b86977182860c7ef263",
    web6: "d50ad0b00694b27967436f2b8347827d23e25b52605c4b3199463fe25685d909",
    
    stegano1: "65386109f33264d8a835e2daa4fefec25e77e574fb9dbe458a8ef5c04a79f0e0",
    textures: "b6f2937c830aecade95e0a8b809a90069776ea606aee7bb90c20cf2ba7aaba1d",
    
    snakes: "2561069fbb24d74f4de592013f30f625264e9369b96fbbdaa6f12c8323defc16",
    ascii: "44dccb08a8f05215d75ac3ca4f92dcb9efca2dfee7d512afc5da26ca5e42a631",
    hex: "74f4188b4ad9c006ddc5217c1275f683b46b91eb5e1d7f3239a6e6b34ed811d4",
    base64: "c660db6437b908a02eb2be9d5e682b86f098793267acf92b8ce47d33ec1c01b2",
    xor: "f5bce09c5b829ed01aca18ed043a90a610e43182e1767702948d69613a4b721c",
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




