const logo = document.getElementById('logo')
const secretToast = document.getElementById('secret-toast')
const hamburger = document.getElementById('hamburger')
const nav = document.getElementById('nav')
const header = document.getElementById('header')
const form = document.getElementById('contact-form')
const formSuccess = document.getElementById('form-success')
const resetBtn = document.getElementById('reset-form')

let logoClickCount = 0

if (logo) {
  logo.addEventListener('click', () => {
    logoClickCount++
    if (logoClickCount === 3) {
      if (secretToast) secretToast.hidden = false
      setTimeout(() => {
        if (secretToast) secretToast.hidden = true
      }, 3000)
      logoClickCount = 0
    }
  })
}

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('active')
    nav.classList.toggle('mobile-open')
    hamburger.setAttribute('aria-expanded', String(isOpen))
  })
}

if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled')
    } else {
      header.classList.remove('scrolled')
    }
  }, { passive: true })
}

const sections = ['home', 'services', 'about', 'contact']
const navLinks = document.querySelectorAll('.nav a')

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.removeAttribute('aria-current')
        if (link.getAttribute('data-section') === entry.target.id) {
          link.setAttribute('aria-current', 'true')
        }
      })
    }
  })
}, { threshold: 0.3, rootMargin: '-70px 0px -50% 0px' })

sections.forEach(id => {
  const el = document.getElementById(id)
  if (el) observer.observe(el)
})

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault()
    const targetId = link.getAttribute('href').slice(1)
    const target = document.getElementById(targetId)
    target?.scrollIntoView({ behavior: 'smooth' })
    if (nav) nav.classList.remove('mobile-open')
    if (hamburger) hamburger.classList.remove('active')
  })
})

const nameError = document.getElementById('name-error')
const emailError = document.getElementById('email-error')
const messageError = document.getElementById('message-error')

function validateForm() {
  let isValid = true

  const nameInput = document.getElementById('name')
  const emailInput = document.getElementById('email')
  const messageInput = document.getElementById('message')

  if (nameError) nameError.textContent = ''
  if (emailError) emailError.textContent = ''
  if (messageError) messageError.textContent = ''

  nameInput?.classList.remove('error')
  emailInput?.classList.remove('error')
  messageInput?.classList.remove('error')

  const name = nameInput?.value?.trim() || ''
  const email = emailInput?.value?.trim() || ''
  const message = messageInput?.value?.trim() || ''

  if (!name) {
    if (nameError) nameError.textContent = 'El nombre es requerido'
    nameInput?.classList.add('error')
    isValid = false
  }

  if (!email) {
    if (emailError) emailError.textContent = 'El email es requerido'
    emailInput?.classList.add('error')
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    if (emailError) emailError.textContent = 'Ingresa un email válido'
    emailInput?.classList.add('error')
    isValid = false
  }

  if (!message) {
    if (messageError) messageError.textContent = 'El mensaje es requerido'
    messageInput?.classList.add('error')
    isValid = false
  }

  return isValid
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    const submitBtn = document.getElementById('submit-btn')
    if (submitBtn) {
      submitBtn.disabled = true
      submitBtn.textContent = 'Enviando...'
      submitBtn.classList.add('loading')
    }

    await new Promise(resolve => setTimeout(resolve, 1500))

    form.hidden = true
    if (formSuccess) formSuccess.hidden = false

    form.reset()

    if (submitBtn) {
      submitBtn.disabled = false
      submitBtn.textContent = 'Enviar mensaje'
      submitBtn.classList.remove('loading')
    }
  })
}

if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    if (formSuccess) formSuccess.hidden = true
    if (form) form.hidden = false
  })
}
