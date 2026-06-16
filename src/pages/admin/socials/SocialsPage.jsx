import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link2, Save, Camera, Globe, Video, AtSign } from 'lucide-react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { settingsService } from '../../../services/settingsService';
import { SOCIAL_PLATFORMS } from '../../../utils/constants';

const platformIcons = { instagram: Camera, facebook: Globe, youtube: Video, twitter: AtSign, pinterest: Link2 };
const MOCK_SOCIALS = { instagram: 'https://instagram.com/cakebakery', facebook: 'https://facebook.com/cakebakery', pinterest: 'https://pinterest.com/cakebakery', youtube: 'https://youtube.com/@cakebakery', twitter: 'https://twitter.com/cakebakery' };

export default function SocialsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetch = async () => {
      try { const res = await settingsService.getSocials(); reset(res.data?.socials || res.data || {}); }
      catch { reset(MOCK_SOCIALS); }
      finally { setLoading(false); }
    };
    fetch();
  }, [reset]);

  const onSubmit = async (data) => { setSaving(true); try { await settingsService.updateSocials(data); toast.success('Social links updated successfully'); } catch { toast.error('Failed to update social links'); } finally { setSaving(false); } };

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Social Links</h1><p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your bakery's social media presence</p></div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {SOCIAL_PLATFORMS.map((platform) => {
            const Icon = platformIcons[platform.key] || Link2;
            return <Input key={platform.key} label={platform.label} icon={Icon} placeholder={platform.placeholder} {...register(platform.key)} />;
          })}
          <div className="pt-4"><Button type="submit" loading={saving} icon={Save}>Save Social Links</Button></div>
        </form>
      </motion.div>
    </div>
  );
}
