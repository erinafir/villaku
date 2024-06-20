/*
npx sequelize model:generate --name User --attributes username:string,email:string,password:string,role:string;
npx sequelize model:generate --name Location --attributes location:string;
npx sequelize model:generate --name UserProfile --attributes fullName:string,img_Url:string,phoneNumber:string;
npx sequelize model:generate --name Villa --attributes name:string,description:string,price:integer,img_Url:string,LocationId:integer
npx sequelize model:generate --name UserVilla --attributes UserId:integer,VillaId:integer;

npx sequelize migration:generate --name add-user-relation
npx sequelize migration:generate --name alter-default-role
npx sequelize migration:generate --name alter-foreign-key
//note: tambahin UserId di userprofile

npx sequelize seed:generate --name seed-users;
npx sequelize seed:generate --name seed-userprofiles;
npx sequelize seed:generate --name seed-location;
npx sequelize seed:generate --name seed-villa
*/

const express = require('express')
const Controller = require('./controllers/controller')
const app = express()
const port = 3000


app.set('view engine', 'ejs')
app.use(express.urlencoded ({extended: true}))

app.get('/', Controller.home)

app.listen(port, () => {
    console.log(`web berjalan di port ${port}`);
})