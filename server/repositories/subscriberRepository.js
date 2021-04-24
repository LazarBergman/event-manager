const Subscriber = require('../schemas/subscriber');
const Event = require('../schemas/event');
const EVENT_STATES = require('../constants/eventStates')
const SUBSCRIBER_TYPE = require('../constants/SubscriberType')
var sub = require('date-fns/sub')
class SubscribersRepository {

  constructor(model) {
    this.model = model;
  }

  create(data) {
    const userData = {
        chatId: data.chatId,
        telegram: data.telegram,
        email: data.email,
    };
    const user = new this.model(userData);

    return user.save();
  }

  async setNotificationTelegram(days, id) {
    const subscriber = await this.model.findOne({chatId: id});
    this.setNotification(subscriber, days);
  }

  async setNotification(subscriber, days) {
    const event = await Event.findOne({state: EVENT_STATES.MAIN});
    const date = sub(event.startDate, {days});
    subscriber.notifyOn = date;
    await subscriber.save();
  }

  getSubscribers() {
      return this.model.find();
  }

  async resetNotification(subscribers) {
    for (const subscriber of subscribers) {
      subscriber.notifyOn = null;
      await subscriber.save();
    }
  }


}

module.exports = new SubscribersRepository(Subscriber);