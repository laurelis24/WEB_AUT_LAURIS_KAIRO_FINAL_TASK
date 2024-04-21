import { BasePage } from "./BasePage";
import { getDayTitle, getMonthIdx } from "../help_function/date";

export class AutomationPracticeFormPage extends BasePage {
    static get url() {
        return "/automation-practice-form";
    }

    static get firstNameInputField() {
        return cy.get("input#firstName");
    }
    static get lastNameInputField() {
        return cy.get("input#lastName");
    }
    static get emailInputField() {
        return cy.get("input#userEmail");
    }

    static genderInputField(gender) {
        let val = gender === "Other" ? 3 : gender === "Female" ? 2 : 1;
        return cy.get(`label[for="gender-radio-${val}"]`);
    }

    static get mobileInputField() {
        return cy.get("input#userNumber");
    }

    static get dateOfBirthInputField() {
        return cy.get("input#dateOfBirthInput");
    }

    static get monthSelectField() {
        return cy.get("select.react-datepicker__month-select");
    }

    static get yearSelectField() {
        return cy.get("select.react-datepicker__year-select");
    }

    static daySelectField(year, day, month) {
        let mIdx = getMonthIdx(month);
        const mValue = mIdx <= 9 ? "0" + (mIdx + 1) : mIdx + 1;
        const endStr = day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th";
        const date = new Date(`${year}/${mValue}/${day}`);
        return cy
            .get(`div[aria-label="month  ${year}-${mValue}"]`)
            .get(`div[aria-label="Choose ${getDayTitle(date.getDay())}, ${month} ${day}${endStr}, ${year}"]`);
    }

    static get subjectsInputField() {
        return cy.get("input#subjectsInput");
    }

    static get subjectAutoCompleteField() {
        return cy.get("div.subjects-auto-complete__menu");
    }

    static hobbyInputField(hobby) {
        let val = hobby === "Sports" ? 1 : hobby === "Reading" ? 2 : 3;
        return cy.get(`label[for="hobbies-checkbox-${val}"]`);
    }

    static get uploadFileInput() {
        return cy.get("input#uploadPicture");
    }

    static get currentAddressInputField() {
        return cy.get("textarea#currentAddress");
    }

    static get stateField() {
        return cy.get(`div#state`);
    }
    static selectStateOption(option) {
        const states = { NCR: 0, "Uttar Pradesh": 1, Haryana: 2, Rajasthan: 3 };
        return cy.get(`#react-select-3-option-${states[option]}`);
    }

    static get cityField() {
        return cy.get(`div#city`);
    }

    static selectCityOption(option) {
        const states = { Delhi: 0, Gurgaon: 1, Noida: 2 };
        return cy.get(`#react-select-4-option-${states[option]}`);
    }

    static get submitButton() {
        return cy.get("button#submit");
    }

    static get submitConfirmTitle() {
        return cy.get("#example-modal-sizes-title-lg");
    }

    static get validationTable() {
        return cy.get("div.table-responsive").get("table").get("tbody");
    }
}
