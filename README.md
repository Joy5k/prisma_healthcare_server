For setup prisma project with postgresql follow this,

```
npm init -y
npm install prisma typescript ts-node @types/node ts-node-dev cors express @types/express bcrypt @types/bcrypt http-status zod jsonwebtoken @types/jsonwebtoken dotenv nodemailer @types/nodemailer multer @types/multer cloudinary cookie-parser @types/cookie-parser
npx tsc --init
npx prisma init



```

#### And find the tsconfig file where have rootDir and outDir.set the rootDir for

```
"rootDir": "./src"

and

"outDir": "./dist"

```

connect the project with database in env file

1. your name
2. password
   3.project name

### Generate random secret key

```
node
require('crypto').randomBytes(64).toString('hex')
```
