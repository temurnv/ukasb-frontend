'use client'

export function Footer() {
  return (
    <footer className="bg-[#1B2D4F]">
      {/* Main Footer */}
      <div className="px-4 md:px-10 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Two Column Layout */}
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 md:gap-16 mb-12">
            {/* Left Column */}
            <div>
              {/* Logo */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-white rounded-lg" />
                <span className="text-base font-bold text-white">U-kasb</span>
              </div>

              {/* Tagline */}
              <p className="text-sm mt-2 mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Farzandingiz uchun to&apos;g&apos;ri yo&apos;l
              </p>

              {/* Copyright */}
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                © 2026 U-kasb. Barcha huquqlar himoyalangan.
              </p>
            </div>

            {/* Right Column - Two Sub-columns */}
            <div className="grid md:grid-cols-2 gap-12">
              {/* Platform Links */}
              <div>
                <h4
                  className="text-xs font-bold mb-4"
                  style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}
                >
                  PLATFORMA
                </h4>
                <nav className="space-y-2">
                  {[
                    'Diagnostika haqida',
                    'Ichida nima bor',
                    'Qanday ishlaydi',
                    'Narx',
                  ].map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="block text-sm transition-colors duration-200"
                      style={{ color: 'rgba(255,255,255,0.7)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'white'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                      }}
                    >
                      {link}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Contact Links */}
              <div>
                <h4
                  className="text-xs font-bold mb-4"
                  style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}
                >
                  ALOQA
                </h4>
                <nav className="space-y-2">
                  {['Telegram', 'Instagram', 'info@u-kasb.uz'].map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="block text-sm transition-colors duration-200"
                      style={{ color: 'rgba(255,255,255,0.7)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'white'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                      }}
                    >
                      {link}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="px-4 md:px-10 py-4 text-center md:text-left flex items-center justify-between"
        style={{ backgroundColor: '#152240' }}
      >
        <div className="max-w-7xl mx-auto flex-1">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            © 2026 U-kasb · Barcha huquqlar himoyalangan · Maxfiylik siyosati
          </p>
        </div>
        <a
          href="/admin"
          className="text-xs"
          style={{ color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.3)'
          }}
        >
          Admin panel
        </a>
      </div>
    </footer>
  )
}
