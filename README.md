### Booting Server
## extremely rough
requirements: node, postgresql
assuming postgres was downloaded via homebrew
1. `npm i`
2. `brew services start postgresql`
3. In your terminal run `createuser -s postgres`
4. `psql -U postgres` followed by `CREATEDATABASE eclipse` (make sure dburl is correct)
5. navigate to the `api/` directory and run `npm run start`