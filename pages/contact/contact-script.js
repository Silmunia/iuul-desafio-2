
const FORM_HISTORY_KEY = "formHistory";

function makeNewFormSubmission() {
    const formNameEntry = document.getElementById("name");
    const formEmailEntry = document.getElementById("email");
    const formMessage = document.querySelector("textarea");

    const formEntryDate = new Date();

    const submissionObject = {
        "name": formNameEntry.value,
        "email": formEmailEntry.value,
        "message": formMessage.value,
        "date": formEntryDate
    };

    return submissionObject;
}

function getFormHistory() {
    const formHistoryJSON = localStorage.getItem(FORM_HISTORY_KEY);
    let formHistoryArray = JSON.parse(formHistoryJSON);

    if (formHistoryArray == null) {
        formHistoryArray = [];
    }

    return formHistoryArray;
}

function saveNewFormSubmission(submissionObject, formHistoryArray) {
    formHistoryArray.unshift(submissionObject);

    const newFormHistoryJSON = JSON.stringify(formHistoryArray);

    localStorage.setItem(FORM_HISTORY_KEY, newFormHistoryJSON);
}

function deleteFormHistory(event) {
    event.preventDefault();

    const userChoice = confirm("Deseja apagar o histórico de mensagens do formulário? Esta operação é irreversível.");

    if (userChoice) {
        localStorage.removeItem(FORM_HISTORY_KEY);
        alert("O histórico de mensagens do formulário foi apagado.");
    }
}

const contactForm = document.querySelector("form");

contactForm.addEventListener('submit', () => {

    const newSubmission = makeNewFormSubmission();

    const formHistory = getFormHistory();

    saveNewFormSubmission(newSubmission, formHistory);
});
