export async function saveToDatabase(data: any): Promise<void> {
  console.log("Saving to DB (simulated):", data);
}

export async function sendToCrudCrud(data: any): Promise<void> {
  const response = await fetch("https://crudcrud.com/api/9e40e8f2835a4eb3b78053f3faf7ccdb/profile", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  console.log("Data sent to crudcrud:", result);
}
