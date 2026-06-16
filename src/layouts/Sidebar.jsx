import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Cake,
  FolderOpen,
  ShoppingBag,
  Star,
  MessageSquare,
  Film,
  Link2,
  FileText,
  Shield,
  Settings,
  User,
  ChevronLeft,
  X,
} from 'lucide-react';

const navItems = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/cakes', icon: Cake, label: 'Cake Listings' },
  { to: '/admin/categories', icon: FolderOpen, label: 'Categories' },
  { to: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
  { to: '/admin/reviews', icon: Star, label: 'Customer Reviews' },
  { to: '/admin/feedbacks', icon: MessageSquare, label: 'User Feedbacks' },
  { to: '/admin/reels', icon: Film, label: 'Landing Reels' },
  { to: '/admin/socials', icon: Link2, label: 'Social Links' },
  { to: '/admin/terms-conditions', icon: FileText, label: 'Terms & Conditions' },
  { to: '/admin/privacy-policy', icon: Shield, label: 'Privacy Policy' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
  { to: '/admin/profile', icon: User, label: 'Profile' },
];

export default function Sidebar({
  collapsed = false,
  setCollapsed = () => {},
  mobileOpen = false,
  setMobileOpen = () => {},
}) {
  const location = useLocation();

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
    setMobileOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-white/10">
        {!collapsed ? (
          <motion.div
            key="logo-expanded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2.5"
          >
            <div className="w-8 h-8 rounded-xl bg-primary-500 flex items-center justify-center">
              <Cake className="w-4 h-4 text-white" />
            </div>

            <span className="text-base font-bold text-white tracking-tight">
              Cake Bakery
            </span>
          </motion.div>
        ) : (
          <div className="w-8 h-8 rounded-xl bg-primary-500 flex items-center justify-center mx-auto">
            <Cake className="w-4 h-4 text-white" />
          </div>
        )}

        {/* Desktop Toggle */}
        <button
          type="button"
          onClick={handleToggleSidebar}
          className="hidden lg:flex p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
        >
          <ChevronLeft
            className={`w-4 h-4 transition-transform ${
              collapsed ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Mobile Close */}
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors text-gray-400"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.to ||
            location.pathname.startsWith(`${item.to}/`);

          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-sidebar-active text-primary-400'
                  : 'text-gray-400 hover:text-white hover:bg-sidebar-hover'
              }`}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 ${
                  isActive
                    ? 'text-primary-400'
                    : 'text-gray-500 group-hover:text-white'
                }`}
              />

              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    key={item.label}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            key="footer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 py-4 border-t border-white/10"
          >
            <div className="px-3 py-3 rounded-xl bg-primary-500/10">
              <p className="text-xs text-primary-300 font-medium">
                Cake Bakery Admin
              </p>
              <p className="text-xs text-gray-500 mt-0.5">v1.0.0</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-30 bg-sidebar-bg overflow-hidden"
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />

            <motion.aside
              key="mobile-sidebar"
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed left-0 top-0 bottom-0 w-64 z-50 bg-sidebar-bg lg:hidden"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}