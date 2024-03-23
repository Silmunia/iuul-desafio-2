
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

    localStorage.setItem("previousFormSubmission", JSON.stringify(submissionObject));
});
