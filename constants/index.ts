export const headerLinks = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Profile',
    route: '/profile',
  },
  {
    label: 'Create Event',
    route: '/events/create',
  },
  {
    label: 'About Us',
    route: '/about',
  },
  {
    label: 'Blog',
    route: '/blog',
  },
  {
    label: 'FAQ',
    route: '/faq',
  },
  {
    label: 'Contact',
    route: '/contact',
  },
]

export const eventDefaultValues = {
  title: '',
  description: '',
  location: '',
  imageUrl: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: '',
  price: '',
  isFree: false,
  url: '',
}
