export interface Service {
  iconName: string
  title: string
  description: string
}

export const services: Service[] = [
  {
    title: 'Consultas Médicas',
    description: 'Atención integral para tu mascota con nuestros veterinarios especializados',
    iconName: 'Stethoscope'
  },
  {
    title: 'Vacunación',
    description: 'Programas de vacunación para perros, gatos y otras mascotas',
    iconName: 'Syringe'
  },
  {
    title: 'Cirugías',
    description: 'Procedimientos quirúrgicos con tecnología de punta',
    iconName: 'Hospital'
  },
  {
    title: 'Estética Canina',
    description: 'Baño, corte y cuidado estético profesional',
    iconName: 'Scissors'
  },
  {
    title: 'Laboratorio',
    description: 'Análisis clínicos y diagnósticos precisos',
    iconName: 'Microscope'
  },
  {
    title: 'Emergencias 24/7',
    description: 'Atención de emergencias veterinarias a cualquier hora',
    iconName: 'TriangleAlert'
  }
]
