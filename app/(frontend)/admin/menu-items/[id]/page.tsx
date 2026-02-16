"use client";

import { useParams } from "next/navigation";
import { DynamicShadcnForm } from "@/app/(frontend)/components/reusables/dynamicform/dynamicform";
import { useAllCategories } from "../hooks/usegetallcategories";
import { useUpdateMenuItem } from "../hooks/useupdatemenuItem";
import { useGetMenuItemById } from "../hooks/usegetmenuitembyid";
import { useUploadMenuItemImages } from "../hooks/useuploadmenuItemimages";
import { getEditMenuItemFields } from "./fields";
import { useDeleteMenuItemImage } from "../hooks/usedeletemenuitemimage ";

export default function EditMenuItemPage() {
  const { id } = useParams<{ id: string }>();
  const { data: menuItemData, isLoading, refetch } = useGetMenuItemById(id);
  const { data: categories = [] } = useAllCategories();
  const { mutate: updateMenuItem } = useUpdateMenuItem();
  const { mutate: uploadImages } = useUploadMenuItemImages();
  const { mutate: deleteImage } = useDeleteMenuItemImage();

  if (isLoading) return <div className="p-6">Loading menu item...</div>;
  if (!menuItemData) return <div className="p-6">Menu item not found</div>;

  // ================== CALLBACKS ==================
  const handleDeleteImage = (imageId: string) => {
      deleteImage( { menuItemId: menuItemData.id, imageId },
    {
      onSuccess: () => refetch(), // refresh images after deletion
    });
    };

  const handleUploadImage = (files: File[]) => {
   if (!files.length) return;
    uploadImages(
      {
        menuItemId: menuItemData.id,
        image: files,
      },
      {
        onSuccess: () => refetch(), // refresh after upload
      }
    );
  };

  const fields = getEditMenuItemFields(
    categories,
    menuItemData.images || [],
    handleDeleteImage,
    handleUploadImage
  );

  return (
    <div className="space-y-6 m-6">
      <h1 className="text-2xl font-bold">Edit Menu Item</h1>

      <DynamicShadcnForm
        key={menuItemData.id}
        fields={fields}
        showreset={false}
        reset="reset"
        cardTitle="Edit Menu Item"
        submitLabel="Update Item"
        defaultvalues={{
          title: menuItemData.title,
          description: menuItemData.description,
          price: menuItemData.price,
          categoryId: menuItemData.category.id,
          status: menuItemData.available,
          image: [],
        }}
        onSubmit={(data) => {
         updateMenuItem({
            id: menuItemData.id,
            title: data.title,
            description: data.description,
            price: data.price,
            categoryId: data.categoryId,
            status: data.status,
          });
        }}
      />
    </div>
  );
}
