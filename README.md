PGAdmin available on http://localhost:8888/browser/ -> db credentials are provided in POSTGRES_PRISMA_URL url
db runs on http://localhost:5432/

create .env file

NODE_ENV="development"
GITHUB_ID=""
GITHUB_SECRET=""
NEXTAUTH_SECRET="randomstring"
NEXTAUTH_URL_INTERNAL="http://localhost:3000"
POSTGRES_PRISMA_URL="postgresql://user-name:strong-password@localhost:5432/webapp_dev"
POSTGRES_URL_NON_POOLING="postgresql://user-name:strong-password@localhost:5432/webapp_dev"

to start project you need to run docker on you computer
then run commmands:

- npm install
- docker compose up
- npx prisma generate
- npx prisma migrate dev
- npm run dev

make sure that when importing json file on shopping list, has content formated like json code below:

[
{
"name": "mleko-brez-laktoe",
"status": "ACTIVE"
},
{
"name": "jajca",
"status": "COMPLETED"
},
{
"name": "maslo",
"status": "ACTIVE"
},
{
"name": "sok",
"status": "COMPLETED"
},
{
"name": "coca-cola",
"status": "COMPLETED"
},
{
"name": "voda",
"status": "COMPLETED"
}
]

shoppinglist,.json file is provided in the root of the project..

CLI file IMPORT

- JSON file has to be formated like a file inside project root shoppinglist.json
- AUTH_TOKEN is found inside browser cookies under name "next-auth.session-token"
- JSON_FILE_BASE64 copy json file path, in my case /Users/jurecurk/Downloads/data.json
- Copy and past code below into terminal/also replace variables

  //from here

  JSON_FILE_BASE64=$(cat "/Users/jurecurk/Desktop/myproject/myproject-auth/shoppinglist.json" | base64)
  AUTH_TOKEN="eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..Jl0tCrA8ILDzXruY.EKfXrm7H7AfUg4tsdwae3fNEyUbACfSSvdNBczjXAAqt3BLN1UxuqDqulWyzYRGHHc7qD0NEUxrAXenimL9VluxpKYrE2DCJQdJ6ekIVBRw30jYNZX2iW0SGltv7_gQh0MBeiJ1aiSkJZQei2myxEg2KAXPH0QkTG2F-40dQoktF70rNjM0ry-ynovCSbiAWcaXTuMkMdH33xUhZgEnxXBdGodf9EQ0fjsm1hKZtgLIthbmjazlQq6HsOPtUoL7t4ajPj_pr6h02kOAgM7M1yuQU-NcC2CL_ZbuPBiP3A7y1FnH7X1PvBl30U-vyDa2PPDdZHNpXRndxmM-NWi1FSg96XjY_LrxhVKkR6Guon0Qt2GVdmr79zP84pNah-5PrLPKIegIgJQOakKBz2sxfqBoTV4qP08VASjqwtn5b6wVJF-6-JBmuoTolENnVWwuLeG147IguZDE.k5jHcwyVV_QMYX9daiyuDw"

curl -X POST http://localhost:3000/api/shoppingList/3 \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer $AUTH_TOKEN" \
  -d '{
    "file": "'"$JSON_FILE_BASE64"'"
}'

// to here

CLI file EXPORT

curl -X GET "http://localhost:3000/api/items?id=3&type=json" -H "Authorization: Bearer $AUTH_TOKEN" -o response.json

file is found in the root of the project

PS

- Prva verzija ima samo "en spisek” (one list for all users), ki ga vsi urejajo. Ne omogoča več nakupovalnih listkov.
  naredil sem drugo verzijo :D sepravi več listkov in novega lahko odpreš, šele ko so vsi prejšnji nakupovalni listki označeni kot COMPLETED..
