import { expect, test } from "@playwright/test";
import { Auth } from "../tests/src/Auth";

test.describe("E2E WordPress Playground", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://sosfinance.joaoc.dev", {
            timeout: 60000,
        });
    });

    test("abrir uma matéria", async({ page }) => {
        const menuButton = page.getByRole("link", {name:"Educação Fianceira"});

        await menuButton.click();

        const articleLink = page
            .locator('h2')
            .getByRole('link',{ name: 'Porque é impotante guardar'});

        await articleLink.click();

        await expect(await page.innerText("article h1")).toBe(
            "Por que é importante guardar dinheiro?",
        );
    });

    test("fazer um comentário dentro da matéria", async ({ page }) => {
        const menuButton = page.getByRole("link", { name: "EducaçãoFinanceira" });

        await menuButton.click();

        const articleLink = page
        .locator("h2")
        .getByRole("link", { name: "Porque é importante guardar" });

        await articleLink.click();

        await page.getByRole("link", { name: "login" }).click();

        await page.fill("#user_login", "etec");
        await page.fill("#user_pass", "etec123@@");
        await page.click("#wp-submit");

        await page.fill("#comment", "Comentário do João");
        await page.click("#submit");
    });

    test("fazer login e acessar o painel do admin", async ({ page }) => {
        const auth = new Auth(page);
        await auth.doLogin("etec", "etec123@@");

        await expect(
            await page.getByRole("heading", {
                name: "Painel",
            }),
        ).toBeVisible();
    });
});