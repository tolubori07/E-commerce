const asyncHandler = require('express-async-handler');
const Item = require('../models/itemModel')
const Bag = require('../models/bagModel')


const addItem =asyncHandler( async(req,res)=>{
 if (!req.body.name||!req.body.description||!req.body.category||!req.body.price||!req.body.image) {
  res.status(400)
    throw new Error('please fill in all details')
 }
  const item = await Item.create({
  Name:req.body.name,
  Description:req.body.description,
  Category:req.body.category,
  Price:req.body.price,
  Image:req.body.image,
  user:req.user.id
  })
  res.status(201).json(item)
})

const getItems = asyncHandler( async(req,res)=>{ 
  const items = await Item.find({})  
  res.status(200).json(items)
})

const getItem = asyncHandler(async (req, res) => {
  const itemId = req.params.id; // Use req.params to access route parameters
  const item = await Item.findById(itemId);
  if (!item) {
    // If the item is not found, return a 404 Not Found response
    return res.status(404).json({ message: "Item not found" });
  }
  // If the item is found, respond with the item data
  res.status(200).json(item);
});

const getUserItems = asyncHandler( async(req,res)=>{
  try{
  const items = await Item.find({user:req.user.id})
  res.status(200).json(items)
  }catch(error){
    res.status(500).json({message:error.message});
  }
})

const getBag = asyncHandler( async(req,res)=>{
    const bag = await Bag.find({user:req.user.id})
    res.status(200).json(bag)
})

const addToBag = asyncHandler(async (req, res) => {
  try {
    // Check if the user already has a bag
    let bag = await Bag.findOne({ user: req.user.id });
    const newItemId = req.body.item; // Assuming req.body.item is the ID of the item
    
    if (bag) {
      // Check if the item is already in the bag
      const itemIndex = bag.items.findIndex(item => String(item.item) === String(newItemId));
      
      if (itemIndex !== -1) {
        return res.status(400).json({ message: "This item is already in the bag" });
      }

      // If the user already has a bag and the item is not in the bag, add the item to the bag
      bag.items.push({ item: newItemId });
    } else {
      // If the user doesn't have a bag, create a new bag and add the item to it
      bag = new Bag({
        user: req.user.id,
        items: [{ item: newItemId }]
      });
    }

    // Save the bag
    await bag.save();

    res.status(200).json(bag);
  } catch (error) {
    throw new Error(`Failed to add item to bag: ${error.message}`);
  }
});
module.exports={
 addItem,
 getItems,
 getItem,
 getUserItems,
 getBag,
 addToBag,
}
