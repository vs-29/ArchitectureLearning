// ─────────────────────────────────────────────
// LAYER 2: BUSINESS LOGIC  (the "chef")
//
// Job: the RULES of the app — what is allowed and what happens.
// - Doesn't know about HTTP (no req, no res, no status codes).
// - Doesn't know HOW data is stored — it just asks the repository.
// - Because of this, you could call sendMessage() from an HTTP route,
//   a mobile API, a cron job, or a test — the rules stay the same.
// ─────────────────────────────────────────────

const repo = require("./messageRepository");

// A custom error so the controller can tell "rule broken" apart from "server crashed"
class BusinessError extends Error {}

function sendMessage(fromId, toId, text) {
  const sender = repo.findUserById(fromId);
  const receiver = repo.findUserById(toId);

  // Rule 1: both users must exist
  if (!sender || !receiver) {
    throw new BusinessError("Sender or receiver does not exist");
  }

  // Rule 2: you can't message someone who blocked you
  if (receiver.blocked.includes(fromId)) {
    throw new BusinessError("You can't message this user");
  }

  if (text.trim().length > 500) {
    throw new BusinessError("Message can't exceed 500 characters");
  }

  // Rule 3: tick status depends on whether the receiver is online
  //   online  → delivered (✓✓ grey)
  //   offline → sent      (✓ grey) — will be delivered when they come online
  const status = receiver.online ? "delivered" : "sent";

  const message = {
    id: Date.now().toString(),
    from: fromId,
    to: toId,
    text,
    status,
    sentAt: new Date().toISOString(),
  };

  return repo.saveMessage(message);
}

function getChats(userId) {
  // Rule: you must be a real user to read chats
  if (!repo.findUserById(userId)) {
    throw new BusinessError("User does not exist");
  }
  return repo.findMessagesForUser(userId);
}

function deleteChats(messageId){
  const message=repo.findMessagesForId(messageId)

  if (!message) {
    throw new BusinessError("messagedoes not exist");
  }
  if(Date.now()-new Date(message.sentAt).getTime()>60*60*1000){
     throw new BusinessError("message cann't be deleted now");
  }
  return repo.deleteMessage(message);
}

module.exports = { sendMessage, getChats,deleteChats, BusinessError };
