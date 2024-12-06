import React, { useState, useEffect } from 'react';
import './Forms.css'; 

const Forms = () => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    const [shuffledAlphabet, setShuffledAlphabet] = useState([]);
    const [currentNameIndex, setCurrentNameIndex] = useState(0);
    const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
    const [currentName, setCurrentName] = useState("");
    const [currentEmail, setCurrentEmail] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");
    const [pets, setPets] = useState("");
    const [zodiacSign, setZodiacSign] = useState("");
    const [ancestry, setAncestry] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState("-");
    const [attemptCount, setAttemptCount] = useState(0);

    useEffect(() => {
        setShuffledAlphabet(shuffleArray(alphabet));
    }, []);

    const shuffleArray = (array) => {
        let shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    const updateNameLetter = () => {
        return shuffledAlphabet[currentNameIndex];
    };

    const updateEmailLetter = () => {
        return shuffledAlphabet[currentEmailIndex];
    };

    const nextNameLetter = () => {
        setCurrentNameIndex((currentNameIndex + 1) % shuffledAlphabet.length);
    };

    const previousNameLetter = () => {
        setCurrentNameIndex((currentNameIndex - 1 + shuffledAlphabet.length) % shuffledAlphabet.length);
    };

    const nextEmailLetter = () => {
        setCurrentEmailIndex((currentEmailIndex + 1) % shuffledAlphabet.length);
    };

    const previousEmailLetter = () => {
        setCurrentEmailIndex((currentEmailIndex - 1 + shuffledAlphabet.length) % shuffledAlphabet.length);
    };

    const addNameLetter = () => {
        setCurrentName(currentName + shuffledAlphabet[currentNameIndex]);
    };

    const addEmailLetter = () => {
        setCurrentEmail(currentEmail + shuffledAlphabet[currentEmailIndex]);
    };

    const addSpace = () => {
        setCurrentName(currentName + " ");
    };

    const addEmailSymbol = (symbol) => {
        setCurrentEmail(currentEmail + symbol);
    };

    const clearName = () => {
        setCurrentName("");
    };

    const clearEmail = () => {
        setCurrentEmail("");
    };

    const clearAll = () => {
        setCurrentName("");
        setCurrentEmail("");
        setMaritalStatus("");
        setPets("");
        setZodiacSign("");
        setAncestry("");
        setBirthDate("");
        setGender("-");
        document.getElementById("sexe").value = "-";
        document.getElementById("age-box").textContent = "Cliquez ici";
    };

    const randomAge = () => {
        const minAge = 10;
        const maxAge = 150;
        const randomAge = Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;
        document.getElementById("age-box").textContent = `${randomAge} ans`;
    };

    const openModal = () => {
        document.getElementById("myModal").style.display = "block";
    };

    const closeModal = () => {
        document.getElementById("myModal").style.display = "none";
    };

    const handleDateChange = (event) => {
        const selectedDate = new Date(event.target.value);
        selectedDate.setDate(selectedDate.getDate() - 1);
        setBirthDate(selectedDate.toISOString().split('T')[0]);
    };

    const attemptSubmit = () => {
        if (!currentName || !currentEmail || !maritalStatus || !pets || !zodiacSign || !ancestry) {
            alert("Il y a une erreur dans le formulaire.");
            return;
        }
    
        setAttemptCount(attemptCount + 1);
    
        if (attemptCount < 3) {
            moveSubmitButton();
        } else {
            alert("Formulaire envoyé!");
            // Redirecionar para a página HTML desejada
            window.location.replace("/game_page.html");
        }
    };

    const moveSubmitButton = () => {
        const submitButton = document.getElementById("submit-btn");
        const maxX = window.innerWidth - submitButton.offsetWidth;
        const maxY = window.innerHeight - submitButton.offsetHeight;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        submitButton.style.position = "absolute";
        submitButton.style.left = `${randomX}px`;
        submitButton.style.top = `${randomY}px`;
    };

    const [phoneValue, setPhoneValue] = useState(55555555555);
    const [angle, setAngle] = useState(0);
    const [speed, setSpeed] = useState(0);
    const friction = 0.99;

    const PhoneNumberToDisplay = (value) => {
        const display = `(${value.toString().substr(0, 2)}) ${value.toString().substr(2, 3)}-${value.toString().substr(5, 3)}-${value.toString().substr(8, 3)}`;
        return display;
    };

    const updatePhone = () => {
        setSpeed(speed + Math.sin(angle * Math.PI / 180) * 1000);
        setSpeed(speed * friction);
        setPhoneValue(phoneValue + Math.round(speed * 100000));

        if (phoneValue > 99999999999) {
            setPhoneValue(99999999999);
            setSpeed(speed * -1);
        } else if (phoneValue < 10000000000) {
            setPhoneValue(10000000000);
            setSpeed(speed * -1);
        }
    };

    useEffect(() => {
        const interval = setInterval(updatePhone, 10);
        return () => clearInterval(interval);
    });

    return (
        <div className="form-container">
            <h2 style={{ color: 'red', fontSize: '40px', textAlign: 'center' }}>Comment ne pas faire un formulaire</h2>

            <div className="button-section">
                <button 
                    type="button" 
                    className="submit-btn" 
                    id="submit-btn" 
                    onClick={attemptSubmit}
                    style={{ fontSize: '30px', padding: '20px', backgroundColor: 'yellow', color: 'black' }}
                >
                    Envoyer
                </button>
                <button 
                    type="button" 
                    className="clear-all-btn" 
                    onClick={clearAll}
                    style={{ fontSize: '30px', padding: '20px', backgroundColor: 'green', color: 'white' }}
                >
                    Effacer Tout
                </button>
            </div>

            <div className="age-section">
                <label style={{ fontSize: '24px', color: 'blue' }}>Âge généré:</label>
                <div id="age-box" className="age-box" style={{ backgroundColor: 'pink', fontSize: '24px' }}>Cliquez ici</div>
                <button type="button" className="age-button" onClick={randomAge} style={{ fontSize: '24px', padding: '20px', backgroundColor: 'orange', color: 'black' }}>Générer un âge mystérieux</button>
            </div>

            <div className="gender-section">
                <label htmlFor="sexe" style={{ fontSize: '24px', color: 'blue' }}>Sexe:</label>
                <select id="sexe" name="sexe" value={gender} onChange={(e) => setGender(e.target.value)} style={{ fontSize: '24px', padding: '20px', backgroundColor: 'lightblue', color: 'black' }}>
                    <option value="-">-</option>
                    <option value="masculin">Masculin</option>
                    <option value="féminin">Féminin</option>
                    <option value="autre">Autre</option>
                    <option value="preference-decliner">Préférer ne pas dire</option>
                </select>
            </div>

            <div className="name-section">
                <label style={{ fontSize: '24px', color: 'blue' }}>Nom:</label>
                <div className="letter-selector">
                    <button onClick={previousNameLetter} style={{ fontSize: '24px', padding: '20px', backgroundColor: 'purple', color: 'white' }}>←</button>
                    <div id="letter" className="letter-box" style={{ backgroundColor: 'yellow', fontSize: '24px' }}>{updateNameLetter()}</div>
                    <button onClick={nextNameLetter} style={{ fontSize: '24px', padding: '20px', backgroundColor: 'purple', color: 'white' }}>→</button>
                    <button onClick={addNameLetter} style={{ fontSize: '24px', padding: '20px', backgroundColor: 'purple', color: 'white' }}>Ajouter</button>
                    <button onClick={addSpace} style={{ fontSize: '24px', padding: '20px', backgroundColor: 'purple', color: 'white' }}>Espace</button>
                </div>
                <div className="name-preview" style={{ fontSize: '24px', color: 'blue' }}>
                    Nom actuel: <span id="name-preview">{currentName || "_"}</span>
                </div>
                <button onClick={clearName} className="clear-btn" style={{ fontSize: '24px', padding: '20px', backgroundColor: 'green', color: 'white' }}>Effacer</button>
            </div>

            <div className="email-section">
                <label style={{ fontSize: '24px', color: 'blue' }}>Email:</label>
                <div className="letter-selector">
                    <button onClick={previousEmailLetter} style={{ fontSize: '24px', padding: '20px', backgroundColor: 'purple', color: 'white' }}>←</button>
                    <div id="email-letter" className="letter-box" style={{ backgroundColor: 'yellow', fontSize: '24px' }}>{updateEmailLetter()}</div>
                    <button onClick={nextEmailLetter} style={{ fontSize: '24px', padding: '20px', backgroundColor: 'purple', color: 'white' }}>→</button>
                    <button onClick={addEmailLetter} style={{ fontSize: '24px', padding: '20px', backgroundColor: 'purple', color: 'white' }}>Ajouter</button>
                    <button onClick={() => addEmailSymbol('@')} style={{ fontSize: '24px', padding: '20px', backgroundColor: 'purple', color: 'white' }}>@</button>
                    <button onClick={() => addEmailSymbol('.')} style={{ fontSize: '24px', padding: '20px', backgroundColor: 'purple', color: 'white' }}>.</button>
                </div>
                <div className="email-preview" style={{ fontSize: '24px', color: 'blue' }}>
                    Email actuel: <span id="email-preview">{currentEmail || "_"}</span>
                </div>
                <button onClick={clearEmail} className="clear-btn" style={{ fontSize: '24px', padding: '20px', backgroundColor: 'green', color: 'white' }}>Effacer</button>
            </div>

            <div className="phone-section">
                <label style={{ fontSize: '24px', color: 'blue' }}>Numéro de téléphone:</label>
                <div>Phone: <span id="phoneDisplay">{PhoneNumberToDisplay(phoneValue)}</span></div>
                <input id="slider" type="range" min="10000000000" max="99999999999" value={phoneValue} onChange={(e) => setPhoneValue(Number(e.target.value))} style={{ transition: 'width 0.5s ease-in-out', width: '197px' }} />
                <div>
                    <input id="advancedMode" type="checkbox" />
                    <label htmlFor="advancedMode">Advanced Mode</label>
                    <input id="angleSlider" type="range" min="-10" max="10" step="0.02" value={angle} onChange={(e) => setAngle(Number(e.target.value))} style={{ display: 'none' }} />
                </div>
            </div>

            <div className="marital-status-section">
                <label style={{ fontSize: '24px', color: 'blue' }}>État Civil<span className="required">*</span>:</label>
                <select value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)} required style={{ fontSize: '24px', padding: '20px', backgroundColor: 'lightblue', color: 'black' }}>
                    <option value="">Sélectionnez</option>
                    <option value="célibataire">Célibataire</option>
                    <option value="marié">Marié</option>
                    <option value="divorcé">Divorcé</option>
                    <option value="veuf">Veuf</option>
                </select>
            </div>

            <div className="pets-section">
                <label style={{ fontSize: '24px', color: 'blue' }}>Combien de bouteilles PET avez-vous recyclées cette année<span className="required">*</span>:</label>
                <input type="number" value={pets} onChange={(e) => setPets(e.target.value)} required style={{ fontSize: '24px', padding: '20px', backgroundColor: 'lightblue', color: 'black' }} />
            </div>

            <div className="zodiac-sign-section">
                <label style={{ fontSize: '24px', color: 'blue' }}>Quel est votre signe du zodiaque<span className="required">*</span>:</label>
                <select value={zodiacSign} onChange={(e) => setZodiacSign(e.target.value)} required style={{ fontSize: '24px', padding: '20px', backgroundColor: 'lightblue', color: 'black' }}>
                    <option value="">Sélectionnez</option>
                    <option value="aries">Bélier</option>
                    <option value="taureau">Taureau</option>
                    <option value="gemeaux">Gémeaux</option>
                    <option value="cancer">Cancer</option>
                    <option value="lion">Lion</option>
                    <option value="vierge">Vierge</option>
                    <option value="balance">Balance</option>
                    <option value="scorpion">Scorpion</option>
                    <option value="sagittaire">Sagittaire</option>
                    <option value="capricorne">Capricorne</option>
                    <option value="verseau">Verseau</option>
                    <option value="poissons">Poissons</option>
                </select>
            </div>

            <div className="ancestry-section">
                <label style={{ fontSize: '24px', color: 'blue' }}>Ascendance<span className="required">*</span>:</label>
                <input type="text" value={ancestry} onChange={(e) => setAncestry(e.target.value)} required style={{ fontSize: '24px', padding: '20px', backgroundColor: 'lightblue', color: 'black' }} />
            </div>

            <div className="birthdate-section">
                <label style={{ fontSize: '24px', color: 'blue' }}>Date de Naissance:</label>
                <input type="date" value={birthDate} onChange={handleDateChange} style={{ fontSize: '24px', padding: '20px', backgroundColor: 'lightblue', color: 'black' }} />
            </div>

            <img 
                src="https://example.com/turtle-image.png" 
                alt="Tartaruga" 
                className="turtle-img" 
                onClick={openModal}
                style={{ maxWidth: '100px', margin: '20px auto', display: 'block' }}
            />

            <div id="myModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeModal} style={{ fontSize: '36px', color: 'red' }}>×</span>
                    <h3 style={{ color: 'red', fontSize: '30px' }}>Qui est cette créature?</h3>
                    <p style={{ color: 'blue', fontSize: '24px' }}>Les informations sont secrètes. Appuyez sur "OK" pour découvrir quelque chose.</p>
                </div>
            </div>
        </div>
    );
};

export default Forms;