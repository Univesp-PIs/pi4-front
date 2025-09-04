'use client'

import {
  ControlledMenu,
  MenuItem,
  useClick,
  useMenuState,
} from '@szhsin/react-menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'

import { mockMenu } from '@/mocks/mockMenu'

export function MenuAdmin() {
  const ref = useRef(null)
  const [menuState, toggleMenu] = useMenuState({ transition: true })
  const anchorProps = useClick(menuState.state, toggleMenu)
  const pathname = usePathname()

  const handleItemClick = () => {
    // Fecha o menu
    toggleMenu(false)
    // Rola para o topo da página
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex gap-4 uppercase">
      <button
        title="Menu"
        type="button"
        ref={ref}
        {...anchorProps}
        className="w-full uppercase flex gap-2 items-center cursor-pointer bg-secondary text-white p-2 rounded-lg hover:scale-105 duration-300"
      >
        <RxHamburgerMenu size={30} />
      </button>

      <ControlledMenu
        {...menuState}
        anchorRef={ref}
        onClose={() => toggleMenu(false)}
        arrow
        gap={5}
        direction="left"
        className="flex flex-col"
        transition
      >
        {mockMenu.map((item) => {
          const isActive = item.link === pathname
          if (item.children && item.children.length > 0) {
            return (
              <ControlledMenu
                key={item.id}
                anchorRef={ref}
                arrow
                onClose={() => toggleMenu(false)}
                gap={5}
              >
                {item.children.map((subItem) => (
                  <MenuItem
                    className="uppercase"
                    key={subItem.id}
                    onClick={handleItemClick}
                  >
                    <Link href={subItem.link} className="w-full h-full">
                      {subItem.name}
                    </Link>
                  </MenuItem>
                ))}
              </ControlledMenu>
            )
          }
          return (
            <MenuItem
              className="uppercase"
              key={item.id}
              onClick={handleItemClick}
            >
              <Link
                href={item.link}
                className={`flex w-full uppercase hover:text-primary p-1 ${isActive && 'text-primary'}`}
              >
                {item.name}
              </Link>
            </MenuItem>
          )
        })}
      </ControlledMenu>
    </div>
  )

  //   return (
  //     <div className="flex gap-4 uppercase">
  //       <Menu
  //         menuButton={
  //           <MenuButton className="w-full uppercase flex gap-2 items-center cursor-pointer bg-secondary text-white p-2 rounded-lg hover:scale-105 duration-300">
  //             <RxHamburgerMenu size={30} />
  //           </MenuButton>
  //         }
  //         arrow
  //         gap={5}
  //         direction="left"
  //         className="flex flex-col"
  //         transition
  //       >
  //         {mockMenu.map((item) => {
  //           if (item.children && item.children.length > 0) {
  //             return (
  //               <Menu
  //                 key={item.id}
  //                 menuButton={
  //                   <MenuButton className="p-4 uppercase flex gap-2 items-center">
  //                     {item.name}
  //                     <IoIosArrowDown />
  //                   </MenuButton>
  //                 }
  //                 transition
  //               >
  //                 {item.children.map((subItem) => (
  //                   <MenuItem className="uppercase" key={subItem.id}>
  //                     <Link href={subItem.link} className="w-full h-full">
  //                       {subItem.name}
  //                     </Link>
  //                   </MenuItem>
  //                 ))}
  //               </Menu>
  //             )
  //           }
  //           return (
  //             <Link
  //               href={item.link}
  //               key={item.id}
  //               className="flex w-full uppercase hover:text-primary p-4"
  //             >
  //               {item.name}
  //             </Link>
  //           )
  //         })}
  //       </Menu>
  //     </div>
  //   )
  // }
}
