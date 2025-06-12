
const fetch = require('node-fetch'); 

const crudApi = 'https://crudcrud.com/api/9e40e8f2835a4eb3b78053f3faf7ccdb/profile';
async function saveToDatabase(data) {
  console.log("Saving to local DB (simulated):", data);
}


async function sendToCrudCrud(data) {
  console.log(" Waiting 10 seconds before sending to CrudCrud...");
  await new Promise(resolve => setTimeout(resolve, 10000));

  try {
    const response = await fetch(crudApi, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log("Data sent to CrudCrud:", result);
  } catch (err) {
    console.error("Failed to send to CrudCrud:", err.message);
  }
}
module.exports = {
  saveToDatabase,
  sendToCrudCrud
};
