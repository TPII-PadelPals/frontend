"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BusinessAddForm } from "@/components/BusinessAddForm";
import { Business } from "@/app/services/business-service";
import useBusinessEdit from "@/hooks/businesses/useBusinessEdit";
// import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

interface EditBusinessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  businessToEdit: Business | null;
}

export function BusinessEdit({
  open,
  onOpenChange,
  businessToEdit,
}: EditBusinessDialogProps) {
//   const queryClient = useQueryClient();

  const { mutateEdit, isPendingEdit } = useBusinessEdit({
    onSuccess: () => {
      toast({
        variant: "success",
        description: "Establecimiento editado correctamente.",
      });
    //   queryClient.invalidateQueries(["businesses"]);
      onOpenChange(false);
    },
  });

  if (!businessToEdit) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Establecimiento</DialogTitle>
        </DialogHeader>
        {isPendingEdit && (
          <div className="mb-4 text-blue-600">Cargando...</div>
        )}
        <BusinessAddForm
        //   defaultValues={businessToEdit}
          onSubmit={(data) =>
            mutateEdit({ ...data, business_public_id: businessToEdit.business_public_id })
          }
          onClose={() => onOpenChange(false)}
        //   isEditMode
        />
      </DialogContent>
    </Dialog>
  );
}
