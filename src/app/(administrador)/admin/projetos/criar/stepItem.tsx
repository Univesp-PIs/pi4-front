import { addDays, format, isValid, parseISO } from 'date-fns'
import { FC, useEffect, useState } from 'react'
import { CgCloseO } from 'react-icons/cg'
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
} from 'react-icons/fa6'

import { IResponseGetProject, ITimeline } from '@/@types/project'
import { IResponseListStatus } from '@/@types/status'
import { mockProgress } from '@/mocks/mockProgress'

interface DraggableProps {
  step: IResponseGetProject['timeline'][0]
  index: number
  moveLeft: () => void
  moveRight: () => void
  removeStep: (index: number) => void
  setDataApiProject: (data: IResponseGetProject) => void
  dataApiProject: IResponseGetProject
  dataListStatus: IResponseListStatus[] | undefined
}

export const DraggableItemComponent: FC<DraggableProps> = ({
  step,
  index,
  moveLeft,
  moveRight,
  removeStep,
  setDataApiProject,
  dataApiProject,
  dataListStatus,
}) => {
  const initialDate = isValid(new Date(step.ranking.last_update))
    ? format(addDays(new Date(step.ranking.last_update), 1), 'yyyy-MM-dd')
    : ''

  const [date, setDate] = useState(initialDate)

  useEffect(() => {
    setDate(initialDate)
  }, [initialDate])

  return (
    <li className="flex flex-row md:flex-col items-start md:items-center gap-4">
      <div className="flex-col gap-8 justify-normal h-full w-fit flex md:hidden text-black">
        <h3 className="text-xl font-bold">
          Etapa<span className="text-red-500 font-bold"> *</span>
        </h3>
        <h3 className="text-xl font-bold">
          Status<span className="text-red-500 font-bold"> *</span>
        </h3>
        <h3 className="text-xl font-bold">Data</h3>
        <h3 className="text-xl font-bold">Descrição da etapa</h3>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <select
          className="p-2 border border-gray-300 rounded-md font-bold outline-none"
          value={step.ranking?.condition?.id ?? '0'}
          onChange={(e) => {
            const updateStep = {
              ranking: {
                ...step.ranking,
                condition: {
                  ...step.ranking.condition,
                  id: Number(e.target.value),
                },
              },
            }
            const newTimeline = dataApiProject.timeline
            newTimeline[index] = updateStep
            setDataApiProject({
              ...dataApiProject,
              timeline: newTimeline,
            })
          }}
        >
          <option value="0" className="font-bold" disabled>
            Selecione uma opção
          </option>
          {dataListStatus
            ?.filter((status) => status.status === true)
            .map((status) => (
              <option value={status.id} className="font-bold" key={status.id}>
                {status.name}
              </option>
            ))}
        </select>

        <select
          className="p-2 border border-gray-300 rounded-md font-bold outline-none"
          value={step.ranking.note ?? ''}
          onChange={(e) => {
            const newStep = {
              ...step,
              ranking: {
                ...step.ranking,
                note: e.target.value,
              },
            }
            const newTimeline = dataApiProject.timeline
            newTimeline[index] = newStep as ITimeline
            setDataApiProject({
              ...dataApiProject,
              timeline: newTimeline,
            })
          }}
        >
          <option value="" className="font-bold" disabled>
            Selecione uma opção
          </option>

          {mockProgress.map((progress) => (
            <option
              value={progress.type}
              className="font-bold"
              key={progress.type}
            >
              {progress.text}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="p-2 border border-gray-300 rounded-md font-bold outline-none w-full"
          value={date}
          onChange={(e) => {
            const newDate = e.target.value
            setDate(newDate)

            // Verifica se o valor do input é uma data válida antes de atualizar o estado global
            const parsedDate = parseISO(newDate)
            if (isValid(parsedDate)) {
              const newStep = {
                ...step,
                ranking: {
                  ...step.ranking,
                  last_update: newDate,
                },
              }
              const newTimeline = dataApiProject.timeline
              newTimeline[index] = newStep
              setDataApiProject({
                ...dataApiProject,
                timeline: newTimeline,
              })
            }
          }}
        />

        <textarea
          placeholder="Descrição"
          value={step.ranking.description}
          onChange={(e) => {
            const newStep = {
              ...step,
              ranking: {
                ...step.ranking,
                description: e.target.value,
              },
            }
            const newTimeline = dataApiProject.timeline
            newTimeline[index] = newStep
            setDataApiProject({
              ...dataApiProject,
              timeline: newTimeline,
            })
          }}
          rows={4}
          className="p-2 border border-gray-300 rounded-md font-bold outline-none w-full"
        />

        <div className="flex w-full justify-between">
          <CgCloseO
            size={30}
            className="cursor-pointer hover:scale-105 duration-300"
            onClick={() => removeStep(index)}
          />
          <div className="flex gap-4 items-center">
            {index !== 0 && (
              <button
                type="button"
                onClick={moveLeft}
                disabled={index === 0}
                className="hover:scale-110 duration-300"
              >
                <FaArrowLeft size={25} className="hidden md:block" />
                <FaArrowUp size={25} className="block md:hidden" />
              </button>
            )}
            {index !== dataApiProject.timeline.length - 1 && (
              <button
                type="button"
                onClick={moveRight}
                className="hover:scale-110 duration-300"
              >
                <FaArrowRight size={25} className="hidden md:block" />
                <FaArrowDown size={25} className="block md:hidden" />
              </button>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}
