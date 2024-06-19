/*
npx sequelize model:generate --name User --attributes username:string,email:string,password:string,role:string;
npx sequelize model:generate --name Location --attributes location:string;
npx sequelize model:generate --name UserProfile --attributes fullName:string,img_Url:string,phoneNumber:string;
npx sequelize model:generate --name Villa --attributes name:string,description:string,price:integer,img_Url:string,LocationId:integer
npx sequelize migration:generate --name add-user-relation
npx sequelize migration:generate --name alter-default-role
npx sequelize migration:generate --name alter-foreign-key
//note: tambahin UserId di userprofile
*/