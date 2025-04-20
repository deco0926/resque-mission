import admin from "firebase-admin";
import { createObjectCsvWriter } from "csv-writer";
import fs from "fs";

// ✅ 讀取你的 serviceAccount 金鑰
const serviceAccount = JSON.parse(fs.readFileSync("serviceAccountKey.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// ✅ 自訂要匯出的 Collection 名稱
const COLLECTION_NAME = "levelCompletion";

async function exportToCSV() {
  const snapshot = await db.collection(COLLECTION_NAME).get();
  if (snapshot.empty) {
    console.log("⚠️ 沒有資料可匯出！");
    return;
  }

  const records = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    records.push({
      playerId: data.playerId || "",
      level: data.level || "",
      totalTime: data.totalTime || 0,
      deathCount: data.deathCount || 0,
      timestamp: data.timestamp || "",
      deathTypes: JSON.stringify(data.deathTypes || {}),
      answers: JSON.stringify(data.answers || []),
    });
  });

  const csvWriter = createObjectCsvWriter({
    path: `${COLLECTION_NAME}.csv`,
    header: [
      { id: "playerId", title: "playerId" },
      { id: "level", title: "level" },
      { id: "totalTime", title: "totalTime" },
      { id: "deathCount", title: "deathCount" },
      { id: "timestamp", title: "timestamp" },
      { id: "deathTypes", title: "deathTypes" },
      { id: "answers", title: "answers" },
    ],
  });
  
  await csvWriter.writeRecords(records);
  
  // ✅ 加上 BOM 避免中文亂碼
  const bom = "\uFEFF";
  const filePath = `${COLLECTION_NAME}.csv`;
  const content = fs.readFileSync(filePath, "utf8");
  fs.writeFileSync(filePath, bom + content, "utf8");
  console.log(`✅ 已成功匯出 UTF-8 帶 BOM 的 ${filePath}`);
  console.log(`✅ 已成功匯出 ${records.length} 筆資料到 ${COLLECTION_NAME}.csv`);
}

exportToCSV();
