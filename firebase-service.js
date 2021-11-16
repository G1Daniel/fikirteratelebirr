const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')

exports.admin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fikir-tera-dating-app.firebaseio.com",
});