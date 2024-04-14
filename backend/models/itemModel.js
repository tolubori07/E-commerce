const mongoose = require('mongoose')

const itemSchema = mongoose.Schema(
{
    Name:{
      type:String,
      required: [true,'Please give the item a name'],
    },
    Description:{
      type: String,
      required: [true,'Please add a description for the item']
    },
    Category:{
     type:String,
     required: [true,'please select a catgory']
    },
    Price:{
    type: Number,
    required: [true,'please add a price']
    },
  Image:{
    type: String,
    required: [true,'Please add an image']
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
  },
  {
    timestamps: true
  }
)
module.exports = mongoose.model('Item',itemSchema)
