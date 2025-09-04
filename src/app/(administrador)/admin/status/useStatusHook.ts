import { useRouter } from 'next/navigation'
import { FormEvent, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { IResponseListStatus } from '@/@types/status'
import { AdminContext } from '@/contexts/AdminContext'
import { useCreateStatus } from '@/hooks/status/createStatus'
import { useListStatus } from '@/hooks/status/listStatus'
import { useUpdateStatus } from '@/hooks/status/updateStatus'

export function useStatusHook() {
  const { setTitleHeader } = useContext(AdminContext)
  const [newStatus, setNewStatus] = useState('')
  const [status, setStatus] = useState<IResponseListStatus[]>([])

  useEffect(() => {
    setTitleHeader('Listar e criar status')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Estado para controlar o novo nome de status
  const router = useRouter()

  const {
    data: dataListStatus,
    isLoading: isLoadingListStatus,
    error: errorListStatus,
    // isFetching: isFetchingListStatus,
    // refetch: refetchListStatus,
  } = useListStatus()

  const {
    mutateAsync: mutateUpdateStatus,
    isPending: isPendingUpdateStatus,
    variables: variablesUpdateStatus,
  } = useUpdateStatus()

  const { mutateAsync: mutateCreateStatus, isPending: isPendingCreateStatus } =
    useCreateStatus()

  useEffect(() => {
    if (dataListStatus) {
      setStatus(dataListStatus)
    }
  }, [dataListStatus])

  async function SubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!newStatus || newStatus.trim() === '') {
      toast.error('Nome do status é obrigatório')
      return
    }

    await mutateCreateStatus(newStatus)

    setNewStatus('')
  }

  async function UpdateStatus(id: number) {
    const statusUpdated = status.find((item) => item.id === id)

    if (!statusUpdated) {
      toast.error('Status não encontrado')
      return
    }

    if (!statusUpdated.name || statusUpdated.name.trim() === '') {
      toast.error('Nome do status é obrigatório')
      return
    }

    await mutateUpdateStatus({
      id: statusUpdated.id,
      name: statusUpdated.name,
      status: statusUpdated.status,
    })
  }

  return {
    UpdateStatus,
    SubmitForm,
    router,
    status,
    setStatus,
    newStatus,
    setNewStatus,
    isLoadingListStatus,
    variablesUpdateStatus,
    errorListStatus,
    isPendingUpdateStatus,
    isPendingCreateStatus,
  }
}
