
let contactForm = document.querySelector("form");

contactForm.addEventListener('submit', () => {

    let formNameEntry = document.getElementById("name");
    let formEmailEntry = document.getElementById("email");
    let formMessage = document.querySelector("textarea");

    let submissionObject = {
        "name": formNameEntry.value,
        "email": formEmailEntry.value,
        "message": formMessage.value
    }

    let formHistoryJSON = localStorage.getItem("formSubmissions");
    let formHistoryArray = JSON.parse(formHistoryJSON);

    if (formHistoryArray == null) {
        formHistoryArray = [];
    }

    formHistoryArray.unshift(submissionObject);

    let newFormHistoryJSON = JSON.stringify(formHistoryArray);

    localStorage.setItem("formSubmissions", newFormHistoryJSON);
});
