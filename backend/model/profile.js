const {Schema,model} =require("mongoose")
const profileSchema = new Schema({
  firstName: String,
  lastName: String,
  phone: String,
  city: String,
  pincode: String
});

const Profile =model('Profile', profileSchema);
module.exports = { Profile };