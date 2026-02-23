type PackageItemInput = {
  menuItemId: string
  quantity: number
}

export type CreatePackageBody = {
  name: string
  description?: string
  discount: number
  available?:boolean
  items: PackageItemInput[]
}
