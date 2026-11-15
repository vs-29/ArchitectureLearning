# Layered Architecture — WhatsApp "send message" example

A tiny Express app where each layer lives in its own file.

```
Request ─▶ routes.js ─▶ messageController.js ─▶ messageService.js ─▶ messageRepository.js ─▶ db.js
           └──────── PRESENTATION ─────────┘   └─ BUSINESS LOGIC ─┘   └── DATA ACCESS ───┘   (storage)
```

| File | Layer | Job | Analogy |
| --- | --- | --- | --- |
| `routes.js` | Presentation | URL → controller function | Menu |
| `messageController.js` | Presentation | Read request, check input shape, call service, send response | Waiter |
| `messageService.js` | Business logic | Rules: user exists? blocked? online → which tick? | Chef |
| `messageRepository.js` | Data access | Only read/write data, no rules | Storeroom keeper |
| `db.js` | (storage) | Fake in-memory database | Storeroom |

## Run it

```bash
npm install
node app.js
```

## Try it (in a second terminal)

Windows PowerShell — use `curl.exe` (not `curl`):

```powershell
# 1. Riya is offline → status "sent" (one tick)
curl.exe -X POST http://localhost:3000/messages -H "Content-Type: application/json" -d '{\"from\":\"vaishnavi\",\"to\":\"riya\",\"text\":\"Hi\"}'

# 2. Vaishnavi is online → status "delivered" (two ticks)
curl.exe -X POST http://localhost:3000/messages -H "Content-Type: application/json" -d '{\"from\":\"riya\",\"to\":\"vaishnavi\",\"text\":\"Hello!\"}'

# 3. Rahul blocked Vaishnavi → 422, rejected by the BUSINESS layer
curl.exe -X POST http://localhost:3000/messages -H "Content-Type: application/json" -d '{\"from\":\"vaishnavi\",\"to\":\"rahul\",\"text\":\"Hi\"}'

# 4. Empty text → 400, rejected by the CONTROLLER (input validation)
curl.exe -X POST http://localhost:3000/messages -H "Content-Type: application/json" -d '{\"from\":\"vaishnavi\",\"to\":\"riya\",\"text\":\"\"}'

# 5. Read Vaishnavi's chats
curl.exe http://localhost:3000/messages/vaishnavi
```

Or use Postman / Thunder Client (VS Code) with the same URLs and JSON bodies.

## Notice

- Test 3 vs test 4: both are "validation", but different layers. Empty text = **input** check (controller). Blocked = **business rule** (service).
- `messageService.js` never touches `req`/`res` → you could call `sendMessage()` from a test or a cron job.
- Swap the in-memory DB for MongoDB → only `messageRepository.js` changes.

## Practice (do these yourself)

1. Add a rule: messages longer than 500 characters are rejected. Which file? *(Hint: is it a rule of the app?)*
2. Add "delete for everyone, only within 1 hour of sending". Write the rule in the service, the delete in the repository, and a `DELETE /messages/:id` route + controller.
3. Make Riya come online and mark her pending messages as delivered.
