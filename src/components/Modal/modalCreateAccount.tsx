import * as Dialog from '@radix-ui/react-dialog'
import { FaX } from 'react-icons/fa6'

import { Button } from '../Button'
import { IUseModalCreateAccount } from './types'

export function ModalCreateAccount({
  errors,
  isSubmitting,
  onSubmit,
  register,
}: IUseModalCreateAccount) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className="w-full flex justify-center">
          <Button
            className="md:w-1/3"
            variant="primary"
            isLoading={isSubmitting}
            title="Criar conta"
            type="button"
          />
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 z-20 data-[s tate=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="overflow-y-auto z-30 flex flex-col gap-4 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[550px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-gray-200 p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]">
          <Dialog.Title className="text-black font-semibold text-xl">
            Digite o código de segurança
          </Dialog.Title>
          <Dialog.Description className="text-gray-600">
            Para criar uma nova conta, digite o código de segurança
          </Dialog.Description>
          <div className="w-full flex flex-col gap-4">
            <input
              {...register('code_security')}
              type="text"
              id="code"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Código de segurança"
            />
            <div className="flex gap-4 items-center">
              <Dialog.Close asChild>
                <Button
                  type="button"
                  variant="error"
                  widthFull
                  // onClick={onConfirm}
                  // isLoading={isLoading}
                  title="Cancelar"
                />
              </Dialog.Close>
              <Button
                onClick={onSubmit}
                isLoading={isSubmitting}
                variant="success"
                widthFull
                title="Confirmar"
                type="submit"
              />
            </div>
            {errors.code_security && (
              <p className="text-red-500 text-center md:text-left">
                {errors.code_security.message}
              </p>
            )}
            {errors.name && (
              <p className="text-red-500 text-center md:text-left">
                {errors.name.message}
              </p>
            )}
            {errors.password && (
              <p className="text-red-500 text-center md:text-left">
                {errors.password.message}
              </p>
            )}
            {errors.password_confirm && (
              <p className="text-red-500 text-center md:text-left">
                {errors.password_confirm.message}
              </p>
            )}
            {errors.email && (
              <p className="text-red-500 text-center md:text-left">
                {errors.email.message}
              </p>
            )}
          </div>
          <Dialog.Close asChild>
            <button
              type="button"
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
