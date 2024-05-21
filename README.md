#### Auth middleware for server

1. receive JWT via authorization header
2. Verify if JWT is valid (no expried , secretKey) by decoding jwt
3. check if the token exit in the DB, session table
4. extract email from the decoded jwt obj
5. Get user By email
6. if user exit, they are now authorized
