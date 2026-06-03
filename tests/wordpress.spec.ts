import { expect, test } from "@playwright/test";

test.describe("E2E WordPress Playground", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(
            "https://sosfinance.joaoc.dev", 
            {
            timeout: 60000,
            }
        );

        await expect(
            await page.innerText("h1")
        ).toBe("Por que é importante guardar dinheiro?");
        });
    });

    test("abrir um comentáriomatéria", async({ page }) => {
        const menuButton = page.getByRole("link", {name:"Educação Fianceira"});

        await menuButton.click();

        const articleLink = page
        .locator('h2')
        .getByRole('link',{
            
            name: 'Porque é impotante guardar'});

        await articleLink.click();

        const loginLink = page.getByRole()

    });
