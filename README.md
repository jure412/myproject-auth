PGAdmin available on http://localhost:8888/browser/
db runs on http://localhost:5432/

to start project you need to setup docker on you computer
the run commmands:

- docker compose up
- npx prisma generate
- npx prisma migrate dev --name init
- npm run dev
