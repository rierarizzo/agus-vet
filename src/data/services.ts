export interface Service {
  icon: string
  title: string
  description: string
}

export const services: Service[] = [
  {
    title: 'Consultas Médicas',
    description: 'Atención integral para tu mascota con nuestros veterinarios especializados',
    icon: '🩺'
  },
  {
    title: 'Vacunación',
    description: 'Programas de vacunación para perros, gatos y otras mascotas',
    icon: '💉'
  },
  {
    title: 'Cirugías',
    description: 'Procedimientos quirúrgicos con tecnología de punta',
    icon: '🏥'
  },
  {
    title: 'Estética Canina',
    description: 'Baño, corte y cuidado estético profesional',
    icon: '✂️'
  },
  {
    title: 'Laboratorio',
    description: 'Análisis clínicos y diagnósticos precisos',
    icon: '🔬'
  },
  {
    title: 'Emergencias 24/7',
    description: 'Atención de emergencias veterinarias a cualquier hora',
    icon: '🚨'
  }
]
