const Event = require('../schemas/event');
const STATE = require('../constants/eventStates')
class EventRepository {

  constructor(model) {
    this.model = model;
  }

  create(data) {
    const eventData = {
        title: data.title,
        description: data.description,
        startDate: data.startDate,
        state: STATE.MAIN,
        subevents: []
    };
    const event = new this.model(eventData);

    return event.save();
  }

  findMain() {
    return this.model.find({state: STATE.MAIN});
  }

  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  updateById(id, data) {
    const query = { _id: id };
    return this.model.findOneAndUpdate(query, { $set: { title: data.title, description: data.description, startDate: data.startDate} });
  }

  async addSubevent(id, data) {
    const main = await this.model.findOne({_id: id});
    const eventData = {
        title: data.title,
        description: '',
        startDate: data.startDate,
        state: STATE.SUB,
        subevents: []
    };
    const subevent = new this.model(eventData);

    await subevent.save();
    main.subevents.push(subevent);
    return main.save();

  }

}

module.exports = new EventRepository(Event);