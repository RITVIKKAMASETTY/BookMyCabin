import supabase from "./supabase";
import { supabaseUrl } from "./supabase";
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if(!session.session){
    return null;}
const {data,error}=await supabase.auth.getUser();
if(error) throw new Error(error.message);return data?.user;}
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}
// export async function signup({ fullName, email, password }) {
//   const { data, error } = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       data: {
//         fullName,
//         avatar: "",
//       },
//     },
//   });

  // if (error) {
  //   throw new Error(error.message);
  // }

//   return data;
// }
export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  // Force update to ensure fullname is saved
  const updateRes = await supabase.auth.updateUser({
    data: {
      fullName,
      avatar: "",
    },
  });

  if (updateRes.error) throw new Error(updateRes.error.message);

  return data;
}
export async function updateCurrentUser(params) {
  const { password, fullName, avatar } = params;
//1.update password or full name
let updatedData;
if(password){updatedData={password};}
if(fullName){updatedData={data:{fullName}};}
const {data,error}=await supabase.auth.updateUser(updatedData);
if(error) throw new Error(error.message);
if(!avatar){return data;}
//2.upload the avatar image
const fileName=`avatar-${data.user.id}-${Date.now()}`;
const {error:storageError}=await supabase.storage.from("avatars").upload(fileName,avatar);
if(storageError) throw new Error(storageError.message);
//3.update avtar in the user
const {data:updatedUser,error:userError}=await supabase.auth.updateUser({
  data:{avatar:`${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`},
})
if(userError) throw new Error(userError.message);
return updatedUser;
}