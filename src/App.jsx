import { useState, useEffect } from 'react'
import { SERVICIOS, TESTIMONIOS, CONTACTO_INFO, SOCIAL_LINKS } from './constants'

function App() {
  const [logoClickCount, setLogoClickCount] = useState(0)
  const [showSecret, setShowSecret] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [formLoading, setFormLoading] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const [activeSection, setActiveSection] = useState('inicio')

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Detectar sección activa con Intersection Observer
  useEffect(() => {
    const sections = ['inicio', 'servicios', 'nosotros', 'contacto']
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

  // Scroll suave a la sección
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

  // Validar formulario
  const validateForm = (data) => {
    const errors = {}
    if (!data.nombre.trim()) errors.nombre = 'El nombre es requerido'
    if (!data.email.trim()) {
      errors.email = 'El email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Ingresa un email válido'
    }
    if (!data.mensaje.trim()) errors.mensaje = 'El mensaje es requerido'
    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = {
      nombre: e.target.nombre.value,
      email: e.target.email.value,
      telefono: e.target.telefono.value,
      mensaje: e.target.mensaje.value,
    }
    const errors = validateForm(formData)
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    setFormErrors({})
    setFormLoading(true)
    // Simular envío
    setTimeout(() => {
      setFormLoading(false)
      setFormSubmitted(true)
    }, 1500)
  }

  return (
    <div className="app">
      {/* Secret message toast */}
      {showSecret && (
        <div className="secret-toast">
          ¡Miau! 🐱 ¡Gracias por visitarnos! Tu mascota te lo agradecerá
        </div>
      )}

      {/* Header */}
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
          <button onClick={() => scrollToSection('inicio')} aria-current={activeSection === 'inicio' ? 'true' : undefined}>Inicio</button>
          <button onClick={() => scrollToSection('servicios')} aria-current={activeSection === 'servicios' ? 'true' : undefined}>Servicios</button>
          <button onClick={() => scrollToSection('nosotros')} aria-current={activeSection === 'nosotros' ? 'true' : undefined}>Nosotros</button>
          <button onClick={() => scrollToSection('contacto')} aria-current={activeSection === 'contacto' ? 'true' : undefined}>Contacto</button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero" id="inicio">
        <div className="hero-content">
          <h1>Cuidamos a tu mejor amigo como merecen</h1>
          <p>Veterinaria con más de 15 años de experiencia proporcionando atención médica de calidad para tus mascotas</p>
          <button className="cta-button" onClick={() => scrollToSection('contacto')}>Agenda tu cita</button>
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

      {/* Servicios Section */}
      <section className="section servicios" id="servicios">
        <h2>Nuestros Servicios</h2>
        <p className="section-subtitle">Ofrecemos atención integral para todas las necesidades de tu mascota</p>
        <div className="servicios-grid">
          {SERVICIOS.map((servicio, index) => (
            <div className="servicio-card" key={index}>
              <span className="servicio-icon">{servicio.icono}</span>
              <h3>{servicio.titulo}</h3>
              <p>{servicio.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Nosotros Section */}
      <section className="section nosotros" id="nosotros">
        <h2>Sobre Nosotros</h2>
        <div className="nosotros-content">
          <div className="nosotros-text">
            <p>En <strong>Agus Vet</strong>, creemos que cada mascota merece la mejor atención posible. Desde nuestra fundación en 2010, nos hemos comprometido a proporcionar servicios veterinarios de excelencia.</p>
            <p>Nuestro equipo está formado por veterinarios altamente capacitados y apasionados por el bienestar animal. Constantemente actualizamos nuestros conocimientos y técnicas para ofrecer los mejores tratamientos.</p>
            <p>Nos especializamos en crear un ambiente cálido y confiable donde tanto tú como tu mascota se sientan cómodos y seguros.</p>
          </div>
          <div className="nosotros-features">
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
        <div className="testimonios-grid">
          {TESTIMONIOS.map((testimonio, index) => (
            <div className="testimonio-card" key={index}>
              <p className="testimonio-texto">"{testimonio.texto}"</p>
              <p className="testimonio-autor">- {testimonio.nombre}</p>
              <p className="testimonio-mascota">{testimonio.mascota}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contacto Section */}
      <section className="section contacto" id="contacto">
        <h2>Contáctanos</h2>
        <p className="section-subtitle">Estamos aquí para ayudarte. ¡Escríbenos o visítanos!</p>
        <div className="contacto-grid">
          <div className="contacto-info">
            <div className="info-item">
              <span className="info-icon">📍</span>
              <div>
                <h4>Dirección</h4>
                <p>{CONTACTO_INFO.direccion}</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📞</span>
              <div>
                <h4>Teléfono</h4>
                <p>{CONTACTO_INFO.telefono}</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">✉️</span>
              <div>
                <h4>Email</h4>
                <p>{CONTACTO_INFO.email}</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">🕐</span>
              <div>
                <h4>Horario</h4>
                <p>{CONTACTO_INFO.horario}</p>
                <p>{CONTACTO_INFO.horarioDom}</p>
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
            <form className="contacto-form" onSubmit={handleSubmit}>
              <label htmlFor="nombre">Nombre</label>
              <input type="text" id="nombre" placeholder="Tu nombre" className={formErrors.nombre ? 'error' : ''} />
              {formErrors.nombre && <span className="error-message">{formErrors.nombre}</span>}
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Tu email" className={formErrors.email ? 'error' : ''} />
              {formErrors.email && <span className="error-message">{formErrors.email}</span>}
              <label htmlFor="telefono">Teléfono</label>
              <input type="tel" id="telefono" placeholder="Tu teléfono" />
              <label htmlFor="mensaje">Mensaje</label>
              <textarea id="mensaje" placeholder="¿En qué podemos ayudarte?" rows="5" className={formErrors.mensaje ? 'error' : ''}></textarea>
              {formErrors.mensaje && <span className="error-message">{formErrors.mensaje}</span>}
              <button type="submit" className={`submit-button ${formLoading ? 'loading' : ''}`} disabled={formLoading}>
                {formLoading ? 'Enviando...' : 'Enviar mensaje'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-icon">🐾</span>
            <span>Agus Vet</span>
          </div>
          <p>&copy; 2026 Agus Vet. Todos los derechos reservados.</p>
          <div className="footer-social">
            {SOCIAL_LINKS.map((social) => (
              <span role="img" aria-label={social.label} key={social.red}>{social.emoji}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
