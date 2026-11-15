// ─────────────────────────────────────────────
// LAYER 3: DATA ACCESS  (the "storeroom keeper")
//
// Job: ONLY read and write data.
// - No rules here (no "if blocked", no "if online").
// - It doesn't know about HTTP, requests or responses.
// - If we switch from in-memory to MongoDB, ONLY this file changes.
// ─────────────────────────────────────────────

const db = require("./db");

function findUserById(userId) {
  return db.users.find((u) => u.id === userId);
}

function saveMessage(message) {
  db.messages.push(message);
  return message;
}

function findMessagesForUser(userId) {
  return db.messages.filter((m) => m.from === userId || m.to === userId);
}

function findMessagesForId(messageId){
  return db.messages.find((m)=>m.id == messageId);
}

function deleteMessage(message){
  db.messages.delete(message);
  return;
}


module.exports = { findUserById, saveMessage, findMessagesForUser,findMessagesForId, deleteMessage };
