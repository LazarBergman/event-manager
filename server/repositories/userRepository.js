const User = require('../schemas/user');
const STATE = require('../constants/userState')
class UserRepository {

  constructor(model) {
    this.model = model;
  }

  create(data) {
    const userData = {
        username: '',
        password: '',
        salutation: data.salutation,
        state: STATE.CREATED,
    };
    const user = new this.model(userData);

    return user.save();
  }

  findAll() {
    return this.model.find();
  }


  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  updateById(id, data) {
    const query = { _id: id };
    return this.model.findOneAndUpdate(query, { $set: { salutation: data.salutation} });
  }

  updateState(id, state) {
    const query = { _id: id };
    return this.model.findOneAndUpdate(query, { $set: { state: state} });
  }


}

module.exports = new UserRepository(User);