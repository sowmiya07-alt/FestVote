const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const fs = require('fs');
const path = require('path');

let dbInstance = null;

async function setupDatabase() {
  dbInstance = await open({
    filename: path.join(__dirname, '../database.sqlite'),
    driver: sqlite3.Database
  });

  const table = await dbInstance.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users'");

  if (!table) {
    console.log("Installing database tables for the first time via SQLite...");

    const schemaPath = path.join(__dirname, '../../database.sql');
    let sqlSchema = fs.readFileSync(schemaPath, 'utf8');

    // Remove all SQL comments completely so they don't interfere with parsing
    sqlSchema = sqlSchema.replace(/--.*$/gm, '');

    // Convert strict MySQL syntax into SQLite valid syntax
    sqlSchema = sqlSchema
      .replace(/INT AUTO_INCREMENT PRIMARY KEY/g, 'INTEGER PRIMARY KEY AUTOINCREMENT')
      .replace(/ENUM\([^)]+\)/g, 'VARCHAR(255)')
      .replace(/CREATE DATABASE IF NOT EXISTS[^;]+;/g, '')
      .replace(/USE [^;]+;/g, '')
      .replace(/ON DELETE CASCADE/g, '')
      .replace(/UNIQUE KEY unique_user_vote \(user_id, category_id\)/g, 'UNIQUE(user_id, category_id)');

    const statements = sqlSchema.split(';').map(s => s.trim()).filter(s => s.length > 0);

    for (let stmt of statements) {
      try {
        await dbInstance.run(stmt);
      } catch (err) {
        console.error('Migration notice:', err.message);
      }
    }
    console.log("SQLite schema and seed data loaded successfully!");
  } else {
    console.log("SQLite Engine Connected & Initialized!");
  }
}

setupDatabase();

module.exports = {
  execute: async (query, params = []) => {
    if (!dbInstance) {
      await setupDatabase();
    }

    const formattedQuery = query;

    if (query.trim().toUpperCase().startsWith('SELECT')) {
      const rows = await dbInstance.all(formattedQuery, params);
      return [rows];
    } else {
      const result = await dbInstance.run(formattedQuery, params);
      result.insertId = result.lastID;
      return [result];
    }
  }
};
