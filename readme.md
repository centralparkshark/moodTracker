
## Users
GET /users -> Shows all users
GET /users/?username=-> Shows user data for specific user

PATCH /users/:id -> Allows for the change of username (pre-specified in this version)

## Moods
GET /moods -> Shows all moods

## Journal
GET /journal -> Shows all journal entries
GET /journal/:id -> Shows specific journal entry
GET /journal?mood= -> Shows all journal entries that match that mood
GET /journal?username= -> Shows all of a specific user's posts

DELETE /journal/:id -> Delete specific journal entry
POST /journal/new -> Allows the creation of a new entry 

