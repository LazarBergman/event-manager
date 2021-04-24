const bot = require('../bot');
const transporter = require('./transporter');
const repository = require('../repositories/subscriberRepository');
var compareAsc = require('date-fns/compareAsc')
class Sender {
    static async sendMessage(subscribers, message) {
            const successfullSends = [];
            for (let sub of subscribers) {
                if (sub.chatId) {

                   await bot.telegram.sendMessage(sub.chatId, message);

                } else if (sub.email) {

                    await transporter.sendMail({
                        from: process.env.HOST_EMAIL,
                        to: sub.email,
                        subject: 'Message from Node js',
                        text: message,
                      })
                }
                successfullSends.push(sub);
            }
            return successfullSends;
    }

    static async compareTimeToSubscribers() {
        const subs = await repository.getSubscribers();
        const needToNotify = [];
        for (const sub of subs) {
            const res = compareAsc(new Date(), sub.notifyOn);
            if (res === 1) {
                needToNotify.push(sub);
            }
        }
        return needToNotify;
    }

    static async handleDelayedSend() {
        const subs = await Sender.compareTimeToSubscribers();
        const message = 'test';
        const needToResetNotify = await Sender.sendMessage(subs, message);
        console.log(needToResetNotify);
        await repository.resetNotification(needToResetNotify);
    }


}

module.exports = Sender;