import { menuAdmin } from '@/@types/menu'

export const mockMenu: menuAdmin[] = [
  {
    id: 1,
    name: 'Projetos',
    link: '/admin/projetos',
  },
  {
    id: 2,
    name: 'Criar um projeto',
    link: '/admin/projetos/criar',
  },
  {
    id: 3,
    name: 'Listar e criar status',
    link: '/admin/status',
  },
  {
    id: 4,
    name: 'Dashboard',
    link: '/admin/dashboard',
  },
]
