export async function saveToDatabase(data: any): Promise<void> {
  console.log("Saving to DB (simulated):", data);
}


export async function sendToCrudCrud(data: any): Promise<void> {
  try {
    const apiBase = "https://crudcrud.com/api/9e40e8f2835a4eb3b78053f3faf7ccdb/profile";


    const getResponse = await fetch(apiBase);
    const users = await getResponse.json();

  
    const existingUser = users.find((user: any) =>
      user.firstName === data.firstName &&
      user.lastName === data.lastName &&
      user.phone === data.phone
    );

    if (existingUser && existingUser._id) {
      
      const updateUrl = `${apiBase}/${existingUser._id}`;
      const updateResponse = await fetch(updateUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (updateResponse.ok) {
        console.log(`User updated: ${existingUser._id}`);
      } else {
        console.error(" Update failed:", await updateResponse.text());
      }

    } else {
      
      const createResponse = await fetch(apiBase, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await createResponse.json();
      console.log("New user created:", result);
    }

  } catch (error) {
    console.error(" Error in sendToCrudCrud:", error);
  }
}
