const http = require("http");
const admin = require("firebase-admin");
const os = require("os");

const serviceAccount = require("./demopushnotification-7bb37-firebase-adminsdk-retth-868f18c9e8.json");

const objectNetwork = os.networkInterfaces();
const ipV4 = objectNetwork["Wi-Fi"].find((info) => info.family === "IPv4");
const hostname = ipV4.address;
const port = 3000;

/// setup firebase sdk
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://demopushnotification-7bb37.firebaseio.com",
});
const payload = {
  notification: {
    title: "Notification Title",
    body: "This is an example notification",
  },
};
const options = {
  priority: "high",
  timeToLive: 60 * 60 * 24,
};

const tokenFake =
  "eE1hx7uBSjqZx4gw8AkM7b:APA91bGdGWiM4BBpxkYvV5yv3mg9f4gmlqyh9Nz2YiGIegpZklYj8i8hmKigAVhthmfo81s0aABVlp0lw_XIIfdjI8Eqa33y7h0CJyPRJgR3w30O_4w2uiHh3kxmFjsFIyFOu9QXkUdb";

// router "/" of sever

// const server = http.createServer((req, res) => {
//   req.on("data", (data) => {
//     const token = JSON.parse(data);

//     // send messages to firebase
//     admin
//       .messaging()
//       .sendToDevice(token.token, payload, options)
//       .then((res) => {
//         console.log("Successfully sent message:", res);
//         console.log(res.results[0].error);
//       })
//       .catch((err) => {
//         console.log("Error sending message:", err);
//       });

//     ///End send...
//   });
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Content-Type", "application/json");
//   res.end(JSON.stringify({ status: "Success!!!" }));
// });

admin
  .messaging()
  .sendToDevice(tokenFake, payload, options)
  .then((res) => {
    console.log("Successfully sent message:", res);
    console.log(res.results[0].error);
  })
  .catch((err) => {
    console.log("Error sending message:", err);
  });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
