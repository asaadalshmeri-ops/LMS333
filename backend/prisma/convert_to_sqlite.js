const fs = require("fs");
const path = require("path");

const schemaPath = path.join(__dirname, "schema.prisma");
let content = fs.readFileSync(schemaPath, "utf8");

// Change provider
content = content.replace('provider = "postgresql"', 'provider = "sqlite"');

// Remove @db.Text
content = content.replace(/ @db\.Text/g, "");

// Remove enums
content = content.replace(/enum Role {[\s\S]*?}/, "");
content = content.replace(/enum Difficulty {[\s\S]*?}/, "");

// Update fields using enums
content = content.replace("role         Role          @default(STUDENT)", 'role         String          @default("STUDENT")');
content = content.replace("difficulty   Difficulty    @default(MEDIUM)", 'difficulty   String          @default("MEDIUM")');

// Replace String[] or Json/Json? arrays with String or String? (storing JSON string)
content = content.replace("importantPoints       String[]", "importantPoints       String?");
content = content.replace("commonMistakes        String[]", "commonMistakes        String?");
content = content.replace("examTips              String[]", "examTips              String?");
content = content.replace("options      String[]", "options      String");

// Fallback in case they were modified to Json
content = content.replace("importantPoints       Json?", "importantPoints       String?");
content = content.replace("commonMistakes        Json?", "commonMistakes        String?");
content = content.replace("examTips              Json?", "examTips              String?");
content = content.replace("options      Json", "options      String");

fs.writeFileSync(schemaPath, content, "utf8");
console.log("schema.prisma successfully converted to SQLite compatibility!");
