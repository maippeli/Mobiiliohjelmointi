import * as SQLite from 'expo-sqlite';

let db;

export const setupDatabase = async () => {
  try {
    db = await SQLite.openDatabaseAsync("history.db");

    await db.execAsync(
      "CREATE TABLE IF NOT EXISTS history (id INTEGER PRIMARY KEY AUTOINCREMENT, address TEXT);"
    );
  } catch (error) {
    console.error("❌ SQLite setup error:", error);
  }
};

export const saveAddress = async (address) => {
  if (!db) return;
  try {
    await db.runAsync(
      "INSERT INTO history (address) VALUES (?);",
      [address]
    );
    console.log("✅ Osoite tallennettu!");
  } catch (error) {
    console.error("❌ Insert Error:", error);
  }
};

export const fetchAddresses = async () => {
  if (!db) return [];
  try {
    const result = await db.getAllAsync("SELECT * FROM history ORDER BY id DESC;");
    return result;
  } catch (error) {
    console.error("❌ Fetch Error:", error);
    return [];
  }
};

export const deleteAddress = async (id) => {
  if (!db) return;
  try {
    await db.runAsync("DELETE FROM history WHERE id = ?;", [id]);
    console.log("✅ Osoite poistettu!");
  } catch (error) {
    console.error("❌ Delete Error:", error);
  }
};

export const clearHistory = async () => {
  if (!db) return;
  try {
    await db.runAsync("DELETE FROM history;");
    console.log("🧹 Historia tyhjennetty");
  } catch (error) {
    console.error("❌ Clear Error:", error);
  }
};