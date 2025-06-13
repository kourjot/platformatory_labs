export async function saveToDatabase(data: any): Promise<void> {
  console.log("Saving to DB (simulated):", data);
}


export async function sendToCrudCrud(data: any): Promise<void> {
  try {
    const apiBase = "https://crudcrud.com/api/2a7e4a1b19684888a78c1390d32fea0b/profile";


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
      if(createResponse.ok){
        const res=await createResponse.json()
        console.log("New connection",res)
      }else{
        const errorText = await createResponse.text();
        console.log("Create fail",errorText)
      }
      const result = await createResponse.json();
      console.log("New user created:", result);
    }

  } catch (error) {
    console.error(" Error in sendToCrudCrud:", error);
  }
}
