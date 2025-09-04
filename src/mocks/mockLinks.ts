interface IMockLinks {
  facebookURL: string
  instagramURL: string
  address: {
    link: string
    text: string
  }
  whatsapp: {
    link: string
    text: string
  }
  phone: {
    link: string
    text: string
  }
  email: {
    link: string
    text: string
  }
  website: string
}

export const mockLinks: IMockLinks = {
  facebookURL:
    'https://www.facebook.com/profile.php?id=100093058455526&mibextid=ZbWKwL',
  instagramURL: 'https://www.instagram.com/engsolempresasolar',
  address: {
    link: 'https://maps.app.goo.gl/Ze8wuKNaE19iJq5r6',
    text: 'Av. Dr. Paulo de Moraes, 374 - Paulista, Piracicaba - SP, 13400-853',
  },
  whatsapp: {
    link: 'https://wa.me/+5519999109020',
    text: '(19) 99910-9020',
  },
  phone: {
    link: 'tel:+5501933756950',
    text: '(19) 3375-6950',
  },
  email: {
    link: 'mailto:comercial@engsol.com.br',
    text: 'comercial@engsol.com.br',
  },
  website: 'https://www.engsol.com.br',
}
