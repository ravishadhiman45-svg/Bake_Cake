import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Clock, Camera, Lock, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../context/AuthContext';
import { authService } from '../../../services/authService';
import { formatDate, getInitials } from '../../../utils/constants';

export default function ProfilePage() {
  const { admin } = useAuth();
  const [saving, setSaving] = useState(false);
  const [changingPwd, setChangingPwd] = useState(false);
  const [showPwdForm, setShowPwdForm] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { name: admin?.name || 'Admin', email: admin?.email || 'admin@cakebakery.com', phone: admin?.phone || '+91 98765 43210' } });
  const { register: registerPwd, handleSubmit: handlePwdSubmit, reset: resetPwd, formState: { errors: pwdErrors } } = useForm();

  const onSubmit = async (data) => { setSaving(true); try { await authService.updateProfile(data); toast.success('Profile updated successfully'); } catch { toast.error('Failed to update profile'); } finally { setSaving(false); } };
  const onChangePassword = async (data) => {
    if (data.newPassword !== data.confirmPassword) { toast.error('Passwords do not match'); return; }
    setChangingPwd(true);
    try { await authService.changePassword(data); toast.success('Password changed successfully'); resetPwd(); setShowPwdForm(false); }
    catch { toast.error('Failed to change password'); }
    finally { setChangingPwd(false); }
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1><p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your admin profile</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50 text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="w-24 h-24 rounded-2xl bg-primary-500 flex items-center justify-center text-white text-2xl font-bold">{getInitials(admin?.name || 'Admin')}</div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center shadow-lg"><Camera className="w-4 h-4" /></button>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{admin?.name || 'Admin'}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{admin?.email || 'admin@cakebakery.com'}</p>
          <div className="mt-6 space-y-3 text-left">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/30"><Mail className="w-4 h-4 text-gray-400" /><div><p className="text-xs text-gray-400">Email</p><p className="text-sm text-gray-900 dark:text-white">{admin?.email || 'admin@cakebakery.com'}</p></div></div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/30"><Phone className="w-4 h-4 text-gray-400" /><div><p className="text-xs text-gray-400">Phone</p><p className="text-sm text-gray-900 dark:text-white">{admin?.phone || '+91 98765 43210'}</p></div></div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/30"><Clock className="w-4 h-4 text-gray-400" /><div><p className="text-xs text-gray-400">Last Login</p><p className="text-sm text-gray-900 dark:text-white">{formatDate(new Date())}</p></div></div>
          </div>
        </motion.div>
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Edit Profile</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input label="Name" icon={User} placeholder="Your name" error={errors.name?.message} {...register('name', { required: 'Name is required' })} />
              <Input label="Email" icon={Mail} type="email" placeholder="Your email" error={errors.email?.message} {...register('email', { required: 'Email is required' })} />
              <Input label="Phone" icon={Phone} placeholder="Your phone number" {...register('phone')} />
              <Button type="submit" loading={saving} icon={Save}>Save Changes</Button>
            </form>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
            <div className="flex items-center justify-between mb-4"><h3 className="text-base font-semibold text-gray-900 dark:text-white flex items-center gap-2"><Lock className="w-4 h-4" /> Change Password</h3><Button variant="ghost" size="sm" onClick={() => setShowPwdForm(!showPwdForm)}>{showPwdForm ? 'Cancel' : 'Change'}</Button></div>
            {showPwdForm && (
              <form onSubmit={handlePwdSubmit(onChangePassword)} className="space-y-4">
                <Input label="Current Password" icon={Lock} type="password" placeholder="Current password" error={pwdErrors.currentPassword?.message} {...registerPwd('currentPassword', { required: 'Current password is required' })} />
                <Input label="New Password" icon={Lock} type="password" placeholder="New password" error={pwdErrors.newPassword?.message} {...registerPwd('newPassword', { required: 'New password is required', minLength: { value: 8, message: 'At least 8 characters' } })} />
                <Input label="Confirm Password" icon={Lock} type="password" placeholder="Confirm new password" error={pwdErrors.confirmPassword?.message} {...registerPwd('confirmPassword', { required: 'Confirm your password' })} />
                <Button type="submit" loading={changingPwd} icon={Lock}>Update Password</Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
