import { database, ref, push, onValue, remove, set } from "./firebaseConfig";

export const insertItem = async (product, amount, successCallback) => {
  try {
    const newItemRef = push(ref(database, "shopping")); 
    const newItemKey = newItemRef.key; 

    await set(ref(database, `shopping/${newItemKey}`), { product, amount });

    console.log("✅ Ostos lisätty!");
    successCallback();
  } catch (error) {
    console.error("❌ Firebase Insert Error:", error);
  }
};

export const getItems = (successCallback) => {
  const shoppingRef = ref(database, "shopping");
  onValue(shoppingRef, (snapshot) => {
    const data = snapshot.val();
    const items = data
      ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
      : [];
    successCallback(items);
  });
};

export const deleteItem = async (id, successCallback) => {
  try {
    await remove(ref(database, `shopping/${id}`));
    console.log("✅ Ostos poistettu!");
    successCallback();
  } catch (error) {
    console.error("❌ Firebase Delete Error:", error);
  }
};