import Link from 'next/link'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { FaEnvelope, FaWhatsapp } from 'react-icons/fa6'

import { mockLinks } from '@/mocks/mockLinks'

export function Footer() {
  const { address, email, phone, whatsapp } = mockLinks

  return (
    <footer className="w-full flex justify-center bg-[#393939]">
      <div className="w-full max-w-screen-xl px-4 xl:px-0 py-4 flex justify-between">
        <div className="flex flex-col gap-2 text-white">
          <Link
            href={address.link}
            target="_blank"
            className="text-sm lg:text-lg hover:scale-105 duration-300"
          >
            {address.text}
          </Link>
          <Link
            href={email.link}
            className="text-sm lg:text-lg hover:scale-105 duration-300"
          >
            Email: {email.text}
          </Link>
          <Link
            href={phone.link}
            className="text-sm lg:text-lg hover:scale-105 duration-300"
          >
            Telefone: {phone.text}
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={email.link}
            className="text-white hover:text-primary duration-300"
          >
            <FaEnvelope size={35} />
          </Link>
          <Link
            href={whatsapp.link}
            className="text-white hover:text-primary duration-300"
          >
            <FaWhatsapp size={35} />
          </Link>
          <Link
            href={address.link}
            className="text-white hover:text-primary duration-300"
          >
            <FaMapMarkerAlt size={35} />
          </Link>
        </div>
      </div>
    </footer>
  )
}
