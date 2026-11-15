// ─────────────────────────────────────────────
// LAYER 1: PRESENTATION — routes
//
// Job: map a URL + HTTP method to a controller function. Nothing else.
// ─────────────────────────────────────────────

const express = require("express");
const controller = require("./messageController");

const router = express.Router();

router.post("/messages", controller.sendMessage);        // send a message
router.get("/messages/:userId", controller.getChats);    // read a user's chats
router.delete("DELETE /messages/:id",controller.deleteChats);//delete a user's message

module.exports = router;
