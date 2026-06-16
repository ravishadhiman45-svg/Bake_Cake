import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Cake, ArrowRight, Moon, Sun } from 'lucide-react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useTheme } from '../../../context/ThemeContext';
import { authService } from '../../../services/authService';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

export default function LoginPage() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const DEMO_EMAIL = 'admin@cakebakery.com';

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (data.email === DEMO_EMAIL) {
        toast.success('Demo OTP sent! Use code 123456');
        navigate('/verify-otp', { state: { email: data.email } });
        return;
      }
      await authService.sendOTP(data.email);
      toast.success('OTP sent to your registered phone number');
      navigate('/verify-otp', { state: { email: data.email } });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-linear-to-brm-primary-500 via-primary-600 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-white">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-8"><Cake className="w-10 h-10 text-white" /></div>
            <h1 className="text-4xl font-bold mb-4">Cake Bakery</h1>
            <p className="text-lg text-white/80 max-w-md">Manage your bakery with elegance. Orders, cakes, reviews — all in one beautiful dashboard.</p>
            <div className="mt-12 flex gap-8 justify-center">
              {[{ value: '2K+', label: 'Orders' }, { value: '500+', label: 'Cakes' }, { value: '99%', label: 'Satisfaction' }].map((stat) => (<div key={stat.label} className="text-center"><p className="text-3xl font-bold">{stat.value}</p><p className="text-sm text-white/60">{stat.label}</p></div>))}
            </div>
          </motion.div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/5" />
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-white dark:bg-gray-900">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
          <div className="flex justify-between items-center mb-8">
            <div className="lg:hidden flex items-center gap-2"><div className="w-8 h-8 rounded-xl bg-primary-500 flex items-center justify-center"><Cake className="w-4 h-4 text-white" /></div><span className="font-bold text-gray-900 dark:text-white">Cake Bakery</span></div>
            <button onClick={toggleTheme} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">{darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-600" />}</button>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome back</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-8">Enter your email to receive a verification code</p>
          <div className="bg-primary-500/8 border border-primary-500/20 rounded-2xl p-4 mb-6">
            <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 mb-1.5">Demo Credentials</p>
            <div className="space-y-1">
              <p className="text-xs text-gray-600 dark:text-gray-400"><span className="font-medium">Email:</span> admin@cakebakery.com</p>
              <p className="text-xs text-gray-600 dark:text-gray-400"><span className="font-medium">OTP:</span> 123456</p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input label="Email Address" icon={Mail} type="email" placeholder="admin@cakebakery.com" error={errors.email?.message} {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })} />
            <Button type="submit" loading={loading} className="w-full" size="lg">Send OTP <ArrowRight className="w-4 h-4" /></Button>
          </form>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">Can't access your account? <Link to="/forgot-access" className="text-primary-500 hover:text-primary-600 font-medium">Recover access</Link></p>
        </motion.div>
      </div>
    </div>
  );
}
