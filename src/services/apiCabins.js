import supabase,{supabaseUrl}from "./supabase";
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
export async function deleteCabinapi(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
// export async function createCabin(newCabin) {
//   console.log("new cabin",newCabin);
//   //1.create the cabin
//   //https://akyexhpupmywrrexjtpm.supabase.co/storage/v1/object/public/cabinimages//cabin-001.jpg
//   const imageName=`${Math.random()}-${newCabin.image.name}`.replaceAll("/","");
//   const imagePath=`${supabaseUrl}/storage/v1/object/public/cabinimages/${imageName}`;
//  const {data,error}=await supabase.from("cabins").insert([{
//   ...newCabin,
//   image:imagePath
//  }]);
//  console.log("data",data);
//  if(error){
//   console.log(error);
//   throw new Error("Cabin could not be created");
//  }
//   // const { data, error } = await supabase.from("cabins").insert([newCabin]);
// //2.upload the image
// const {error:storageError}=await supabase.storage.from("cabinimages").upload(imageName,newCabin.image);
// //3.delete a new canin created if error in uploading the file
// if(storageError){
//   await supabase.from("cabins").delete().eq("id",data[0].id);
//   console.log(storageError);
//   throw new Error("Cabin image could not be uploaded");
// }

//   return data;
// }
// export async function createeditCabin(newCabin) {
//   console.log("new cabin", newCabin);

//   // Step 1: Generate a unique image name
//   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
//   const imagePath = `${supabaseUrl}/storage/v1/object/public/cabinimages/${imageName}`;

//   // Step 2: Upload the image first
//   const { error: storageError } = await supabase.storage.from("cabinimages").upload(imageName, newCabin.image);

//   // Check if the image upload failed
//   if (storageError) {
//     console.log("Image upload failed:", storageError);
//     throw new Error("Cabin image could not be uploaded");
//   }

//   // Step 3: Insert the cabin data into the database after successful image upload
//   const { data, error } = await supabase.from("cabins").insert([{
//     ...newCabin,
//     image: imagePath  // Save the image URL in the database
//   }]);

//   // If insert fails, log the error and throw
//   if (error) {
//     console.log("Insert error:", error);
//     throw new Error("Cabin could not be created");
//   }

//   // Step 4: Return the inserted cabin data
//   return data;
// }
export async function createeditCabin(newCabin, id) {
  try {
    console.log("🧾 Received Cabin Data:", newCabin);
    console.log("🆔 Cabin ID for edit:", id);

    // Determine if a new image was uploaded
    const isNewImageFile = newCabin.image && typeof newCabin.image !== "string";

// If new image is uploaded, we will set the image path later. Otherwise, preserve the current image path.
let imagePath = isNewImageFile
  ? ""
  : (typeof newCabin.image === "string" ? newCabin.image : newCabin.imagePath || "");


    if (isNewImageFile) {
      const imageName = `${Date.now()}-${newCabin.image.name}`.replaceAll("/", "");
      imagePath = `${supabaseUrl}/storage/v1/object/public/cabinimages/${imageName}`;

      const { error: storageError } = await supabase.storage
        .from("cabinimages")
        .upload(imageName, newCabin.image);

      if (storageError) throw new Error(`Image upload failed: ${storageError.message}`);
    }

    const cabinData = { ...newCabin, image: imagePath };

    // Use the right Supabase method
    const query = supabase.from("cabins");

    if (!id) {
      console.log("📦 Inserting new cabin...");
      const { data, error } = await query.insert([cabinData]);
      if (error) throw new Error(`Insert error: ${error.message}`);
      return data;
    } else {
      console.log("✏️ Updating cabin...");
      const { data, error } = await query.update(cabinData).eq("id", Number(id)).select();
      if (error) throw new Error(`Update error: ${error.message}`);
      return data;
    }
  } catch (error) {
    console.error("❌ Cabin operation failed:", error.message);
    throw new Error(error.message || "Cabin operation failed");
  }
}
