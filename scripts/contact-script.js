
function makeNewFormSubmission() {
    let formNameEntry = document.getElementById("name");
    let formEmailEntry = document.getElementById("email");
    let formMessage = document.querySelector("textarea");

    let submissionObject = {
        "name": formNameEntry.value,
        "email": formEmailEntry.value,
        "message": formMessage.value
    }

    return submissionObject;
}

function getFormHistory() {
    let formHistoryJSON = localStorage.getItem("formSubmissions");
    let formHistoryArray = JSON.parse(formHistoryJSON);

    if (formHistoryArray == null) {
        formHistoryArray = [];
    }

    return formHistoryArray;
}

function saveNewFormSubmission(submissionObject, formHistoryArray) {
    formHistoryArray.unshift(submissionObject);

    let newFormHistoryJSON = JSON.stringify(formHistoryArray);

    localStorage.setItem("formSubmissions", newFormHistoryJSON);
}

let contactForm = document.querySelector("form");

contactForm.addEventListener('submit', () => {

    let newSubmission = makeNewFormSubmission();

    let formHistory = getFormHistory();

    saveNewFormSubmission(newSubmission, formHistory);
});
