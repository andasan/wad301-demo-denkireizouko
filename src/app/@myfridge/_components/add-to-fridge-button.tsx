import { useState } from "react";

import { addFridgeItemAction } from "@/actions/fridgeActions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useFridgeStore } from "@/providers/fridge-store-provider";
import { DocumentPlusIcon } from "@heroicons/react/20/solid";
import type { Prisma } from "@prisma/client";

export default function AddToFridgeButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { addToFridge } = useFridgeStore((state) => state);
  const { toast } = useToast();

  const handleAddToFridge = async (formData: FormData) => {
    const newFridgeItem: Prisma.FridgeItemCreateInput = {
      name: formData.get("name") as string,
      quantity: Number(formData.get("quantity")),
      price: Number(formData.get("price")),
      expiry: new Date(formData.get("expiry") as string),
    };

    const storedFridgeItem = await addFridgeItemAction(newFridgeItem);
    addToFridge(storedFridgeItem);

    setIsOpen(false);

    toast({
      title: "Item added to fridge",
      description: "You have successfully added the item to your fridge",
      variant: "default",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center bg-gray-300 px-5 transition hover:bg-green-500 hover:text-white rounded-md text-gray-600"
        >
          <DocumentPlusIcon className="h-[18px] w-[18px] peer-focus:text-gray-900 " />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={handleAddToFridge}>
          <DialogHeader>
            <DialogTitle>Add to my fridge</DialogTitle>
            <DialogDescription>
              Enter item details you want to add to your fridge.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Apples"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expiry" className="text-right">
                Expiry
              </Label>
              <Input
                id="expiry"
                name="expiry"
                type="date"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-green-500 hover:bg-green-700">
              Add To Fridge
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
