
const FORM_HISTORY_KEY = "formHistory";

class EntryContainerFactory {
    #historyArray;

    constructor(historyArray) {
        this.#historyArray = historyArray;
    }

    #getMonthNameFromDate(inputDate) {
        const monthName = inputDate.toLocaleString('pt', { month: 'long'});
    
        const monthFirstLetter = monthName.charAt(0).toUpperCase();
    
        const monthCapitalized = monthFirstLetter + monthName.slice(1);
    
        return monthCapitalized;
    }

    #makeDateString(entryEpochString) {
        const entryDate = new Date(entryEpochString);
    
        const day = entryDate.getUTCDate();
        const month = this.#getMonthNameFromDate(entryDate);
        const year = entryDate.getUTCFullYear();
    
        const hours = entryDate.getUTCHours();
        const minutes = entryDate.getUTCMinutes();
        const seconds = entryDate.getUTCSeconds();
    
        return `${day} de ${month} de ${year}, ${hours}:${minutes}:${seconds} UTC`
    }

    #makeEntryIdentificationElement(entryIndex) {
        const entryNameElement = document.createElement("h1");
        entryNameElement.textContent = this.#historyArray[entryIndex]["name"];

        const entryEmailElement = document.createElement("h2");
        entryEmailElement.textContent = this.#historyArray[entryIndex]["email"];

        const entryIdentificationContainer = document.createElement("div");
        entryIdentificationContainer.appendChild(entryNameElement);
        entryIdentificationContainer.appendChild(entryEmailElement);

        return entryIdentificationContainer;
    }

    #makeEntryHeaderElement(entryIndex) {
        const entryIdentificationContainer = this.#makeEntryIdentificationElement(entryIndex)

        const entryDateElement = document.createElement("h3");
        entryDateElement.textContent = this.#makeDateString(this.#historyArray[entryIndex]["date"]);

        const entryHeaderContainer = document.createElement("div");
        entryHeaderContainer.appendChild(entryIdentificationContainer);
        entryHeaderContainer.appendChild(entryDateElement);

        return entryHeaderContainer;
    }

    #makeEntryDeletionElement(entryIndex) {
        const formDeletionIcon = document.createElement("img");
        formDeletionIcon.src = "../../icons/Trash-Icon.svg";

        const formEntryDeletionTrigger = document.createElement("a");
        formEntryDeletionTrigger.appendChild(formDeletionIcon);

        formEntryDeletionTrigger.href = "";
        formEntryDeletionTrigger.classList.add("entry-delete-trigger");

        formEntryDeletionTrigger.addEventListener('click', (event) => {
            const userChoice = confirm("Deseja apagar esta mensagem do formulário? Esta operação é irreversível.");

            if (userChoice) {
                const newFormHistoryArray = this.#historyArray.toSpliced(entryIndex, 1);

                const newFormHistoryJSON = JSON.stringify(newFormHistoryArray);

                localStorage.setItem(FORM_HISTORY_KEY, newFormHistoryJSON);

                location.reload();
            } else {
                event.preventDefault();
            }
        });

        return formEntryDeletionTrigger;
    }

    makeElement(entryIndex) {
        
        const entryHeaderContainer = this.#makeEntryHeaderElement(entryIndex);

        const entryMessageElement = document.createElement("p");
        entryMessageElement.textContent = this.#historyArray[entryIndex]["message"];

        const formEntryDeletionTrigger = this.#makeEntryDeletionElement(entryIndex);

        const formEntryContainer = document.createElement("div");
        formEntryContainer.appendChild(entryHeaderContainer);
        formEntryContainer.appendChild(entryMessageElement);
        formEntryContainer.appendChild(formEntryDeletionTrigger);

        formEntryContainer.classList.add("form-entry");

        return formEntryContainer;
    }
}

function prepareFormHistory() {
    const historyContainer = document.querySelector(".form-history-container");

    const formHistoryJSON = localStorage.getItem(FORM_HISTORY_KEY);

    if (formHistoryJSON == null || formHistoryJSON == "[]") {

        const messageElement = document.createElement("h1");
        messageElement.textContent = "No form history found.";

        historyContainer.appendChild(messageElement);
    } else {

        const formHistoryArray = JSON.parse(formHistoryJSON);
        const containerFactory = new EntryContainerFactory(formHistoryArray);

        for (let i = 0; i < formHistoryArray.length; i++) {

            const entryContainerElement = containerFactory.makeElement(i);

            historyContainer.appendChild(entryContainerElement);
        }
    }
}

prepareFormHistory();
