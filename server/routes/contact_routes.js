const express = require('express');
const router = express.Router();
const {addContact,getContacts,deleteContact,updateContact}=require("../controllers/contact_routes")

router.post("/contact",addContact);
router.get("/contacts",getContacts);
router.delete("/contacts/:id",deleteContact);
router.put("/contact/:id",updateContact)

module.exports = router;
