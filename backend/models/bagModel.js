const mongoose = require('mongoose')

const BagSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    items: [{
      item: { type: mongoose.Schema.Types.ObjectID, ref: 'Items' },
    }]
  }
)

module.exports = mongoose.model('Bag',BagSchema)

