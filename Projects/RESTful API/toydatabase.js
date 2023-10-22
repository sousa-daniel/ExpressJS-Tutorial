/**
 * Provides a list of random users with random properties (by now just username and postcode).
 * Each record in the database is uniquely identified by an ID.
 *
 * @class ToyDatabase
 * @param {number} numRecords - Number of DB records to play with (default: 10).
 *
 * @example
 * const ToyDatabase = require('./toydatabase');
 * const db = new ToyDatabase(50);
 * db.records.length
 * // 50
 * @example
 * let record = db.insert({ "whatever": 42 })
 * db.findById(record.id)
 * // {'whatever': 42, 'id': 11}
 * @example
 * db.updateById(record.id, { "whatever": 1 })
 * // {'whatever': 1, 'id': 11}
 * @example
 * db.deleteById(record.id)
 * // true
 * db.deleteById(record.id)
 * // false
 * @example
 * db.updateById(1234, { "hello": "yes" })
 * // false
 * db.updateById(1234, { "hello": "yes" }, true)
 * // {'hello': 'yes', 'id': 1234}
 * db.updateById(1, { "hello": "yes" }, true)
 * // Uncaught Error: A record with id 1 already exists, so createNew must be set to false.
 */
module.exports = function(numRecords=10) {

    // Helper function to select items at random from array.
    const randomChoice = (arr) => arr[Math.floor(arr.length * Math.random())];

    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const digits = '0123456789'.split('');

    const generate = (num) => {
        // Create a list of random users with random data (usernames and postcodes).
        let someData = [];
        for (let i = 0; i < num; i++) {
            let name = '', code = '';
            for (let j = 0; j < 6; j++) name += randomChoice(letters);
            for (let j = 0; j < 4; j++) code += randomChoice(digits);
            someData.push({id: i+1, username: name, postcode: code});
        }
        return someData;
    }

    const lastId = () => {
        // Get last available ID.
        this.records.sort((a,b) => b.id > a.id);
        return this.records.map(entry => entry.id).pop() + 1
    }

    /**
     * @method
     * @name ToyDatabase.insert
     * @param {object} data Whatever data to insert into the DB.
     * @returns {object} Inserted user data.
     */
    this.insert = (data) => {
        // Insert new record.
        // If a record ID is set, look it up in the database first.
        // But it may not exist, so double-check before updating.
        if (data.id && this.findById(data.id))
            return this.updateById(data.id, data);

        // By default we create new records from scratch,
        // so assign them the last available ID in the database.
        Object.assign(data, { 'id': lastId() });

        this.records.push(data);
        return data;
    }

    /**
     * @method
     * @name ToyDatabase.findById
     * @param {number} uid User ID.
     * @returns {mixed} User data or false if not found.
     */
    this.findById = (uid) => {
        // Get existing record by ID.
        for (let entry of this.records) {
            if (entry.id === uid) return entry;
        }
        // User not found.
        return false;
    }

    /**
     * @method
     * @name ToyDatabase.updateById
     * @param {number} uid User ID.
     * @param {object} data User data.
     * @param {boolean} createNew Flag to create a new record from scratch (default: false).
     * @returns {mixed} Updated user data or `false` if not found.
     */
    this.updateById = (uid, data, createNew=false) => {
        // Update an existing record.
        if (!data.id) Object.assign(data, { 'id': uid });

        // Allow creating a new record from scratch with a custom ID.
        if (createNew) {
            if (this.findById(uid))
                throw new Error(`A record with id ${uid} already exists, so createNew must be set to false.`);

            this.records.push(data);
            return data;
        }

        for (const [index, entry] of this.records.entries()) {
            if (entry.id === uid) {
                this.records[index] = data;
                return data;
            }
        }
        // User not found.
        return false;
    }

    /**
     * @method
     * @name ToyDatabase.deleteById
     * @returns {boolean} Result of the delete operation (true if success, false otherwise).
     */
    this.deleteById = (uid) => {
        // Delete an existing record.
        for (const [index, entry] of this.records.entries()) {
            if (entry.id === uid) {
                this.records.splice(index, 1);
                return true;
            }
        }
        // User not found.
        return false;
    }

    /**
     * List of DB records.
     * Initially populated with the number of records indicated in the constructor.
     * @name ToyDatabase#records
     * @type array
     * @example
     * const db = new ToyDatabase();
     * db.records.length
     * // 10
     */
    this.records = generate(numRecords);
}
