import { useState, useEffect } from 'react'
import { SERVICES, TESTIMONIALS, CONTACT_INFO, SOCIAL_LINKS } from './constants'

function App() {
  const [logoClickCount, setLogoClickCount] = useState(0)
  const [showSecret, setShowSecret] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = ['home', 'services', 'about', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-70px 0px -50% 0px' }
    )

    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  const handleLogoClick = () => {
    const newCount = logoClickCount + 1
    setLogoClickCount(newCount)
    if (newCount === 3) {
      setShowSecret(true)
      setTimeout(() => setShowSecret(false), 3000)
      setLogoClickCount(0)
    }
  }

  const validateForm = (data) => {
    const errors = {}
    if (!data.name.trim()) errors.name = 'El nombre es requerido'
    if (!data.email.trim()) {
      errors.email = 'El email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Ingresa un email válido'
    }
    if (!data.message.trim()) errors.message = 'El mensaje es requerido'
    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      message: e.target.message.value,
    }
    const errors = validateForm(formData)
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    setFormErrors({})
    setFormLoading(true)
    setTimeout(() => {
      setFormLoading(false)
      setFormSubmitted(true)
    }, 1500)
  }

  return (
    <div className="app">
      {showSecret && (
        <div className="secret-toast">
          ¡Miau! 🐱 ¡Gracias por visitarnos! Tu mascota te lo agradecerá
        </div>
      )}

      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo" onClick={handleLogoClick} title="¡Click 3 veces!">
          <span className="logo-icon">🐾</span>
          <span className="logo-text">Agus Vet</span>
        </div>
        <button
          className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={`nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <button onClick={() => scrollToSection('home')} aria-current={activeSection === 'home' ? 'true' : undefined}>Inicio</button>
          <button onClick={() => scrollToSection('services')} aria-current={activeSection === 'services' ? 'true' : undefined}>Servicios</button>
          <button onClick={() => scrollToSection('about')} aria-current={activeSection === 'about' ? 'true' : undefined}>Nosotros</button>
          <button onClick={() => scrollToSection('contact')} aria-current={activeSection === 'contact' ? 'true' : undefined}>Contacto</button>
        </nav>
      </header>

      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Cuidamos a tu mejor amigo como merecen</h1>
          <p>Veterinaria con más de 15 años de experiencia proporcionando atención médica de calidad para tus mascotas</p>
          <button className="cta-button" onClick={() => scrollToSection('contact')}>Agenda tu cita</button>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">15+</span>
            <span className="stat-label">Años de experiencia</span>
          </div>
          <div className="stat">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Mascotas atendidas</span>
          </div>
          <div className="stat">
            <span className="stat-number">98%</span>
            <span className="stat-label">Clientes satisfechos</span>
          </div>
        </div>
      </section>

      <section className="section services" id="services">
        <h2>Nuestros Servicios</h2>
        <p className="section-subtitle">Ofrecemos atención integral para todas las necesidades de tu mascota</p>
        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <div className="service-card" key={index}>
              <span className="service-icon">{service.icon}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section about" id="about">
        <h2>Sobre Nosotros</h2>
        <div className="about-content">
          <div className="about-text">
            <p>En <strong>Agus Vet</strong>, creemos que cada mascota merece la mejor atención posible. Desde nuestra fundación en 2010, nos hemos comprometido a proporcionar servicios veterinarios de excelencia.</p>
            <p>Nuestro equipo está formado por veterinarios altamente capacitados y apasionados por el bienestar animal. Constantemente actualizamos nuestros conocimientos y técnicas para ofrecer los mejores tratamientos.</p>
            <p>Nos especializamos en crear un ambiente cálido y confiable donde tanto tú como tu mascota se sientan cómodos y seguros.</p>
          </div>
          <div className="about-features">
            <div className="feature">
              <span className="feature-icon">✅</span>
              <span>Equipamiento moderno</span>
            </div>
            <div className="feature">
              <span className="feature-icon">✅</span>
              <span>Personal capacitado</span>
            </div>
            <div className="feature">
              <span className="feature-icon">✅</span>
              <span>Atención personalizada</span>
            </div>
            <div className="feature">
              <span className="feature-icon">✅</span>
              <span>Precios accesibles</span>
            </div>
          </div>
        </div>
        <h3>Lo que dicen nuestros clientes</h3>
        <div className="testimonials-grid">
          {TESTIMONIALS.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <p className="testimonial-author">- {testimonial.name}</p>
              <p className="testimonial-pet">{testimonial.pet}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section contact" id="contact">
        <h2>Contáctanos</h2>
        <p className="section-subtitle">Estamos aquí para ayudarte. ¡Escríbenos o visítanos!</p>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="info-item">
              <span className="info-icon">📍</span>
              <div>
                <h4>Dirección</h4>
                <p>{CONTACT_INFO.address}</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📞</span>
              <div>
                <h4>Teléfono</h4>
                <p>{CONTACT_INFO.phone}</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">✉️</span>
              <div>
                <h4>Email</h4>
                <p>{CONTACT_INFO.email}</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">🕐</span>
              <div>
                <h4>Horario</h4>
                <p>{CONTACT_INFO.hours}</p>
                <p>{CONTACT_INFO.sundayHours}</p>
              </div>
            </div>
          </div>
          {formSubmitted ? (
            <div className="form-success">
              <span className="success-icon">🎉</span>
              <h3>¡Mensaje enviado!</h3>
              <p>Gracias por contactarnos. Nos pondremos en contacto contigo muy pronto.</p>
              <button className="submit-button" onClick={() => setFormSubmitted(false)}>Enviar otro mensaje</button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Nombre</label>
              <input type="text" id="name" name="name" placeholder="Tu nombre" className={formErrors.name ? 'error' : ''} />
              {formErrors.name && <span className="error-message">{formErrors.name}</span>}
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Tu email" className={formErrors.email ? 'error' : ''} />
              {formErrors.email && <span className="error-message">{formErrors.email}</span>}
              <label htmlFor="phone">Teléfono</label>
              <input type="tel" id="phone" name="phone" placeholder="Tu teléfono" />
              <label htmlFor="message">Mensaje</label>
              <textarea id="message" name="message" placeholder="¿En qué podemos ayudarte?" rows="5" className={formErrors.message ? 'error' : ''}></textarea>
              {formErrors.message && <span className="error-message">{formErrors.message}</span>}
              <button type="submit" className={`submit-button ${formLoading ? 'loading' : ''}`} disabled={formLoading}>
                {formLoading ? 'Enviando...' : 'Enviar mensaje'}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-icon">🐾</span>
            <span>Agus Vet</span>
          </div>
          <p>&copy; 2026 Agus Vet. Todos los derechos reservados.</p>
          <div className="footer-social">
            {SOCIAL_LINKS.map((social) => (
              <span role="img" aria-label={social.label} key={social.network}>{social.emoji}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
