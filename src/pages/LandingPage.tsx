import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Rocket, 
  Zap, 
  Globe, 
  Palette, 
  CheckCircle2, 
  ArrowRight,
  LayoutTemplate,
  MousePointerClick,
  Sparkles,
  Menu,
  X
} from 'lucide-react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-slate-900">AstroPress</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Özellikler</a>
              <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Nasıl Çalışır?</a>
              <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Fiyatlandırma</a>
              <div className="flex items-center gap-4 ml-4">
                <button className="text-sm font-medium text-slate-900 hover:text-indigo-600 transition-colors">Giriş Yap</button>
                <button 
                  onClick={handleStart}
                  className="bg-slate-900 hover:bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm hover:shadow-md"
                >
                  Ücretsiz Başla
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white border-b border-slate-200 overflow-hidden shadow-lg"
            >
              <div className="px-4 pt-2 pb-4 space-y-1">
                <a href="#features" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50">Özellikler</a>
                <a href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50">Nasıl Çalışır?</a>
                <a href="#pricing" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50">Fiyatlandırma</a>
                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
                  <button onClick={() => setIsMenuOpen(false)} className="w-full text-left px-3 py-2 text-base font-medium text-slate-700 hover:text-indigo-600">Giriş Yap</button>
                  <button 
                    onClick={() => { setIsMenuOpen(false); handleStart(); }}
                    className="w-full bg-indigo-600 text-white px-3 py-2 rounded-md text-base font-medium text-center"
                  >
                    Ücretsiz Başla
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white pt-24 pb-32">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium mb-8"
              >
                <Sparkles className="w-4 h-4" />
                <span>Astro tabanlı yeni nesil blog platformu</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-7xl font-display font-bold tracking-tight text-slate-900 mb-6 leading-tight"
              >
                Saniyeler İçinde <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                  Işık Hızında Bloglar
                </span> Oluşturun
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
              >
                Medium ve Ghost sadeliğinde, Astro mimarisinin gücüyle. Kod yazmadan, sadece birkaç tıklamayla kendi blogunuzu kurun ve özel alan adınızı bağlayın.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <button 
                  onClick={handleStart}
                  className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-indigo-600 text-white rounded-full font-medium text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  Ücretsiz Blogunu Kur <ArrowRight className="w-5 h-5" />
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 rounded-full font-medium text-lg transition-all flex items-center justify-center gap-2">
                  Demoyu İncele
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">İhtiyacınız Olan Her Şey</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">Modern bir blog için gereken tüm teknik altyapıyı biz yönetiyoruz, siz sadece içerik üretmeye odaklanın.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="w-6 h-6 text-amber-500" />,
                  title: "Astro ile Işık Hızında",
                  description: "Statik site üretimi sayesinde blogunuz anında yüklenir. Mükemmel SEO ve Core Web Vitals skorları elde edin."
                },
                {
                  icon: <Globe className="w-6 h-6 text-blue-500" />,
                  title: "Özel Alan Adı",
                  description: "Kendi markanızı yaratın. Saniyeler içinde kendi domaininizi (ornek.com) blogunuza bağlayın. Ücretsiz SSL dahil."
                },
                {
                  icon: <Palette className="w-6 h-6 text-pink-500" />,
                  title: "Premium Temalar",
                  description: "Profesyonelce tasarlanmış, mobil uyumlu ve modern temalar arasından seçiminizi yapın. Tek tıkla değiştirin."
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="how-it-works" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-6">
                  "İleri, İleri, Yayınla" <br />Kadar Kolay
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                  Karmaşık sunucu ayarları, veritabanı kurulumları veya eklenti cehennemi yok. Sadece 3 adımda yayındasınız.
                </p>

                <div className="space-y-8">
                  {[
                    {
                      icon: <LayoutTemplate className="w-5 h-5" />,
                      title: "1. Temanızı Seçin",
                      description: "Size en uygun tasarımı galerimizden beğenin."
                    },
                    {
                      icon: <MousePointerClick className="w-5 h-5" />,
                      title: "2. Detayları Belirleyin",
                      description: "Blog adınızı girin ve isterseniz kendi alan adınızı bağlayın."
                    },
                    {
                      icon: <Rocket className="w-5 h-5" />,
                      title: "3. Yayına Alın",
                      description: "Tek tıkla blogunuz tüm dünyada yayında. Yazmaya başlayın!"
                    }
                  ].map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                        {step.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 mb-1">{step.title}</h4>
                        <p className="text-slate-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="md:w-1/2 w-full">
                <div className="relative rounded-2xl bg-slate-900 p-2 shadow-2xl overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-8 bg-slate-800 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="mt-8 bg-white rounded-xl p-6 h-[400px] flex flex-col">
                    <div className="w-full h-8 bg-slate-100 rounded mb-6"></div>
                    <div className="w-3/4 h-12 bg-slate-100 rounded mb-4"></div>
                    <div className="w-full h-4 bg-slate-100 rounded mb-2"></div>
                    <div className="w-full h-4 bg-slate-100 rounded mb-2"></div>
                    <div className="w-5/6 h-4 bg-slate-100 rounded mb-8"></div>
                    
                    <div className="mt-auto flex justify-end">
                      <div className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium text-sm">Yayınla</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Basit ve Şeffaf Fiyatlandırma</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">Sürpriz ücretler yok. İhtiyacınıza uygun planı seçin.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Starter */}
              <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 flex flex-col">
                <h3 className="text-xl font-semibold text-slate-300 mb-2">Başlangıç</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold">Ücretsiz</span>
                </div>
                <p className="text-slate-400 mb-6 text-sm">Hobi amaçlı yazarlar ve yeni başlayanlar için.</p>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {['AstroPress alt alan adı (.astropress.app)', 'Standart temalar', 'Aylık 10.000 ziyaretçi', 'Temel analitik'].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={handleStart}
                  className="w-full py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors"
                >
                  Hemen Başla
                </button>
              </div>

              {/* Pro */}
              <div className="bg-gradient-to-b from-indigo-600 to-violet-800 rounded-3xl p-8 border border-indigo-500 flex flex-col relative transform md:-translate-y-4 shadow-2xl shadow-indigo-900/50">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  En Popüler
                </div>
                <h3 className="text-xl font-semibold text-indigo-100 mb-2">Profesyonel</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold">$9</span>
                  <span className="text-indigo-200">/ay</span>
                </div>
                <p className="text-indigo-200 mb-6 text-sm">Ciddi içerik üreticileri ve profesyoneller için.</p>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {['Özel alan adı bağlama', 'Tüm premium temalar', 'Aylık 100.000 ziyaretçi', 'Gelişmiş analitik', 'SEO araçları', 'Reklamsız deneyim'].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-white text-sm">
                      <CheckCircle2 className="w-5 h-5 text-indigo-300 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={handleStart}
                  className="w-full py-3 px-4 bg-white text-indigo-900 hover:bg-slate-50 rounded-xl font-bold transition-colors shadow-lg"
                >
                  Pro'ya Geç
                </button>
              </div>

              {/* Business */}
              <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 flex flex-col">
                <h3 className="text-xl font-semibold text-slate-300 mb-2">İşletme</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-slate-400">/ay</span>
                </div>
                <p className="text-slate-400 mb-6 text-sm">Küçük işletmeler ve ajanslar için.</p>
                
                <ul className="space-y-4 mb-8 flex-1">
                  {['Sınırsız ziyaretçi', 'Özel tema desteği', 'Takım arkadaşları (5 kişi)', 'API erişimi', 'Öncelikli destek', 'Özel entegrasyonlar'].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={handleStart}
                  className="w-full py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors"
                >
                  İşletme Planı
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">Fikirlerinizi Dünyayla Paylaşmaya Hazır Mısınız?</h2>
            <p className="text-xl text-slate-600 mb-10">Kredi kartı gerekmez. Saniyeler içinde blogunuzu oluşturun.</p>
            <button 
              onClick={handleStart}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              Hemen Ücretsiz Başla <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
              <Rocket className="w-3 h-3 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-slate-900">AstroPress</span>
          </div>
          
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-indigo-600">Hakkımızda</a>
            <a href="#" className="hover:text-indigo-600">Gizlilik</a>
            <a href="#" className="hover:text-indigo-600">Şartlar</a>
            <a href="#" className="hover:text-indigo-600">İletişim</a>
          </div>
          
          <div className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} AstroPress. Tüm hakları saklıdır.
          </div>
        </div>
      </footer>
    </div>
  );
}
