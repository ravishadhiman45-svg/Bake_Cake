import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Sun, Moon, Menu, LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { getInitials } from '../utils/constants';

export default function Navbar({ onMenuClick }) {
  const { darkMode, toggleTheme } = useTheme();
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState([]);
  const [notifOpen, setNotifOpen] = useState(false);
  const profileRef = useRef();
  const notifRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" /></button>
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search anything..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-64 pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative" ref={notifRef}>
            <button onClick={() => setNotifOpen(!notifOpen)} className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />{notifications.length > 0 && <span className="absolute top-1 right-1 w-2 h-2 bg-primary-500 rounded-full" />}</button>
            <AnimatePresence>{notifOpen && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 py-2"><div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700"><p className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</p></div>{notifications.length === 0 ? <p className="px-4 py-8 text-center text-sm text-gray-400">No new notifications</p> : notifications.map((n, i) => (<div key={i} className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"><p className="text-sm text-gray-700 dark:text-gray-300">{n.message}</p><p className="text-xs text-gray-400 mt-1">{n.time}</p></div>))}</motion.div>}</AnimatePresence>
          </div>

          <button onClick={toggleTheme} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">{darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}</button>

          <div className="relative" ref={profileRef}>
            <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <div className="w-8 h-8 rounded-xl bg-primary-500 flex items-center justify-center text-white text-xs font-bold">{getInitials(admin?.name || 'Admin')}</div>
              <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">{admin?.name || 'Admin'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>
            <AnimatePresence>{profileOpen && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 py-2">
              <button onClick={() => { navigate('/admin/profile'); setProfileOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"><User className="w-4 h-4" /> Profile</button>
              <button onClick={() => { navigate('/admin/settings'); setProfileOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"><Settings className="w-4 h-4" /> Settings</button>
              <div className="border-t border-gray-100 dark:border-gray-700 my-1" />
              <button onClick={() => { logout(); setProfileOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-error-500 hover:bg-error-50 dark:hover:bg-error-500/10 transition-colors"><LogOut className="w-4 h-4" /> Logout</button>
            </motion.div>}</AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
