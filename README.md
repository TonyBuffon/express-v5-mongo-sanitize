# express-5-mongo-sanitize

A middleware for Express.js that sanitizes user input to prevent MongoDB operator injection attacks. This package helps secure your Express applications by removing MongoDB operators from user input before they reach your database queries.

## Installation

```bash
npm install express-v5-mongo-sanitize
```

## Usage

```javascript
import express from "express";
import { sanitizeMongoInput } from "express-5-mongo-sanitize";

const app = express();

// Parsing your body
app.use(express.json());

// Apply the middleware
app.use(sanitizeMongoInput);

// Your routes and other middleware
app.get("/api/users", (req, res) => {
  // Your route handler
});
```

## What it does

This middleware sanitizes the following MongoDB operators from user input:

- `$`
- `$gt`
- `$gte`
- `$lt`
- `$lte`
- `$ne`
- `$nin`
- `$or`
- `$and`
- `$not`
- `$nor`
- `$exists`
- `$type`
- `$expr`
- `$text`
- `$regex`
- `$where`
- `$mod`
- `$all`
- `$elemMatch`
- `$size`
- `$bitsAllSet`
- `$bitsAnySet`
- `$bitsAllClear`
- `$bitsAnyClear`

## Why use it?

MongoDB operator injection is a security vulnerability that occurs when user input containing MongoDB operators is directly used in database queries. This can lead to unauthorized data access or manipulation. This middleware helps prevent such attacks by sanitizing the input before it reaches your database queries.

## Example

Without sanitization:

```javascript
// User input: { "username": { "$gt": "" } }
// This could return all users in the database
const user = await User.findOne(req.body);
```

With sanitization:

```javascript
// User input: { "username": { "$gt": "" } }
// After sanitization: { "username": { "gt": "" } }
// This will look for a user with username "gt": ""
const user = await User.findOne(req.body);
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
