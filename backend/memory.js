const fs = require("fs");
const memoryFile = "./database/memory.json";

// Load memory
function loadMemory() {
    if (!fs.existsSync(memoryFile)) fs.writeFileSync(memoryFile, JSON.stringify({}));
    return JSON.parse(fs.readFileSync(memoryFile, "utf-8"));
}

// Get user memory
function getUserMemory(userId) {
    const memory = loadMemory();
    return memory[userId] || [];
}

// Update memory
function updateUserMemory(userId, message, response) {
    const memory = loadMemory();
    if (!memory[userId]) memory[userId] = [];
    memory[userId].push({ message, response });

    fs.writeFileSync(memoryFile, JSON.stringify(memory, null, 2));
}

module.exports = { getUserMemory, updateUserMemory };
