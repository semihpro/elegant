# Project Steps

Rename dev.env file to .env file. After that, fill variables inside of .env file with your information.
I used pnpm on this project. Use pnpm commands and install requirements. Use command ( npx prisma migrate dev --name init)
Project all configurations are now ready to work. Use "npm run dev" and ready!

# migration operations

for making migration to database through prisma, you can use below sample code
npx prisma migrate dev --name product-image-paths
