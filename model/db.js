

export function initDb(db) {
    let sql =  `CREATE TABLE todos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                task TEXT NOT NULL,
                creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
                due_date DATETIME,
                completion_date DATETIME
            )`;

    db.run(sql);
}

export function insertTestData(db) {
    let sql =  `INSERT INTO todos (task) VALUES ('wash the pig'), ('eat shoe'), ('soup');`;
    db.run(sql);
}

export function printTodos(db) {
    let sql =  `SELECT * FROM todos;`;
    db.each(sql, {}, (err, row) => console.log(row));
}