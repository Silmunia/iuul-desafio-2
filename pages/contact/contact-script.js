
const FORM_HISTORY_KEY = "formHistory";

function makeNewFormSubmission() {
    let formNameEntry = document.getElementById("name");
    let formEmailEntry = document.getElementById("email");
    let formMessage = document.querySelector("textarea");

    let formEntryDate = getSubmissionDate();

    let submissionObject = {
        "name": formNameEntry.value,
        "email": formEmailEntry.value,
        "message": formMessage.value,
        "date": formEntryDate
    };

    return submissionObject;
}

function getSubmissionDate() {
    const currentDate = new Date();

    const day = currentDate.getDay();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
}

function getFormHistory() {
    let formHistoryJSON = localStorage.getItem(FORM_HISTORY_KEY);
    let formHistoryArray = JSON.parse(formHistoryJSON);

    if (formHistoryArray == null) {
        formHistoryArray = [];
    }

    return formHistoryArray;
}

function saveNewFormSubmission(submissionObject, formHistoryArray) {
    formHistoryArray.unshift(submissionObject);

    let newFormHistoryJSON = JSON.stringify(formHistoryArray);

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

let contactForm = document.querySelector("form");

contactForm.addEventListener('submit', () => {

    let newSubmission = makeNewFormSubmission();

    let formHistory = getFormHistory();

    saveNewFormSubmission(newSubmission, formHistory);
});
