
const { Telegraf, Markup } = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN);
const repository = require('./repositories/subscriberRepository');
const SUBSCRIBER_TYPE = require('./constants/SubscriberType')
const keyboard = Markup.keyboard([
        Markup.button.callback('Уведомить за 1 день', 'notifyOnOne'),
        Markup.button.callback('Уведомить за 2 дня', 'notifyOnTwo'),
        Markup.button.callback('Уведомить за 3 дня', 'notifyOnThree')
  ])

bot.start((ctx) => 
{
    repository.create({chatId:ctx.message.from.id, telegram: ctx.message.from.username, type: SUBSCRIBER_TYPE});
    ctx.telegram.sendMessage(
        ctx.from.id,
        'Like?',
        keyboard);
});

bot.hears('Уведомить за 1 день', (ctx) => {repository.setNotificationTelegram(1, ctx.from.id); ctx.reply('ok')})
bot.hears('Уведомить за 2 дня', (ctx) => {repository.setNotificationTelegram(2, ctx.from.id); ctx.reply('ok')})
bot.hears('Уведомить за 3 дня', (ctx) => {repository.setNotificationTelegram(3, ctx.from.id); ctx.reply('ok')})
bot.launch();

module.exports = bot;