import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  Globe, 
  BarChart3, 
  Plus, 
  MoreVertical,
  Rocket,
  LogOut,
  Bell,
  Search,
  ExternalLink,
  Palette,
  Edit3,
  Trash2,
  Eye,
  Image as ImageIcon,
  Save,
  ArrowLeft,
  Menu,
  X,
  User,
  CheckCircle2,
  AlertTriangle,
  Loader2
} from 'lucide-react';

const INITIAL_POSTS = [
  { id: 1, title: 'Astro ile Neden Blog Açmalısınız?', status: 'Yayında', views: 1240, date: '12 Eki 2023', excerpt: 'Statik site üreticilerinin yeni yıldızı Astro hakkında bilmeniz gereken her şey.' },
  { id: 2, title: 'Markdown Kullanım Rehberi', status: 'Taslak', views: 0, date: '15 Eki 2023', excerpt: 'Blog yazılarınızı daha hızlı yazmak için Markdown ipuçları ve püf noktaları.' },
  { id: 3, title: 'SEO İçin En İyi Pratikler', status: 'Yayında', views: 856, date: '18 Eki 2023', excerpt: 'Arama motorlarında üst sıralara çıkmak için uygulamanız gereken temel adımlar.' },
  { id: 4, title: '2024 Web Tasarım Trendleri', status: 'Yayında', views: 2100, date: '20 Eki 2023', excerpt: 'Gelecek yılın öne çıkacak tasarım dilleri ve kullanıcı deneyimi yaklaşımları.' },
  { id: 5, title: 'İlk Blog Yazım', status: 'Taslak', views: 0, date: '22 Eki 2023', excerpt: 'Bu benim AstroPress ile oluşturduğum ilk deneme yazısıdır.' },
];

type ToastType = 'success' | 'error' | 'info';
interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

