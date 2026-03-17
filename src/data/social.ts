export interface SocialLink {
  network: 'facebook' | 'instagram' | 'twitter'
  label: string
}

export const socialLinks: SocialLink[] = [
  { network: 'facebook', label: 'Facebook de Agus Vet' },
  { network: 'instagram', label: 'Instagram de Agus Vet' },
  { network: 'twitter', label: 'Twitter de Agus Vet' }
]
