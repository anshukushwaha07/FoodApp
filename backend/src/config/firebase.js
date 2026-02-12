import admin from "firebase-admin";
import fs from "fs";
import path from "path";

// Use absolute path to prevent "file not found" errors
const serviceAccountPath = path.resolve("firebase-service-account.json");

if (!fs.existsSync(serviceAccountPath)) {
  console.error("Firebase service account file not found at:", serviceAccountPath);
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log("🔥 Firebase Admin Initialized");

export default admin;