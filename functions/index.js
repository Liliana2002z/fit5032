// functions/index.js (V2 API 版本)

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

// 导入 V2 SDK 的 HTTP 触发器
const {onRequest} = require("firebase-functions/v2/https");

/**
 * V2 HTTP Function to count the number of books in the 'books' collection.
 * V2 Functions handle CORS via configuration, not by wrapping the function.
 */
exports.countBooks = onRequest(
    // 1. 设置 V2 函数的配置
    {
      // 允许所有来源（*）进行跨域访问。这是关键！
      cors: true,
      region: "us-central1", // 确保区域与你的部署一致
    },
    // 2. 编写请求处理逻辑
    async (request, response) => {
      // V2 函数不需要手动处理 OPTIONS 请求，但确保只处理 GET
      if (request.method !== "GET") {
        return response.status(405).send("Method Not Allowed");
      }

      try {
        const booksRef = admin.firestore().collection("books");
        const snapshot = await booksRef.get();
        const bookCount = snapshot.size;

        response.status(200).json({
          count: bookCount,
          message: `Book count retrieved successfully via V2 API.`,
        });
      } catch (error) {
        console.error("Error counting books:", error);
        response.status(500).send("Error counting books.");
      }
    },
);
