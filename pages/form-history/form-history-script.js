
const FORM_HISTORY_KEY = "formHistory";

const historyContainer = document.querySelector(".form-history-container");

const formHistoryJSON = localStorage.getItem(FORM_HISTORY_KEY);

if (formHistoryJSON == null) {

    const messageElement = document.createElement("h1");
    messageElement.textContent = "No form history found.";

    historyContainer.appendChild(messageElement);
} else {

    const formHistoryArray = JSON.parse(formHistoryJSON);

    for (let i = formHistoryArray.length - 1; i >= 0; i--) {

        const entryNameElement = document.createElement("h1");
        entryNameElement.textContent = formHistoryArray[i]["name"];

        const entryEmailElement = document.createElement("h2");
        entryEmailElement.textContent = formHistoryArray[i]["email"];

        const entryDateElement = document.createElement("h3");
        entryDateElement.textContent = makeDateString(formHistoryArray[i]["date"]);

        const entryIdentificationContainer = document.createElement("div");
        entryIdentificationContainer.appendChild(entryNameElement);
        entryIdentificationContainer.appendChild(entryEmailElement);
        entryIdentificationContainer.appendChild(entryDateElement);

        const entryMessageElement = document.createElement("p");
        entryMessageElement.textContent = formHistoryArray[i]["message"];

        const formEntryContainer = document.createElement("div");
        formEntryContainer.appendChild(entryIdentificationContainer);
        formEntryContainer.appendChild(entryMessageElement);

        formEntryContainer.classList.add("form-entry");

        historyContainer.appendChild(formEntryContainer);
    }
}

function makeDateString(entryEpochString) {
    const entryDate = new Date(entryEpochString);

    const day = entryDate.getUTCDate();
    const month = getMonthNameFromDate(entryDate);
    const year = entryDate.getUTCFullYear();

    const hours = entryDate.getUTCHours();
    const minutes = entryDate.getUTCMinutes();
    const seconds = entryDate.getUTCSeconds();

    return `${day} de ${month} de ${year}, ${hours}:${minutes}:${seconds} UTC`
}

function getMonthNameFromDate(inputDate) {
    const monthName = inputDate.toLocaleString('pt', { month: 'long'});

    const monthFirstLetter = monthName.charAt(0).toUpperCase();

    const monthCapitalized = monthFirstLetter + monthName.slice(1);

    return monthCapitalized;
}