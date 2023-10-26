let config = {
	// locateFile: filename => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.2.1/dist/sql-wasm.wasm`
	locateFile: filename => `/assets/sql-wasm.wasm`
}

// var baseDb;
// initSqlJs(config).then(function (SQL) {
// 	baseDb = new SQL.Database();
// });
const SQL = await initSqlJs({
	// Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
	// You can omit locateFile completely when running in node
	locateFile: filename => `/assets/sql-wasm.wasm`
});

let baseDb = new SQL.Database();

let sqlstr = "CREATE TABLE hello (a int, b char); \
INSERT INTO hello VALUES (0, 'hello'); \
INSERT INTO hello VALUES (1, 'world');";
baseDb.run(sqlstr); 

// Prepare a statement
const stmt = baseDb.prepare("SELECT * FROM hello WHERE a=:aval AND b=:bval");

// Bind values to the parameters and fetch the results of the query
const result = stmt.getAsObject({':aval' : 1, ':bval' : 'world'});
console.log(result); // Will print {a:1, b:'world'}


stmt.bind([0, 'hello']);
while (stmt.step()) console.log(stmt.get()); // Will print [0, 'hello']
// free the memory used by the statement
stmt.free();
// You can not use your statement anymore once it has been freed.
// But not freeing your statements causes memory leaks. You don't want that.


