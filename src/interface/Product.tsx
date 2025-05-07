interface Product{
    id: string
    categoryId: string
    productName: string
    material: string
    size: string
    description: string | null
    availabilityStatus: boolean
    price: number
    unit: string
    discount: number
    createdAt: Date
    updatedAt: Date
    categoryName: string
    mainImage: string
    imageLinks: string[]
}