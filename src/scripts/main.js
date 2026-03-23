const logo = document.getElementById('logo')
const hamburger = document.getElementById('hamburger')
const nav = document.getElementById('nav')
const header = document.getElementById('header')
const form = document.getElementById('contact-form')
const formSuccess = document.getElementById('form-success')
const resetBtn = document.getElementById('reset-form')

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
let isManualScrolling = false
let manualScrollTimeout

function setActiveLink(sectionId) {
  if (isManualScrolling && manualScrollTimeout) return
  
  navLinks.forEach(link => {
    link.removeAttribute('aria-current')
    if (link.getAttribute('data-section') === sectionId) {
      link.setAttribute('aria-current', 'true')
    }
  })
}

const observer = new IntersectionObserver((entries) => {
  if (isManualScrolling) return

  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setActiveLink(entry.target.id)
    }
  })
}, { 
  threshold: 0.2, 
  rootMargin: '-80px 0px -50% 0px' 
})

sections.forEach(id => {
  const el = document.getElementById(id)
  if (el) observer.observe(el)
})

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault()
    const targetId = link.getAttribute('href').slice(1)
    const target = document.getElementById(targetId)
    
    if (target) {
      isManualScrolling = true
      if (manualScrollTimeout) clearTimeout(manualScrollTimeout)
      
      navLinks.forEach(l => l.removeAttribute('aria-current'))
      link.setAttribute('aria-current', 'true')
      
      target.scrollIntoView({ behavior: 'smooth' })
      
      manualScrollTimeout = setTimeout(() => {
        isManualScrolling = false
        manualScrollTimeout = null
      }, 1000)
    }
    
    if (nav) nav.classList.remove('mobile-open')
    if (hamburger) hamburger.classList.remove('active')
  })
})

window.addEventListener('scroll', () => {
  if (isManualScrolling) return
  
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 5) {
    setActiveLink('contact')
  }
}, { passive: true })

const nameError = document.getElementById('name-error')
const emailError = document.getElementById('email-error')
const messageError = document.getElementById('message-error')
const formError = document.getElementById('form-error')
const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const messageInput = document.getElementById('message')

function validateField(input, errorElement, fieldName) {
  const value = input?.value?.trim() || ''

  input?.classList.remove('error', 'valid')
  if (errorElement) errorElement.textContent = ''

  if (!value) {
    if (errorElement) errorElement.textContent = `El ${fieldName} es requerido`
    input?.classList.add('error')
    return false
  }

  if (fieldName === 'email' && input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      if (errorElement) errorElement.textContent = 'Ingresa un email válido'
      input?.classList.add('error')
      return false
    }
  }

  input?.classList.add('valid')
  return true
}

function validateForm() {
  const isNameValid = validateField(nameInput, nameError, 'nombre')
  const isEmailValid = validateField(emailInput, emailError, 'email')
  const isMessageValid = validateField(messageInput, messageError, 'mensaje')

  return isNameValid && isEmailValid && isMessageValid
}

nameInput?.addEventListener('blur', () => {
  if (nameInput.value.trim()) {
    validateField(nameInput, nameError, 'nombre')
  }
})

emailInput?.addEventListener('blur', () => {
  if (emailInput.value.trim()) {
    validateField(emailInput, emailError, 'email')
  }
})

messageInput?.addEventListener('blur', () => {
  if (messageInput.value.trim()) {
    validateField(messageInput, messageError, 'mensaje')
  }
})

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (formError) {
      formError.textContent = ''
      formError.classList.remove('visible')
    }

    if (!validateForm()) return

    const submitBtn = document.getElementById('submit-btn')
    if (submitBtn) {
      submitBtn.disabled = true
      submitBtn.textContent = 'Enviando...'
      submitBtn.classList.add('loading')
    }

    try {
      const formData = new FormData(form)
      const response = await fetch('https://formspree.io/f/xpwzgkvb', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error('Error en el envío')
      }

      form.hidden = true
      if (formSuccess) formSuccess.hidden = false

      form.reset()
      document.querySelectorAll('.form-input').forEach(input => {
        input.classList.remove('valid', 'error')
      })
    } catch (error) {
      if (formError) {
        formError.textContent = 'Hubo un error al enviar el mensaje. Por favor intenta de nuevo.'
        formError.classList.add('visible')
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false
        submitBtn.textContent = 'Enviar mensaje'
        submitBtn.classList.remove('loading')
      }
    }
  })
}

if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    if (formSuccess) formSuccess.hidden = true
    if (form) form.hidden = false
    if (formError) {
      formError.textContent = ''
      formError.classList.remove('visible')
    }
  })
}

const mapContainer = document.getElementById('map-container')

if (mapContainer && typeof window.L !== 'undefined') {
  const lat = parseFloat(mapContainer.dataset.lat)
  const lng = parseFloat(mapContainer.dataset.lng)

  const map = window.L.map('map-container', {
    center: [lat, lng],
    zoom: 15,
    preferCanvas: true
  })

  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)

  window.L.marker([lat, lng])
    .addTo(map)
    .bindPopup('<b>Agus Vet</b><br>¡Te esperamos!')
    .openPopup()

  setTimeout(() => map.invalidateSize(), 100)
}
