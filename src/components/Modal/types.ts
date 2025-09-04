import { FieldErrors, UseFormRegister } from 'react-hook-form'

import { schemaCreateAccountProps } from '@/app/(administrador)/admin/criar-conta/useCreateAccount'

export interface IUseModalCreateAccount {
  isSubmitting: boolean
  onSubmit: () => void
  errors: FieldErrors<schemaCreateAccountProps>
  register: UseFormRegister<schemaCreateAccountProps>
}
