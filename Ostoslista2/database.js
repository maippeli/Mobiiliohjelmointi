import * as SQLite from 'expo-sqlite';

let db;

export const setupDatabase = async () => {
  try {
    db = await SQLite.openDatabaseAsync("shoppinglist.db");
    console.log("✅ SQLite avattu onnistuneesti!");

    await db.execAsync(
      "CREATE TABLE IF NOT EXISTS shopping (id INTEGER PRIMARY KEY AUTOINCREMENT, product TEXT, amount TEXT);"
    );
    console.log("✅ Ostoslista-taulukko valmis!");
  } catch (error) {
    console.error("❌ SQLite virhe:", error);
  }
};

export const insertItem = async (product, amount, successCallback) => {
  if (!db) return;
  try {
    await db.runAsync(
      "INSERT INTO shopping (product, amount) VALUES (?, ?);",
      [product, amount]
    );
    console.log("✅ Ostos lisätty:", product, amount);
    successCallback();
  } catch (error) {
    console.error("❌ Insert Error:", error);
  }
};

export const getItems = async (successCallback) => {
  if (!db) return;
  try {
    const result = await db.getAllAsync("SELECT * FROM shopping;");
    successCallback(result);
  } catch (error) {
    console.error("❌ Fetch Error:", error);
  }
};

export const deleteItem = async (id, successCallback) => {
  if (!db) return;
  try {
    await db.runAsync("DELETE FROM shopping WHERE id = ?;", [id]);
    console.log("✅ Ostos poistettu, ID:", id);
    successCallback();
  } catch (error) {
    console.error("❌ Delete Error:", error);
  }
};

export default db;