const admin = require("firebase-admin");
admin.initializeApp();

// 导入 V2 SDK 的 HTTP 触发器
const {onRequest} = require("firebase-functions/v2/https");

/**
 * V2 HTTP Function to count the number of books in the 'books' collection.
 * V2 Functions handle CORS via configuration, not by wrapping the function.
 */
exports.countBooks = onRequest(
    {
      cors: true,
      region: "us-central1",
    },

    async (request, response) => {
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

const {onDocumentCreated} = require("firebase-functions/v2/firestore");
exports.onNewBookCreate = onDocumentCreated(
    {
      document: "books/{bookId}",
      region: "us-central1",
    },
    async (event) => {
      const snapshot = event.data;
      if (!snapshot) {
        console.log("No data associated with the event.");
        return;
      }
      const originalData = snapshot.data();
      const bookName = originalData.name;

      if (typeof bookName !== "string") {
        console.log("Book name is not a string, skipping capitalization.");
        return;
      }

      const capitalizedName = bookName.toUpperCase();

      if (capitalizedName === bookName) {
        console.log("Name already capitalized, skipping database write.");
        return;
      }

      console.log(`Capitalizing name from '${bookName}' to ` +
        `'${capitalizedName}'`);

      return snapshot.ref.set(
          {name: capitalizedName},
          {merge: true},
      );
    },
);
