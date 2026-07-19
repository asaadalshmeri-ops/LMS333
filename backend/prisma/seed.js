const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const subjects = [
    { slug: "math", nameAr: "الرياضيات", nameEn: "Mathematics", description: "منهج الرياضيات للصف الثالث الثانوي" },
    { slug: "physics", nameAr: "الفيزياء", nameEn: "Physics", description: "منهج الفيزياء للصف الثالث الثانوي" },
    { slug: "chemistry", nameAr: "الكيمياء", nameEn: "Chemistry", description: "منهج الكيمياء للصف الثالث الثانوي" },
    { slug: "biology", nameAr: "الأحياء", nameEn: "Biology", description: "منهج الأحياء للصف الثالث الثانوي" },
    { slug: "english", nameAr: "اللغة الإنجليزية", nameEn: "English", description: "منهج اللغة الإنجليزية للصف الثالث الثانوي" },
    { slug: "arabic", nameAr: "اللغة العربية", nameEn: "Arabic", description: "منهج اللغة العربية للصف الثالث الثانوي" },
    { slug: "islamic", nameAr: "التربية الإسلامية", nameEn: "Islamic Education", description: "منهج التربية الإسلامية للصف الثالث الثانوي" },
    { slug: "quran", nameAr: "القرآن الكريم", nameEn: "Holy Quran", description: "منهج القرآن الكريم للصف الثالث الثانوي" }
  ];

  console.log("Seeding subjects...");

  for (const s of subjects) {
    const subject = await prisma.subject.upsert({
      where: { slug: s.slug },
      update: {},
      create: s
    });
    console.log(`upserted subject: ${subject.nameAr} (${subject.slug})`);
  }

  // Also create a default admin user for convenience: admin@yemen.edu / admin123
  const bcrypt = require("bcryptjs");
  const adminEmail = "admin@yemen.edu";
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: "مشرف النظام العام",
      role: "ADMIN"
    }
  });
  console.log("Default admin user created: admin@yemen.edu / admin123");

  console.log("Seeding completed successfully!");
}

main()
  .catch(e => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
