import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type ConfirmSubmitModalProps = {
  open: boolean
  submitting: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export default function ConfirmSubmitModal({
  open,
  submitting,
  onOpenChange,
  onConfirm,
}: ConfirmSubmitModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>

          <AlertDialogDescription>
            You cannot change your answers after submission.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={submitting}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={submitting}
            onClick={onConfirm}
            className="bg-green-600 hover:bg-green-700"
          >
            {submitting ? "Submitting..." : "Yes, Submit"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
