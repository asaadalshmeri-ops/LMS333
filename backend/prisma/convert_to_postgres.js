const fs = require("fs");
const path = require("path");

const schemaPath = path.join(__dirname, "schema.prisma");
let content = fs.readFileSync(schemaPath, "utf8");

// Change provider back to postgresql
content = content.replace('provider = "sqlite"', 'provider = "postgresql"');

fs.writeFileSync(schemaPath, content, "utf8");
console.log("schema.prisma successfully converted to PostgreSQL compatibility!");
