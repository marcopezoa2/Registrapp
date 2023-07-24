import { browser, element, by } from "protractor";
describe("tabs", () => {
    beforeEach(() => {
        browser.get("/");
    });
    it("La pestaña Tab One se muestra por defecto", () => {
        expect(element(by.css(".tab-selected ion-label")).getText()).toContain("Perfil");
    });
    it("El usuario puede navegar a la pestaña Tab Two", async () => {
        await element(by.css("[tab=tab2]")).click();
        browser.driver.sleep(500); 
        expect(element(by.css(".tab-selected ion-label")).getText()).toContain("AsisQR");
    });
});