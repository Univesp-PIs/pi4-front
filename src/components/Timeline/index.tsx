'use client'

import { format, parse, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { FaCheckCircle } from 'react-icons/fa'
import { FaRegHourglassHalf } from 'react-icons/fa6'
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component'

import { IResponseGetProject } from '@/@types/project'
import { mockProgress } from '@/mocks/mockProgress'

const iconProgress = {
  done: <FaCheckCircle size={50} />,
  'in progress': (
    <FaRegHourglassHalf
      size={50}
      className="animate-spin"
      style={{
        animationDuration: '5s',
      }}
    />
  ),
  waiting: (
    <AiOutlineLoading3Quarters
      size={50}
      className="animate-spin"
      style={{
        animationDuration: '5s',
      }}
    />
  ),
}

const colorsProgress = {
  done: '#00bf19',
  'in progress': '#FBEA4F',
  waiting: '#D9D9D9',
}

export function TimelineClient({
  data,
}: {
  data: IResponseGetProject | undefined
}) {
  if (!data) return

  if (!data.timeline.length) {
    return (
      <div className="w-full p-4 border rounded-md">
        Ainda não há nenhuma atualização do progresso
      </div>
    )
  }

  function formatDate(dateString: string) {
    let date

    // Verifica se a data está no formato `dd/MM/yyyy`
    if (dateString.includes('/')) {
      date = parse(dateString, 'dd/MM/yyyy', new Date())
    }
    // Caso contrário, considera o formato `yyyy-MM-dd`
    else {
      date = parseISO(dateString)
    }

    // Formata a data para `dd/MM/yyyy`
    return format(date, 'dd/MM/yyyy', { locale: ptBR })
  }

  return (
    <VerticalTimeline lineColor="#F1F1F1" className="customTimeline">
      {data.timeline.map((item, index) => {
        // Uso
        const formattedDate = formatDate(item.ranking.last_update)

        return (
          <VerticalTimelineElement
            key={index}
            visible
            contentStyle={{
              // background: '#F1F1F1',
              color: '#000',
            }}
            position="right"
            dateClassName="text-black"
            iconStyle={{
              background: colorsProgress[item.ranking.note],
              color: '#fff',
            }}
            icon={iconProgress[item.ranking.note]}
          >
            <div className="flex gap-4 justify-between w-full">
              <div className="flex flex-col">
                <span className="text-xl font-bold">
                  {item.ranking.condition.name}
                </span>
                <span className="text-lg font-semibold text-secondary">
                  (
                  {
                    mockProgress.find(
                      (progress) => progress.type === item.ranking.note,
                    )?.text
                  }
                  )
                </span>
                <span>{item.ranking.description}</span>
              </div>
              <div className="flex flex-col">
                <span>Atualizado em</span>
                <span className="text-xl font-bold">{formattedDate}</span>
              </div>
            </div>
          </VerticalTimelineElement>
        )
      })}
    </VerticalTimeline>
  )
}
