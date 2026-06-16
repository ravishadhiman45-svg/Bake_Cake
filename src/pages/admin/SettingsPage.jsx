import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Save, Upload, Store, Mail, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button';
import FileUpload from '../../components/ui/FileUpload';
import { settingsService } from '../../services/settingsService';

const MOCK_SETTINGS = { bakeryName: 'Cake Bakery', supportEmail: 'support@cakebakery.com', supportPhone: '+91 98765 43210', address: '123 Bakery Lane, Mumbai, Maharashtra 400001', logo: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg', favicon: '' };

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const fetch = async () => {
      try { const res = await settingsService.get(); reset(res.data?.settings || res.data || {}); }
      catch { reset(MOCK_SETTINGS); }
      finally { setLoading(false); }
    };
    fetch();
  }, [reset]);

  const onSubmit = async (data) => { setSaving(true); try { await settingsService.update(data); toast.success('Settings saved successfully'); } catch { toast.error('Failed to save settings'); } finally { setSaving(false); } };
  const handleLogoUpload = async (files) => { if (!files.length) return; try { const formData = new FormData(); formData.append('logo', files[0]); await settingsService.uploadLogo(formData); toast.success('Logo uploaded'); } catch { toast.error('Failed to upload logo'); } };
  const handleFaviconUpload = async (files) => { if (!files.length) return; try { const formData = new FormData(); formData.append('favicon', files[0]); await settingsService.uploadFavicon(formData); toast.success('Favicon uploaded'); } catch { toast.error('Failed to upload favicon'); } };

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1><p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your bakery settings</p></div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50 space-y-5">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2"><Store className="w-4 h-4" /> Bakery Information</h3>
            <Input label="Bakery Name" icon={Store} placeholder="Your bakery name" error={errors.bakeryName?.message} {...register('bakeryName', { required: 'Bakery name is required' })} />
            <Input label="Support Email" icon={Mail} type="email" placeholder="support@example.com" error={errors.supportEmail?.message} {...register('supportEmail', { required: 'Email is required' })} />
            <Input label="Support Phone" icon={Phone} placeholder="+91 98765 43210" {...register('supportPhone')} />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Address</label>
              <textarea placeholder="Full address" rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700/50 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition resize-none" {...register('address')} />
            </div>
          </motion.div>
        </div>
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50 space-y-5">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Branding</h3>
            <FileUpload accept="image/*" label="Logo" onFilesChange={handleLogoUpload} maxFiles={1} />
            <FileUpload accept="image/*" label="Favicon" icon={Upload} onFilesChange={handleFaviconUpload} maxFiles={1} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50"><Button type="submit" loading={saving} className="w-full" size="lg" icon={Save}>Save Settings</Button></motion.div>
        </div>
      </form>
    </div>
  );
}
