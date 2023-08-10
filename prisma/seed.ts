import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const colorData : Prisma.ColorCreateInput[] = [
  {
    name:"Beyaz"
  },
  {
     name:"Sarı"
  }
]

const brandData : Prisma.BrandCreateInput[] = [
  {
    name:"Elegant Lixury",
  },
  {
    name:"Elegant Clasic"
  }
]
async function main() {
  console.log(`Start seeding ...`)
  for (const c of colorData) {
    const color = await prisma.color.create({
      data: c
    })
  }
  for (const c of brandData) {
    const color = await prisma.brand.create({
      data: c
    })
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
