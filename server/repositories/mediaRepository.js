const Media = require('../schemas/media');

class MediaRepository {

  constructor(model) {
    this.model = model;
  }

  create(data) {
    const media = new this.model(data);
    return media.save();
  }

  findAll() {
    return this.model.find();
  }

  findByType(type) {
      return this.model.find({type});
  }

  findById(id) {
    return this.model.findById({_id: id});
}


  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  
}

module.exports = new MediaRepository(Media);