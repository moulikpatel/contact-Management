
const userModel = require("../models/form");
// export const updateContact = (req, res) => {};
const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteduser = await userModel.findOneAndDelete({ _id: id });

    if (deleteduser) {
      return res.json({
        success: true,
        message: "Successfully deleted user"
      });
    } else {
      return res.json({
        success: false,
        message: "User not found"
      });
    }
  } catch (error) {
    console.error('Error during deletion:', error);
    res.status(500).json({
      success: false,
      message: "An error occurred"
    });
  }
};

 const addContact = async(req, res) => {
  const { firstName, lastName, email, phoneNumber, company, jobTitle } =
    req.body;
  try {
    const user = await userModel.findOne({email});
    if (user) {
      return res.json({
        success: false,
        message: "user already exist",
      });
    }
    const newuser = await userModel.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      company,
      jobTitle,
    });
    res.json({
      success: true,
      message: "user signed up successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
const getContacts = async(req, res) => {
  try {
    const users=await userModel.find();
    res.json({
        success:true,
        users,
    })
    
  } catch (error) {
    console.log(error);
    
  }


};
const updateContact=async(req,res)=>{
  const { id } = req.params;
  const { firstName, lastName, email, phoneNumber, company, jobTitle } =
    req.body;
  

  // Validate ObjectId

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      {_id:id},
      { firstName,lastName,email,phoneNumber,company,jobTitle},
      { new: true, runValidators: true } // 'new' returns the updated user
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ success: true, updatedUser,message:"user updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }

}
module.exports={addContact,getContacts,deleteContact,updateContact}
