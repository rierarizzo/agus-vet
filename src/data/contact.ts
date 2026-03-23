export interface ContactInfo {
  address: string
  phone: string
  email: string
  hours: string
  sundayHours: string
  lat: number
  lng: number
}

export const contactInfo: ContactInfo = {
  address: 'Av. Principal 123, Ciudad',
  phone: '(555) 123-4567',
  email: 'contacto@agusvet.com',
  hours: 'Lun-Sáb: 8am - 8pm',
  sundayHours: 'Dom: 9am - 2pm (solo emergencias)',
  lat: -2.169663798716612,
  lng: -79.80318385501556
}
