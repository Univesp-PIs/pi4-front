'use client'

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'
import { Fragment } from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import { FaRegCircle } from 'react-icons/fa'
import { HiOutlineCheckCircle, HiOutlineRefresh } from 'react-icons/hi'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Button } from '@/components/Button'

import { SkeletonDashboard } from './skeleton'
import { useDashboard } from './useDashboard'

export default function Dashboard() {
  const {
    isFetchingDashboard,
    isLoadingDashboard,
    isLoadingListProjects,
    dataDashboard,
    yearsProject,
    filterSelected,
    router,
    projectsOptions,
    refetchDashboard,
    setFilterSelected,
  } = useDashboard()

  if (isLoadingListProjects || isLoadingDashboard) return <SkeletonDashboard />

  return (
    <section className="w-full flex justify-center">
      <div className="w-full max-w-screen-xl px-4 xl:px-0 py-4 lg:py-20 flex flex-col gap-4">
        <div className="w-full h-full flex gap-4">
          <div className="w-full h-full flex flex-col gap-4 items-start">
            <div className="flex gap-4 items-center">
              <h3 className="text-lg font-semibold">Projetos entregues</h3>
              <select
                className="p-2 border border-gray-300 rounded-md font-bold outline-none w-fit cursor-pointer"
                value={filterSelected.year}
                onChange={(e) =>
                  setFilterSelected((prev) => ({
                    ...prev,
                    year: Number(e.target.value),
                  }))
                }
              >
                {yearsProject.map((year) => (
                  <option key={year} value={year} className="cursor-pointer">
                    {year}
                  </option>
                ))}
              </select>
            </div>
            {dataDashboard?.delivery_projects?.data.length === 0 ? (
              <div className="w-full h-full flex justify-center items-center">
                <p className="text-gray-500">Nenhum dado encontrado</p>
              </div>
            ) : (
              <ResponsiveContainer height={400}>
                <LineChart
                  width={800}
                  height={400}
                  data={dataDashboard?.delivery_projects?.data ?? []}
                >
                  <Line
                    type="monotone"
                    name="Projetos"
                    dataKey="count"
                    stroke="#1C199D"
                    activeDot={{ r: 8 }}
                  />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="monthName" />
                  <YAxis dataKey="count" />
                  {/* começar com a primeira letra maiuscula */}
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
          <div className="w-full h-full flex flex-col gap-4 items-start">
            <div className="flex gap-4 items-center relative">
              <h3 className="text-lg font-semibold">Estimado x Custo</h3>
              <Listbox
                as="div"
                value={filterSelected.projectsIds}
                onChange={(selected) =>
                  setFilterSelected({
                    ...filterSelected,
                    projectsIds: selected,
                  })
                }
                multiple
              >
                <ListboxButton className="p-2 border border-gray-300 rounded-md font-bold outline-none w-fit bg-white">
                  {filterSelected.projectsIds.length === 0
                    ? 'Selecione os projetos'
                    : projectsOptions
                        .filter((p) =>
                          filterSelected.projectsIds.includes(p.id),
                        )
                        .map((p) => p.name)
                        .join(', ')}
                </ListboxButton>
                <ListboxOptions className="absolute z-50 mt-1 max-h-60 w-fit overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {projectsOptions.map((project) => (
                    <ListboxOption
                      key={project.id}
                      value={project.id}
                      as={Fragment}
                    >
                      {({ active, selected }) => (
                        <li
                          className={`list-none flex items-center cursor-pointer select-none relative py-2 pl-3 pr-4 ${
                            active
                              ? 'bg-blue-100 text-blue-900'
                              : 'text-gray-900'
                          }`}
                        >
                          <span className="mr-2">
                            {selected ? (
                              <HiOutlineCheckCircle
                                className="text-blue-600"
                                size={20}
                              />
                            ) : (
                              <FaRegCircle
                                className="text-gray-300"
                                size={20}
                              />
                            )}
                          </span>
                          <span
                            className={`block truncate ${
                              selected ? 'font-bold' : 'font-normal'
                            }`}
                          >
                            {project.name}
                          </span>
                        </li>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            </div>
            {dataDashboard?.cost?.data.length === 0 ? (
              <div className="w-full h-full flex justify-center items-center">
                <p className="text-gray-500">Nenhum dado encontrado</p>
              </div>
            ) : (
              <ResponsiveContainer height={400}>
                <BarChart
                  width={600}
                  height={300}
                  data={dataDashboard?.cost?.data}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Legend />
                  <Bar
                    dataKey="cost_estimate"
                    barSize={30}
                    fill="#ED7B12"
                    name="Custo estimado"
                  />
                  <Bar
                    dataKey="current_cost"
                    barSize={30}
                    fill="#1C199D"
                    name="Custo atual"
                  />
                  <Tooltip
                    cursor={{
                      fill: '#ccc',
                      fillOpacity: 0.5,
                      strokeOpacity: 0.5,
                    }}
                    formatter={(value) =>
                      Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(value as number)
                    }
                    labelFormatter={(label) => {
                      const project = dataDashboard?.cost?.data.find(
                        (project) => project.name === label,
                      )
                      return `${project?.project.name}`
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center">
          <div className="flex items-start gap-4 h-full justify-center shadow-xl hover:shadow-2xl duration-300 p-4 rounded-md">
            <CircularProgressbar
              strokeWidth={8}
              value={dataDashboard?.percentage_projects_delivered?.value ?? 0}
              styles={buildStyles({
                pathColor: '#1C199D', // Cor do progresso
                trailColor: '#eee', // Cor do fundo
                textColor: '#1C199D', // Cor do texto (se usar)
              })}
            />
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-3xl">
                {dataDashboard?.percentage_projects_delivered?.value}%
              </h3>
              <p>Projetos entregues no prazo</p>
            </div>
          </div>
          <div className="flex items-start gap-4 h-full justify-center shadow-xl hover:shadow-2xl duration-300 p-4 rounded-md flex-col">
            <h3 className="font-bold text-3xl">
              {dataDashboard?.average_time_project?.value.current_days &&
              dataDashboard?.average_time_project?.value.current_days < 0
                ? 0
                : (dataDashboard?.average_time_project?.value.current_days.toFixed(
                    0,
                  ) ?? 0)}{' '}
              (dias)
            </h3>
            <p>Tempo médio para finalizar um projeto</p>
          </div>
          <div className="w-full flex justify-center">
            <HiOutlineRefresh
              size={100}
              title="Atualizar Dashboard"
              className={`cursor-pointer ${isFetchingDashboard || isLoadingListProjects ? 'animate-spin' : ''}`}
              onClick={() => refetchDashboard()}
            />
          </div>
          <div className="flex items-start gap-4 h-full justify-center shadow-xl hover:shadow-2xl duration-300 p-4 rounded-md flex-col">
            <h3 className="font-bold text-3xl">
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(
                dataDashboard?.average_project_cost?.value.current_cost ?? 0,
              )}
            </h3>
            <p>Custo médio de um projeto</p>
          </div>
          <div className="flex items-start gap-4 h-full justify-center shadow-xl hover:shadow-2xl duration-300 p-4 rounded-md">
            <CircularProgressbar
              strokeWidth={8}
              value={dataDashboard?.percentage_project_cost?.value ?? 0}
              styles={buildStyles({
                pathColor: '#1C199D', // Cor do progresso
                trailColor: '#eee', // Cor do fundo
                textColor: '#1C199D', // Cor do texto (se usar)
              })}
            />
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-3xl">
                {dataDashboard?.percentage_project_cost?.value ?? 0}%
              </h3>
              <p>Projetos dentro do custo</p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center pt-8">
          <Button
            type="button"
            variant="primary"
            onClick={() => router.push('/admin/projetos')}
            title="Ver projetos"
          />
        </div>
      </div>
    </section>
  )
}
