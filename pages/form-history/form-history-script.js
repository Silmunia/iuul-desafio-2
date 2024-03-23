
const FORM_HISTORY_KEY = "formHistory";

const historyContainer = document.querySelector(".form-history-container");

const formHistoryJSON = localStorage.getItem(FORM_HISTORY_KEY);

if (formHistoryJSON == null) {

    let messageElement = document.createElement("h1");
    messageElement.textContent = "No form history found.";

    historyContainer.appendChild(messageElement);
} else {

    const formHistoryArray = JSON.parse(formHistoryJSON);

    for (let i = formHistoryArray.length - 1; i >= 0; i--) {

        let entryNameElement = document.createElement("h1");
        entryNameElement.textContent = formHistoryArray[i]["name"];

        let entryEmailElement = document.createElement("h2");
        entryEmailElement.textContent = formHistoryArray[i]["email"];

        let entryIdentificationContainer = document.createElement("div");
        entryIdentificationContainer.appendChild(entryNameElement);
        entryIdentificationContainer.appendChild(entryEmailElement);

        let entryMessageElement = document.createElement("p");
        entryMessageElement.textContent = formHistoryArray[i]["message"];

        let formEntryContainer = document.createElement("div");
        formEntryContainer.appendChild(entryIdentificationContainer);
        formEntryContainer.appendChild(entryMessageElement);

        formEntryContainer.classList.add("form-entry");

        historyContainer.appendChild(formEntryContainer);
    }
}
