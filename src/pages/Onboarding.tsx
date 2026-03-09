import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Rocket, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2,
  LayoutTemplate,
  Type,
  Loader2
} from 'lucide-react';

const THEMES = [
  { id: 'minimal', name: 'Minimalist', color: 'bg-slate-100' },
  { id: 'tech', name: 'Tech Blog', color: 'bg-indigo-900' },
  { id: 'magazine', name: 'Magazine', color: 'bg-rose-100' },
  { id: 'portfolio', name: 'Portfolio', color: 'bg-emerald-100' },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // Form State
  const [selectedTheme, setSelectedTheme] = useState('minimal');
  const [blogName, setBlogName] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate('/');
  };

  const handleCreate = () => {
    setIsCreating(true);
    // Simulate API call
    setTimeout(() => {
      setIsCreating(false);
      setStep(4); // Success step
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-slate-900">AstroPress</span>
        </div>
        
        {step < 4 && (
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            Adım {step} / 3
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: Theme Selection */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                    <LayoutTemplate className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold text-slate-900">Bir tema seçin</h2>
                    <p className="text-slate-500">Blogunuzun görünümünü belirleyin. Daha sonra değiştirebilirsiniz.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                  {THEMES.map((theme) => (
                    <div 
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`relative cursor-pointer rounded-2xl border-2 transition-all ${
                        selectedTheme === theme.id 
                          ? 'border-indigo-600 shadow-md' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className={`h-32 rounded-t-xl ${theme.color} flex items-center justify-center`}>
                        {/* Placeholder for theme preview */}
                        <div className="w-3/4 h-3/4 bg-white/50 rounded-lg shadow-sm backdrop-blur-sm"></div>
                      </div>
                      <div className="p-4 bg-white rounded-b-xl flex justify-between items-center">
                        <span className="font-medium text-slate-900">{theme.name}</span>
                        {selectedTheme === theme.id && (
                          <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                  <button onClick={handleBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Geri
                  </button>
                  <button onClick={handleNext} className="flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-6 py-3 rounded-full font-medium transition-colors">
                    İleri <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Blog Details */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                    <Type className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-bold text-slate-900">Blog detayları</h2>
                    <p className="text-slate-500">Blogunuza bir isim verin ve adresini belirleyin.</p>
                  </div>
                </div>

                <div className="space-y-6 mb-10">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Blog Adı</label>
                    <input 
                      type="text" 
                      value={blogName}
                      onChange={(e) => setBlogName(e.target.value)}
                      placeholder="Örn: Benim Harika Blogum"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Blog Adresi (Subdomain)</label>
                    <div className="flex items-center">
                      <input 
                        type="text" 
                        value={subdomain}
                        onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                        placeholder="benimblogum"
                        className="w-full px-4 py-3 rounded-l-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                      />
                      <div className="bg-slate-50 border border-l-0 border-slate-200 px-4 py-3 rounded-r-xl text-slate-500 font-medium">
                        .astropress.app
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Sadece küçük harf, rakam ve tire (-) kullanabilirsiniz. Özel alan adınızı daha sonra ayarlardan bağlayabilirsiniz.</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                  <button onClick={handleBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Geri
                  </button>
                  <button 
                    onClick={handleNext} 
                    disabled={!blogName || !subdomain}
                    className="flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-full font-medium transition-colors"
                  >
                    İleri <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Review & Create */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-display font-bold text-slate-900 mb-2">Her şey hazır!</h2>
                  <p className="text-slate-500">Blogunuzu oluşturmadan önce son bir kez kontrol edin.</p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 mb-10 border border-slate-100">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="text-slate-500">Seçilen Tema</span>
                      <span className="font-medium text-slate-900">{THEMES.find(t => t.id === selectedTheme)?.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="text-slate-500">Blog Adı</span>
                      <span className="font-medium text-slate-900">{blogName}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-500">Blog Adresi</span>
                      <span className="font-medium text-indigo-600">{subdomain}.astropress.app</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                  <button 
                    onClick={handleBack} 
                    disabled={isCreating}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors disabled:opacity-50"
                  >
                    <ArrowLeft className="w-4 h-4" /> Geri
                  </button>
                  <button 
                    onClick={handleCreate} 
                    disabled={isCreating}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-xl disabled:opacity-70"
                  >
                    {isCreating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Oluşturuluyor...
                      </>
                    ) : (
                      <>
                        <Rocket className="w-5 h-5" /> Blogu Kur
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Success */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 text-center"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Tebrikler!</h2>
                <p className="text-lg text-slate-600 mb-8">
                  <strong className="text-slate-900">{blogName}</strong> başarıyla oluşturuldu ve yayında.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a 
                    href={`https://${subdomain}.astropress.app`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    Bloga Git <ArrowRight className="w-4 h-4" />
                  </a>
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors shadow-md"
                  >
                    Yönetim Paneline Git
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
