export class BasePage {
    static visit() {
        return cy.visit(this.url);
    }

    static get url() {
        return "";
    }
}
