const {Profile} =require("../model/profile.js");
const {connection} =require("../db.js")
export async function saveToDatabase(data: any): Promise<void> {
  console.log("Saving to DB (simulated):", data);
}
export async function savetoMongoDb(data:any):Promise<void>{
  try{
    await connection()
    const existingUser=await Profile.findOne({
      firstName:data.firstName,
      lastName:data.lastName,
      phone:data.phone
    })
    if(existingUser){
      await Profile.updateOne({_id:existingUser._id},data)
      console.log(existingUser._id)
    }else{
      const newProfile= new Profile(data)
      await newProfile.save()
      console.log(newProfile._id)
    }
  }catch(err){
    console.log("Error in data save in mongoDB",err)
  }
}

export async function sendToCrudCrud(data: any): Promise<void> {
  try {
    const apiBase = "https://crudcrud.com/api/f07cb3b251284854b33b000edb8b1a65/profile";
    const getResponse = await fetch(apiBase);
    if(!getResponse.ok){
      const text=await getResponse.text()
      console.log(text)
    }
    const users = await getResponse.json();

  
    const existingUser = users.find((user: any) =>
      user.firstName === data.firstName &&
      user.lastName === data.lastName &&
      user.phone === data.phone
    );

    if (existingUser && existingUser._id) {
      
      const updateUrl = `${apiBase}/${existingUser._id}`;
      console.log(updateUrl)
      const updateResponse = await fetch(updateUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!updateResponse.ok) {
       const errText=await updateResponse.text()
       console.log(errText)
      } 
      console.log("User updated:",existingUser._id)

    } else {
      
      const createResponse = await fetch(apiBase, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
     
      if(!createResponse.ok){
        const errorText = await createResponse.text();
        console.log("Create failed:", errorText);
     
      }
      const result = await createResponse.json(); 
      console.log("New user created:", result);

    }

  } catch (error) {
    console.error(" Error in sendToCrudCrud:", error);
  }
}
