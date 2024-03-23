
const FORM_HISTORY_KEY = "formHistory";

const historyContainer = document.querySelector(".history-container");

const formHistoryJSON = localStorage.getItem(FORM_HISTORY_KEY);

if (formHistoryJSON == null) {
    historyContainer.textContent = "No form history found.";
} else {
    historyContainer.textContent = formHistoryJSON;
}
