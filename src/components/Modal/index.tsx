import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'
import { FaX } from 'react-icons/fa6'

import { Button } from '../Button'

interface ModalProps {
  button: ReactNode
  title: string
  description: string
  onConfirm: () => void
  isLoading?: boolean
}

export function ModalGeneric({
  button,
  title,
  description,
  onConfirm,
  isLoading = false,
}: ModalProps) {
  // const { isPending, mutateAsync } = useDeleteCurriculum()

  // function handleDelete() {
  //   mutateAsync({ userID, keyCurriculum })
  // }
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{button}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 z-20 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="overflow-y-auto z-30 flex flex-col gap-4 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[550px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-gray-200 p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]">
          <Dialog.Title className="text-black font-semibold text-xl">
            {title}
          </Dialog.Title>
          <Dialog.Description className="text-black">
            {description}
          </Dialog.Description>
          <div className="w-full flex gap-4">
            <Dialog.Close asChild>
              <Button variant="success" widthFull title="Não" />
            </Dialog.Close>
            <Dialog.Close asChild>
              <Button
                variant="error"
                widthFull
                onClick={onConfirm}
                isLoading={isLoading}
                title="Sim"
              />
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-primary p-2 hover:bg-primary hover:text-secondary focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none duration-100"
              aria-label="Close"
            >
              <FaX size={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
