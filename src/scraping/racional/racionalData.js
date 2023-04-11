const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const { EmbedBuilder } = require('discord.js')

//0 0,12 * * * *


const racionalJob = async () => {
    console.log('llamando', new Date().toLocaleTimeString())
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--incognito']
    });
    const page = await browser.newPage();
    await page.goto('https://app.racional.cl/login')
    await page.type('.native-input:nth-child(1)', 'sh4c0p@gmail.com')
    await page.type('#main > app-login > ion-content > div > div.login-container > div.login-form > form > app-simple-credentials > form > app-password-input > form > ion-item > ion-input > input', 'perro123')
    await page.click('#main > app-login > ion-content > div > div.login-container > div.login-actions > button')
    await page.waitForNetworkIdle();
    const data = await page.content();
    await browser.close();
    const $ = cheerio.load(data);
    const investment = $('.investment-amount').text().trim();
    const profit = $('.profit-subtitle').text().trim();
    console.table({
        investment,
        percent,        profit
    });
    const embedRacional = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Racional')
        .setURL('https://app.racional.cl/tabs/home')
        .setDescription('Tus estadisticas de hoy son: ')
        .addFields({ name: 'Investment', value: investment, inline: true })
        .addFields({ name: 'Profit', value: profit, inline: true })
        .setTimestamp()
    return embedRacional;
}

module.exports = racionalJob;