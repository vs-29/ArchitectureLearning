// ─────────────────────────────────────────────
// LAYER 1: PRESENTATION — controller  (the "waiter")
//
// Job: talk to the outside world.
//   1. Read the HTTP request
//   2. Check the INPUT is well-formed (fields present, right type)
//   3. Call the service — no business decisions here!
//   4. Turn the result (or error) into an HTTP response
// ─────────────────────────────────────────────

const service = require("./messageService");

function sendMessage(req, res) {
  const { from, to, text } = req.body;

  // INPUT validation (shape of the request) — belongs here
  if (!from || !to || typeof text !== "string" || text.trim() === "") {
    return res.status(400).json({ error: "from, to and a non-empty text are required" });
  }

  try {
    // Hand the real work to the business layer
    const message = service.sendMessage(from, to, text.trim());
    return res.status(201).json(message);
  } catch (err) {
    return handleError(err, res);
  }
}

function getChats(req, res) {
  try {
    const messages = service.getChats(req.params.userId);
    return res.json(messages);
  } catch (err) {
    return handleError(err, res);
  }
}


function deleteChats(req,res){
  try{
    const messages= service.deleteChats(req.params.id);
    return res.json("message deleted succesfully");
  }catch(err){
    return handleError(err,res);
  }
}

// Translate errors into HTTP status codes (an HTTP concern → stays in this layer)
function handleError(err, res) {
  if (err instanceof service.BusinessError) {
    return res.status(422).json({ error: err.message }); // a rule was broken
  }
  console.error(err);
  return res.status(500).json({ error: "Something went wrong" });
}

module.exports = { sendMessage, getChats,deleteChats };
