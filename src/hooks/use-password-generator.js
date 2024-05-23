import {useState, useEffect} from 'react';

const usePasswordGenerator = ()=>{
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [previousPasswords, setPreviousPasswords] = useState([]);

    useEffect(() => {
        const storedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];
        setPreviousPasswords(storedPasswords.slice(0, 5));
      }, []);

    const generatePassword = (checkboxData, length)=>{
        let charset = "", 
        generatedPassword = "",
        mandatoryCharacters = "";

        const selectedOption = checkboxData.filter((checkbox)=>checkbox.state);

        if (selectedOption.length === 0) {
            setErrorMessage("Select atleast one option");
            setPassword("");
            return;
        }

        selectedOption.forEach((option)=>{
            switch (option.title) {
                case "Include Uppercase Letters":
                    charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    mandatoryCharacters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(Math.floor(Math.random() * 26));
                    break;

                case "Include Lowercase Letters":
                    charset += "abcdefghijklmnopqrstuvwxyz";
                    mandatoryCharacters += "abcdefghijklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * 26));
                    break;

                case "Include Numbers":
                    charset += "0123456789";
                    mandatoryCharacters += "0123456789".charAt(Math.floor(Math.random() * 10));
                    break;

                case "Include Symbols":
                    charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
                    mandatoryCharacters += "!@#$%^&*()_+~`|}{[]:;?><,./-=".charAt(Math.floor(Math.random() * 32));
                    break;
            
                default:
                    break;
            }
        });

        for (let index = 0; index < length - mandatoryCharacters.length; index++) {
            const randomIndex = Math.floor(Math.random()*charset.length);
            generatedPassword += charset[randomIndex];
        }

        generatedPassword += mandatoryCharacters;
        generatedPassword = generatedPassword.split('').sort(() => Math.random() - 0.5).join('');

        setPassword(generatedPassword);
        setErrorMessage("");

        const allPreviousPasswords = JSON.parse(localStorage.getItem('passwords')) || [];
        const newPreviousPasswords = [generatedPassword, ...allPreviousPasswords];
        localStorage.setItem('passwords', JSON.stringify(newPreviousPasswords));
        setPreviousPasswords(newPreviousPasswords.slice(0, 5));
    };

    return {password, errorMessage, generatePassword, previousPasswords}
}

export default usePasswordGenerator;