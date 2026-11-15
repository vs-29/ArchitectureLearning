// ─────────────────────────────────────────────
// DATABASE (not a layer — just storage)
// A fake in-memory database so you don't need to install anything.
// In a real app this would be MongoDB, PostgreSQL, MySQL, etc.
// ─────────────────────────────────────────────

const db = {
  users: [
    { id: "vaishnavi", online: true, blocked: [] },
    { id: "riya", online: false, blocked: [] },
    { id: "rahul", online: true, blocked: ["vaishnavi"] }, // rahul blocked vaishnavi
  ],
  messages: [],
};

module.exports = db;
