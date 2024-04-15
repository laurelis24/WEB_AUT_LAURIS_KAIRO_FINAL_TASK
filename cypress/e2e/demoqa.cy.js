import { AutomationPracticeFormPage } from "../pageObjects/AutomationPracticeFormPage";

describe("Cypress testing Final Task", () => {
    context("Input all the necessary information and validate", () => {
        beforeEach(() => {
            AutomationPracticeFormPage.visit();
        });

        it.only("Input and validate information", () => {
            const person = {
                firstName: "Lauris",
                lastName: "Kairo",
                email: "s23kairlaur@gmail.com",
                gender: "Male",
                mobile: 2713381451,
                subject: "Economics",
                hobbies: "Music",
                picture: "image.jpg",
                dateOfBirth: { year: 1930, month: "February", mIdx: 1, day: 28 },
                currentAddress: "Cypress street 123",
                state: "NCR",
                city: "Delhi",
            };
            // Input all the information
            AutomationPracticeFormPage.firstNameInputField.type(person.firstName);
            AutomationPracticeFormPage.lastNameInputField.type(person.lastName);
            AutomationPracticeFormPage.emailInputField.type(person.email);
            AutomationPracticeFormPage.genderInputField(person.gender).click();
            AutomationPracticeFormPage.mobileInputField.type(person.mobile);
            AutomationPracticeFormPage.dateOfBirthInputField.click();
            AutomationPracticeFormPage.yearSelectField.select(person.dateOfBirth.year + "");
            AutomationPracticeFormPage.monthSelectField.select(person.dateOfBirth.month).then(() => {
                AutomationPracticeFormPage.daySelectField(
                    person.dateOfBirth.year,
                    person.dateOfBirth.mIdx,
                    person.dateOfBirth.day,
                    person.dateOfBirth.month
                ).click();
            });

            AutomationPracticeFormPage.subjectsInputField.type(person.subject).then(() => {
                AutomationPracticeFormPage.subjectAutoCompleteField.contains(person.subject).click();
            });

            AutomationPracticeFormPage.hobbyInputField(person.hobbies).click();
            AutomationPracticeFormPage.uploadFileInput.selectFile(
                `./cypress/files/${person.picture}` /*Cerams jums šis file path ies (Ja jus klonesiet projektu), itkā vajadzētu iet.*/
            );
            AutomationPracticeFormPage.currentAddressInputField.type(person.currentAddress);

            AutomationPracticeFormPage.stateField.click().then(() => {
                AutomationPracticeFormPage.selectStateOption(person.state).click();
            });

            AutomationPracticeFormPage.cityField.click().then(() => {
                AutomationPracticeFormPage.selectCityOption(person.city).click();
            });

            AutomationPracticeFormPage.submitButton.click();

            //// Check if  information is correct/////
            AutomationPracticeFormPage.submitConfirmTitle.should("have.text", "Thanks for submitting the form");
            AutomationPracticeFormPage.validationTable.children().each(($child, $idx) => {
                let element = cy.get($child).children().eq(1);

                switch ($idx) {
                    case 0:
                        element.should("have.text", `${person.firstName} ${person.lastName}`);
                        break;
                    case 1:
                        element.should("have.text", person.email);
                        break;
                    case 2:
                        element.should("have.text", person.gender);
                        break;
                    case 3:
                        element.should("have.text", person.mobile);
                        break;
                    case 4:
                        element.should(
                            "have.text",
                            `${person.dateOfBirth.day} ${person.dateOfBirth.month},${person.dateOfBirth.year}`
                        );
                        break;
                    case 5:
                        element.should("have.text", person.subject);
                        break;
                    case 6:
                        element.should("have.text", person.hobbies);
                        break;
                    case 7:
                        element.should("have.text", person.picture);
                        break;
                    case 8:
                        element.should("have.text", person.currentAddress);
                        break;
                    case 9:
                        element.should("have.text", `${person.state} ${person.city}`);
                        break;
                }
            });
        });
    });
});
