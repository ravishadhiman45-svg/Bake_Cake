import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, KeyRound } from 'lucide-react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { authService } from '../../../services/authService';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

export default function ForgotAccessPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await authService.sendOTP(data.email);
      setSent(true);
      toast.success('OTP sent to your registered phone number');
      setTimeout(() => navigate('/verify-otp', { state: { email: data.email } }), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700/50 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-warning-500/10 flex items-center justify-center mx-auto mb-4"><KeyRound className="w-8 h-8 text-warning-500" /></div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Recover Access</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Enter your admin email to receive a recovery code</p>
          </div>
          {!sent ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input label="Admin Email" icon={Mail} type="email" placeholder="admin@cakebakery.com" error={errors.email?.message} {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })} />
              <Button type="submit" loading={loading} className="w-full" size="lg">Send Recovery Code</Button>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-xl bg-success-500/10 flex items-center justify-center mx-auto mb-3"><Mail className="w-6 h-6 text-success-500" /></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">OTP sent! Redirecting to verification...</p>
            </div>
          )}
          <Link to="/login" className="flex items-center gap-1.5 justify-center mt-6 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"><ArrowLeft className="w-3.5 h-3.5" /> Back to login</Link>
        </div>
      </motion.div>
    </div>
  );
}
