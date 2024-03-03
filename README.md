PGAdmin available on http://localhost:8888/browser/
db runs on http://localhost:5432/

to start project you need to setup docker on you computer
the run commmands:

- docker compose up
- npx prisma generate
- npx prisma migrate dev --name init
- npm run dev

create .env file

NODE_ENV="development"
GITHUB_ID=""
GITHUB_SECRET=""
NEXTAUTH_SECRET="randomstring"
NEXTAUTH_URL_INTERNAL="http://localhost:3000"
POSTGRES_PRISMA_URL="postgresql://user-name:strong-password@localhost:5432/webapp_dev"
POSTGRES_URL_NON_POOLING="postgresql://user-name:strong-password@localhost:5432/webapp_dev"

curl -X GET "http://localhost:3000/api/items?id=123&type=json"

json_content=$(cat "/Users/jurecurk/Downloads/data (18).json" | base64)

curl -X POST http://localhost:3000/api/shoppingList/28 \
-H "Content-Type: application/json" \
-d '{
"file": "'"$json_content"'"
}'

json_content=$(cat "/Users/jurecurk/Desktop/myproject/shoppinglist.json" | base64)
authorization_token="eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..6aH5HptK3WaMnEqS.oCfeySzGDDwJGfz8F2uPYJZ3oWJa2I7q-PQCSZDfrP1VoviGgDluiTCbmoBYaOmoty-gOR2jmzim-aJ1q7shioWqvjEe9_r8lTVrX1kmKCU1MQQunxZC02TwSuUYpYj23oaoY39DHSk7mpE7bCQT8cuY1f-QVbZmjR9HlydzGfbR_BwCFATuISjntuxvwMt-IHdYg4Nd5ayRtLBm8YPgBQXUJ44XCfnIHiBgb3baWGaZfhHRVmiTcHyL2nK_BHE-ZqXPJ-V8iUE5vWi0K8gbxZa1xNbtRptjkRCfplBsKliXtr1Vp1yYpLViDCg0WwOT9VjpQLV6uuTXirR47xRd4AKm8R_w6SOOgkSRwL4cw-LurVQY86ISEoHpTVgjWBHwP6yT7bJDCgHp19lnmo0gGW2ac_6-9VrGU87kOtaY56ecGTSK1sep_2M8xWiY2hezrzTOI0KWcrBR.GotVvhU4iSdZRQ_zNoZ6mA"

curl -X POST http://localhost:3000/api/shoppingList/30 \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $authorization_token" \
-d '{
  "file": "'"$json_content"'"
}'
