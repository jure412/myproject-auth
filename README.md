PGAdmin available on http://localhost:8888/browser/
db runs on http://localhost:5432/

to start project you need to setup docker on you computer
the run commmands:

- docker compose up
- npx prisma generate
- npx prisma migrate dev --name init
- npm run dev

NODE_ENV="development"
GITHUB_ID=""
GITHUB_SECRET=""
NEXTAUTH_SECRET="randomstring"
NEXTAUTH_URL_INTERNAL="http://localhost:3000"
POSTGRES_PRISMA_URL="postgresql://user-name:strong-password@localhost:5432/webapp_dev"
POSTGRES_URL_NON_POOLING="postgresql://user-name:strong-password@localhost:5432/webapp_dev"
