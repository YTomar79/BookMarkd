CREATE TABLE reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    net_score INTEGER DEFAULT 0
);

CREATE TABLE votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
Sure, here is the rest of the `schema.sql` and the entire project structure based on the current requirements.

### Database

#### `schema.sql`

SQL schema for your database:

```sql
CREATE TABLE reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    net_score INTEGER DEFAULT 0
);

CREATE TABLE votes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    review_id INTEGER NOT NULL,
    vote_type BOOLEAN NOT NULL,
    FOREIGN KEY (review_id) REFERENCES reviews(id)
);

