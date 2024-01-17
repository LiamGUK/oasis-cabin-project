import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  // Checks to see if image key in newCabin object starts with the superbase URL = means the image has already been uploaded to backend bucket repo, can re use if only updating other values.
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // https://ryoixtapuztwaublbuog.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg -- example image source
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit cabin
  let query = supabase.from("cabins");

  // A) CREATE CABIN
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT CABIN
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  // 2. Upload image
  // if an image path already exists return the data early - no need to re-upload the same image (ignores below code)
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabins image could not be uploaded and cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id); // Deletes the row data matching the id value passed into function with the id in the data table

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}
