## How to run the app:
**Make an `.env` file. Please use the [`.env.example`](.env.example) as the reference.**
*Also make sure you got your mysql run*
```
npm install
npm run createdb
npm run migratedb
```

**Run this code:**
```
npm run dev
```
**Or,
Run these code if you want the optimal app:**
```
npm run build
npm run start
```

**See the API documentation [`http://localhost:3000/api-docs/`](http://localhost:3000/api-docs/).**