export default function Dashboard() {
  const navigate = useNavigate();
  
  // States
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState(INITIAL_POSTS);
  
  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  // Quill Editor
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'header': [1, 2, 3, false] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean']
      ],
    },
    placeholder: 'Hikayenizi anlatmaya başlayın...',
  });

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        setPostContent(quill.root.innerHTML);
      });
    }
  }, [quill]);

  // Toast Helper
  const addToast = (message: string, type: ToastType = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // Handlers
  const handleNewPost = () => {
    setIsEditing(true);
    setPostTitle('');
    setPostContent('');
    setCoverImage(null);
    if (quill) {
      quill.setText('');
    }
  };

  const handleSavePost = () => {
    if (!postTitle.trim()) {
      addToast('Lütfen bir başlık girin.', 'error');
      return;
    }
    
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        title: postTitle,
        status: 'Yayında',
        views: 0,
        date: 'Bugün',
        excerpt: postContent.replace(/<[^>]*>?/gm, '').substring(0, 60) + '...' || 'İçerik yok.'
      };
      setPosts([newPost, ...posts]);
      setIsEditing(false);
      setActiveTab('posts');
      setIsSaving(false);
      addToast('Yazı başarıyla yayınlandı!', 'success');
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter(p => p.id !== id));
    addToast('Yazı silindi.', 'success');
  };

  const handleConnectDomain = () => {
    addToast('Alan adı bağlama işlemi başlatıldı. DNS ayarlarınızı kontrol edin.', 'info');
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      addToast('Ayarlar başarıyla kaydedildi.', 'success');
    }, 1000);
  };

  const handleDeleteBlogConfirm = () => {
    setShowDeleteModal(false);
    addToast('Blog siliniyor...', 'error');
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setIsProfileDropdownOpen(false);
    if (isProfileDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isProfileDropdownOpen]);

  // Editor View
  if (isEditing) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200">
        {/* Editor Header */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 sm:px-6 sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-10 transition-colors duration-200">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsEditing(false)}
              className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 hidden sm:inline-block">Taslak olarak kaydedildi</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-medium transition-colors">
              <Eye className="w-4 h-4" /> Önizleme
            </button>
            <button 
              onClick={handleSavePost}
              disabled={isSaving}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 text-white px-5 py-2 rounded-full font-medium transition-colors shadow-sm"
            >
              {isSaving ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Kaydediliyor</>
              ) : (
                <><Save className="w-4 h-4" /> Yayınla</>
              )}
            </button>
          </div>
        </header>

        {/* Editor Workspace */}
        <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full">
          {/* Main Editor Area */}
          <div className="flex-1 px-6 py-10 lg:px-12 max-w-4xl mx-auto w-full flex flex-col">
            <input 
              type="text" 
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              placeholder="Yazı Başlığı..." 
              className="w-full text-3xl sm:text-5xl font-display font-bold text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 border-none outline-none mb-6 bg-transparent"
            />
            
            <div className="flex-1 min-h-[500px] prose prose-lg dark:prose-invert max-w-none">
              <div ref={quillRef} className="h-full border-none! text-slate-900 dark:text-slate-100 [&_.ql-editor.ql-blank::before]:dark:text-slate-500 [&_.ql-toolbar]:dark:border-slate-800 [&_.ql-container]:dark:border-slate-800 [&_.ql-toolbar]:dark:bg-slate-800 [&_.ql-stroke]:dark:stroke-slate-300 [&_.ql-fill]:dark:fill-slate-300 [&_.ql-picker]:dark:text-slate-300" />
            </div>
          </div>

          {/* Sidebar Settings (Desktop) */}
          <div className="hidden lg:block w-80 border-l border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6 overflow-y-auto transition-colors duration-200">
            <h3 className="font-bold text-slate-900 dark:text-white mb-6">Yazı Ayarları</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">URL Uzantısı (Slug)</label>
                <input 
                  type="text" 
                  placeholder="yazi-basligi" 
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Kapak Görseli</label>
                <label className="w-full h-32 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors cursor-pointer bg-white dark:bg-slate-800 overflow-hidden relative">
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  {coverImage ? (
                    <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <ImageIcon className="w-6 h-6 mb-2 text-slate-400 dark:text-slate-500" />
                      <span className="text-xs font-medium">Görsel Yükle</span>
                    </>
                  )}
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Özet (SEO)</label>
                <textarea 
                  rows={3}
                  placeholder="Arama motorlarında ve sosyal medyada görünecek kısa açıklama..." 
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Etiketler</label>
                <input 
                  type="text" 
                  placeholder="Virgülle ayırın (örn: teknoloji, web)" 
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Toasts */}
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
          <AnimatePresence>
            {toasts.map(toast => (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className={`px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 text-sm font-medium text-white ${
                  toast.type === 'success' ? 'bg-emerald-600' : 
                  toast.type === 'error' ? 'bg-red-600' : 'bg-blue-600'
                }`}
              >
                {toast.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
                {toast.type === 'error' && <AlertTriangle className="w-5 h-5" />}
                {toast.type === 'info' && <Bell className="w-5 h-5" />}
                {toast.message}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // Sidebar Component
  const SidebarContent = () => (
    <>
      <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-700 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-2">
          <Rocket className="w-5 h-5 text-white" />
        </div>
        <span className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-white">AstroPress</span>
      </div>

      <div className="p-4 overflow-y-auto flex-1">
        <div className="px-3 py-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Menü</div>
        <nav className="space-y-1">
          <button 
            onClick={() => { setActiveTab('overview'); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${activeTab === 'overview' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5" /> Genel Bakış
          </button>
          <button 
            onClick={() => { setActiveTab('posts'); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${activeTab === 'posts' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white'}`}
          >
            <FileText className="w-5 h-5" /> Yazılar
          </button>
          <button 
            onClick={() => { setActiveTab('analytics'); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${activeTab === 'analytics' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white'}`}
          >
            <BarChart3 className="w-5 h-5" /> İstatistikler
          </button>
        </nav>

        <div className="px-3 py-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-8 mb-2">Yapılandırma</div>
        <nav className="space-y-1">
          <button 
            onClick={() => { setActiveTab('domain'); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${activeTab === 'domain' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white'}`}
          >
            <Globe className="w-5 h-5" /> Alan Adı
          </button>
          <button 
            onClick={() => { setActiveTab('settings'); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${activeTab === 'settings' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white'}`}
          >
            <Settings className="w-5 h-5" /> Ayarlar
          </button>
        </nav>
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-red-600 dark:hover:text-red-400 transition-colors">
          <LogOut className="w-5 h-5" /> Çıkış Yap
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200">
      
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex-col hidden md:flex fixed h-full z-10 transition-colors duration-200">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.aside 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col z-50 md:hidden transition-colors duration-200"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-10 transition-colors duration-200">
          <div className="flex items-center gap-4 flex-1">
            <button 
              className="md:hidden p-2 -ml-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative w-full max-w-md hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <input 
                type="text" 
                placeholder="Yazılarda ara..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <a href="#" className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <ExternalLink className="w-4 h-4" /> Blogu Görüntüle
            </a>
            <button className="relative p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
            </button>
            
            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsProfileDropdownOpen(!isProfileDropdownOpen); }}
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm shadow-sm hover:ring-2 ring-indigo-200 dark:ring-indigo-900 transition-all"
              >
                M
              </button>
              
              <AnimatePresence>
                {isProfileDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                    animate={{ opacity: 1, y: 0, scale: 1 }} 
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700 mb-2">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">Müşteri</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">musteri@ornek.com</p>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-400 dark:text-slate-500"/> Profilim
                    </button>
                    <button 
                      onClick={() => { setActiveTab('settings'); setIsProfileDropdownOpen(false); }} 
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4 text-slate-400 dark:text-slate-500"/> Ayarlar
                    </button>
                    <div className="h-px bg-slate-100 dark:bg-slate-700 my-2"></div>
                    <button 
                      onClick={() => navigate('/')} 
                      className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4 text-red-400"/> Çıkış Yap
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 sm:p-6 md:p-8 max-w-6xl mx-auto w-full flex-1">
          
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Hoş Geldiniz, Müşteri! 👋</h1>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">Blogunuzun bugünkü durumu harika görünüyor.</p>
                </div>
                <button 
                  onClick={handleNewPost}
                  className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
                >
                  <Plus className="w-5 h-5" /> Yeni Yazı
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                  { label: 'Toplam Görüntülenme', value: '12,450', trend: '+14%', positive: true },
                  { label: 'Tekil Ziyaretçi', value: '3,820', trend: '+5%', positive: true },
                  { label: 'Yayınlanan Yazı', value: posts.length.toString(), trend: '+2', positive: true },
                  { label: 'Aboneler', value: '142', trend: '-1%', positive: false },
                ].map((stat, i) => (
                  <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">{stat.label}</p>
                    <div className="flex items-end justify-between">
                      <h3 className="text-3xl font-display font-bold text-slate-900 dark:text-white">{stat.value}</h3>
                      <span className={`text-sm font-medium ${stat.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                        {stat.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Posts & Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                  <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900 dark:text-white">Son Yazılar</h3>
                    <button onClick={() => setActiveTab('posts')} className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">Tümünü Gör</button>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-700">
                    {posts.length === 0 ? (
                      <div className="p-8 text-center text-slate-500 dark:text-slate-400">Henüz yazı yok.</div>
                    ) : (
                      posts.slice(0, 3).map(post => (
                        <div key={post.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                          <div>
                            <h4 className="font-medium text-slate-900 dark:text-white mb-1">{post.title}</h4>
                            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                              <span className={`px-2 py-0.5 rounded-full font-medium ${post.status === 'Yayında' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                                {post.status}
                              </span>
                              <span>{post.date}</span>
                              <span className="hidden sm:inline-block">{post.views} görüntülenme</span>
                            </div>
                          </div>
                          <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4">Hızlı İşlemler</h3>
                  <div className="space-y-3">
                    <button onClick={() => setActiveTab('domain')} className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all text-left">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white text-sm">Özel Alan Adı Bağla</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Kendi domaininizi kullanın</p>
                      </div>
                    </button>
                    <button className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all text-left">
                      <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 flex items-center justify-center flex-shrink-0">
                        <Palette className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white text-sm">Temayı Değiştir</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Görünümü özelleştirin</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'posts' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Yazılar</h1>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">Tüm blog yazılarınızı buradan yönetin.</p>
                </div>
                <button 
                  onClick={handleNewPost}
                  className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
                >
                  <Plus className="w-5 h-5" /> Yeni Yazı
                </button>
              </div>

              {posts.length === 0 ? (
                /* Empty State */
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-12 flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mb-4">
                    <FileText className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Henüz Hiç Yazınız Yok</h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">İlk blog yazınızı oluşturarak düşüncelerinizi dünyayla paylaşmaya başlayın.</p>
                  <button 
                    onClick={handleNewPost} 
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-sm"
                  >
                    <Plus className="w-5 h-5" /> İlk Yazınızı Oluşturun
                  </button>
                </div>
              ) : (
                <>
                  {/* Filters */}
                  <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-700 pb-4 overflow-x-auto">
                    <button className="px-4 py-1.5 bg-slate-900 dark:bg-slate-700 text-white rounded-full text-sm font-medium whitespace-nowrap">Tümü ({posts.length})</button>
                    <button className="px-4 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-full text-sm font-medium transition-colors whitespace-nowrap">Yayında ({posts.filter(p => p.status === 'Yayında').length})</button>
                    <button className="px-4 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-full text-sm font-medium transition-colors whitespace-nowrap">Taslaklar ({posts.filter(p => p.status === 'Taslak').length})</button>
                  </div>

                  {/* Posts List */}
                  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                    <div className="divide-y divide-slate-100 dark:divide-slate-700">
                      {posts.map(post => (
                        <div key={post.id} className="p-4 sm:p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{post.title}</h3>
                              <p className="text-slate-500 dark:text-slate-400 text-sm mb-3 line-clamp-1">{post.excerpt}</p>
                              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-medium">
                                <span className={`px-2.5 py-1 rounded-full ${post.status === 'Yayında' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                                  {post.status}
                                </span>
                                <span className="text-slate-400 dark:text-slate-500">{post.date}</span>
                                <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {post.views}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors" title="Düzenle">
                                <Edit3 className="w-5 h-5" />
                              </button>
                              <button 
                                onClick={() => handleDeletePost(post.id)}
                                className="p-2 text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors" title="Sil"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white">İstatistikler</h1>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">Blogunuzun performansını detaylı olarak inceleyin.</p>
                </div>
                <div className="flex gap-2">
                  <select className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5">
                    <option>Son 7 Gün</option>
                    <option>Son 30 Gün</option>
                    <option>Bu Yıl</option>
                    <option>Tüm Zamanlar</option>
                  </select>
                </div>
              </div>

              {/* Main Chart Placeholder */}
              <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm mb-6 overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                  <h3 className="font-bold text-slate-900 dark:text-white">Ziyaretçi Trafiği</h3>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                      <span className="text-slate-600 dark:text-slate-400">Tekil Ziyaretçi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-600"></div>
                      <span className="text-slate-600 dark:text-slate-400">Sayfa Görüntülenmesi</span>
                    </div>
                  </div>
                </div>
                <div className="h-60 sm:h-72 w-full flex items-end justify-between gap-1 sm:gap-2 pt-10">
                  {[40, 70, 45, 90, 65, 85, 100].map((height, i) => (
                    <div key={i} className="w-full flex flex-col justify-end gap-1 group relative">
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                        {height * 12} Ziyaret
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-t-md relative">
                        <div 
                          className="absolute bottom-0 w-full bg-indigo-500 rounded-t-md transition-all duration-500 group-hover:bg-indigo-600"
                          style={{ height: `${height}%` }}
                        ></div>
                      </div>
                      <span className="text-[10px] sm:text-xs text-center text-slate-400 dark:text-slate-500 mt-2">
                        {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secondary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4">En Çok Okunan Yazılar</h3>
                  <div className="space-y-4">
                    {[
                      { title: '2024 Web Tasarım Trendleri', views: '2,100' },
                      { title: 'Astro ile Neden Blog Açmalısınız?', views: '1,240' },
                      { title: 'SEO İçin En İyi Pratikler', views: '856' },
                    ].map((post, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-slate-400 dark:text-slate-500 font-medium w-4">{i + 1}.</span>
                          <span className="text-slate-700 dark:text-slate-300 font-medium truncate max-w-[150px] sm:max-w-[200px]">{post.title}</span>
                        </div>
                        <span className="text-slate-500 dark:text-slate-400 text-sm">{post.views}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4">Trafik Kaynakları</h3>
                  <div className="space-y-4">
                    {[
                      { source: 'Google Arama', percentage: 45, color: 'bg-blue-500' },
                      { source: 'Doğrudan', percentage: 25, color: 'bg-indigo-500' },
                      { source: 'Twitter / X', percentage: 20, color: 'bg-slate-800 dark:bg-slate-600' },
                      { source: 'Diğer', percentage: 10, color: 'bg-slate-300 dark:bg-slate-500' },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-700 dark:text-slate-300 font-medium">{item.source}</span>
                          <span className="text-slate-500 dark:text-slate-400">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                          <div className={`${item.color} h-2 rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'domain' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-2">Alan Adı Yönetimi</h1>
              <p className="text-slate-500 dark:text-slate-400 mb-8">Blogunuz için özel bir alan adı (custom domain) bağlayın.</p>

              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-8">
                  <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Kendi Alan Adınızı Kullanın</h3>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">Mevcut bir alan adınız varsa (örn: benimadim.com), DNS ayarlarını yönlendirerek blogunuza bağlayabilirsiniz. SSL sertifikası otomatik olarak tanımlanacaktır.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Alan Adınız</label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input 
                        type="text" 
                        placeholder="www.ornek.com" 
                        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900 outline-none transition-all"
                      />
                      <button 
                        onClick={handleConnectDomain}
                        className="bg-slate-900 dark:bg-indigo-600 hover:bg-indigo-600 dark:hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors whitespace-nowrap"
                      >
                        Bağla
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="font-medium text-slate-900 dark:text-white mb-4">DNS Yönlendirme Bilgileri</h4>
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700 font-mono text-sm text-slate-600 dark:text-slate-400 space-y-3 overflow-x-auto">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-700 min-w-[300px]">
                      <span className="font-semibold text-slate-900 dark:text-white w-1/3">Type</span>
                      <span className="font-semibold text-slate-900 dark:text-white w-1/3">Name</span>
                      <span className="font-semibold text-slate-900 dark:text-white w-1/3 text-right">Value</span>
                    </div>
                    <div className="flex justify-between items-center min-w-[300px]">
                      <span className="w-1/3">A</span>
                      <span className="w-1/3">@</span>
                      <span className="text-indigo-600 dark:text-indigo-400 w-1/3 text-right">76.76.21.21</span>
                    </div>
                    <div className="flex justify-between items-center min-w-[300px]">
                      <span className="w-1/3">CNAME</span>
                      <span className="w-1/3">www</span>
                      <span className="text-indigo-600 dark:text-indigo-400 w-1/3 text-right">cname.astropress.app</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">DNS değişikliklerinin tüm dünyaya yayılması 24-48 saat sürebilir.</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl"
            >
              <div className="mb-8">
                <h1 className="text-2xl font-display font-bold text-slate-900 dark:text-white">Ayarlar</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Blogunuzun genel ayarlarını ve yazar profilinizi yönetin.</p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                {/* Settings Tabs (Internal) */}
                <div className="flex border-b border-slate-200 dark:border-slate-700 px-2 sm:px-6 overflow-x-auto">
                  <button className="px-4 py-4 text-sm font-medium text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 whitespace-nowrap">Genel</button>
                  <button className="px-4 py-4 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors whitespace-nowrap">Yazar Profili</button>
                  <button className="px-4 py-4 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors whitespace-nowrap">SEO & Sosyal</button>
                  <button className="px-4 py-4 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors whitespace-nowrap">Faturalandırma</button>
                </div>

                <div className="p-4 sm:p-6 md:p-8 space-y-8">
                  {/* Blog Info */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Blog Bilgileri</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Blog Adı</label>
                        <input 
                          type="text" 
                          defaultValue="Benim Harika Blogum" 
                          className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Blog Açıklaması</label>
                        <input 
                          type="text" 
                          defaultValue="Teknoloji ve yazılım üzerine düşüncelerim." 
                          className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Site Dili</label>
                        <select className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
                          <option>Türkçe</option>
                          <option>English</option>
                          <option>Deutsch</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <hr className="border-slate-100 dark:border-slate-700" />

                  {/* Theme Settings */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Görünüm</h3>
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl gap-4">
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">Mevcut Tema</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Minimalist (Açık Tema)</p>
                        </div>
                        <button className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto">
                          Değiştir
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl">
                        <div className="pr-4">
                          <p className="font-medium text-slate-900 dark:text-white">Karanlık Mod Desteği</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Ziyaretçilerin sistem tercihine göre otomatik ayarlanır.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                          <input type="checkbox" className="sr-only peer" checked={isDarkMode} onChange={toggleDarkMode} />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <hr className="border-slate-100 dark:border-slate-700" />

                  {/* Danger Zone */}
                  <div>
                    <h3 className="text-lg font-bold text-red-600 dark:text-red-400 mb-4">Tehlikeli Bölge</h3>
                    <div className="p-4 border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">Blogu Sil</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Bu işlem geri alınamaz. Tüm yazılarınız ve ayarlarınız kalıcı olarak silinir.</p>
                      </div>
                      <button 
                        onClick={() => setShowDeleteModal(true)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap w-full sm:w-auto"
                      >
                        Kalıcı Olarak Sil
                      </button>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="pt-4 flex justify-end">
                    <button 
                      onClick={handleSaveSettings}
                      disabled={isSaving}
                      className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white rounded-xl font-medium transition-colors shadow-sm flex items-center justify-center gap-2"
                    >
                      {isSaving ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Kaydediliyor</>
                      ) : (
                        'Değişiklikleri Kaydet'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </main>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" 
              onClick={() => setShowDeleteModal(false)} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl max-w-md w-full p-6 relative z-10 border border-slate-200 dark:border-slate-700"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Blogu Silmek İstediğinize Emin Misiniz?</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">Bu işlem geri alınamaz. Tüm yazılarınız, ayarlarınız ve verileriniz kalıcı olarak silinecektir.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button 
                  onClick={() => setShowDeleteModal(false)} 
                  className="px-4 py-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl font-medium transition-colors w-full sm:w-auto"
                >
                  İptal
                </button>
                <button 
                  onClick={handleDeleteBlogConfirm} 
                  className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors w-full sm:w-auto"
                >
                  Evet, Kalıcı Olarak Sil
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Toasts (for non-editor views) */}
      {!isEditing && (
        <div className="fixed bottom-4 right-4 z-[70] flex flex-col gap-2 pointer-events-none">
          <AnimatePresence>
            {toasts.map(toast => (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className={`px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 text-sm font-medium text-white pointer-events-auto ${
                  toast.type === 'success' ? 'bg-emerald-600' : 
                  toast.type === 'error' ? 'bg-red-600' : 'bg-blue-600'
                }`}
              >
                {toast.type === 'success' && <CheckCircle2 className="w-5 h-5" />}
                {toast.type === 'error' && <AlertTriangle className="w-5 h-5" />}
                {toast.type === 'info' && <Bell className="w-5 h-5" />}
                {toast.message}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

    </div>
  );
}
