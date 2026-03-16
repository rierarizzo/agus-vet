export interface Testimonial {
  name: string
  pet: string
  text: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'María García',
    pet: 'Max (Perro)',
    text: 'El mejor cuidado que han tenido mis mascotas. El equipo es muy profesional y cariñoso.'
  },
  {
    name: 'Carlos López',
    pet: 'Luna (Gata)',
    text: 'Desde que descubrí Agus Vet, la salud de mi gata ha mejorado mucho. Totalmente recomendado.'
  },
  {
    name: 'Ana Rodríguez',
    pet: 'Buddy (Perro)',
    text: 'Excelente atención veterinaria. Siempre dispuestos a ayudar y explicar cada procedimiento.'
  }
]
