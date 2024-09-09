# Mood Tracker
## Description
Simple mood tracker social media that allows users to post a mood and a note. Created to demonstrate basic Express and routing functionalities. 

## Files

- Data > Contains data used throughout app for users, moods, and the journal posts.
- Public > Contains CSS File
- Routes > Contains the routes for each data type
    ### Users
    - GET /users -> Shows all users
    - GET /users/?username=-> Shows user data for specific user
    - PATCH /users/:id -> Allows for the change of username (pre-specified in this version)

    ### Moods
    - GET /moods -> Shows all moods

    ### Journal
    - GET /journal -> Shows all journal entries
    - GET /journal/:id -> Shows specific journal entry
    - GET /journal?mood= -> Shows all journal entries that match that mood
    - GET /journal?username= -> Shows all of a specific user's posts
    - DELETE /journal/:id -> Delete specific journal entry
    - POST /journal/new -> Allows the creation of a new entry 

- Views > Data and Journal create feed like scrolling wiht journal having the added capability of deleting the object. New Entry contains the form to make a new post. User shows a profile page for a user and allows for the editing of their username.
- Index.js is the main file.

## Contact
For questions or comments, please contact Vinncent Miller at [vinncentmiller@gmail.com].


