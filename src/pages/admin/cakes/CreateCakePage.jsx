import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import FileUpload from '../../../components/ui/FileUpload';
import { cakeService } from '../../../services/cakeService';
import { CAKE_TYPES } from '../../../utils/constants';

export default function CreateCakePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [description, setDescription] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const typeOptions = CAKE_TYPES.map((t) => ({ value: t, label: t }));

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, val]) => formData.append(key, val));
      formData.append('description', description);
      formData.append('isPremium', data.isPremium === 'true');
      images.forEach((img) => formData.append('images', img));
      videos.forEach((vid) => formData.append('videos', vid));
      await cakeService.create(formData);
      toast.success('Cake created successfully');
      navigate('/admin/cakes');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to create cake'); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" /></button>
        <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Cake</h1><p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Add a new cake to your catalog</p></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50 space-y-5">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Basic Information</h3>
            <Input label="Cake Name" placeholder="Enter cake name" error={errors.name?.message} {...register('name', { required: 'Name is required' })} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Price (INR)" type="number" placeholder="0" error={errors.price?.message} {...register('price', { required: 'Price is required', min: { value: 1, message: 'Price must be positive' } })} />
              <Input label="Weight" placeholder="e.g. 1kg, 2kg" error={errors.weight?.message} {...register('weight', { required: 'Weight is required' })} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Flavour" placeholder="e.g. Chocolate, Vanilla" error={errors.flavour?.message} {...register('flavour', { required: 'Flavour is required' })} />
              <Select label="Type" options={typeOptions} placeholder="Select type" error={errors.type?.message} {...register('type', { required: 'Type is required' })} />
            </div>
            <Select label="Premium" options={[{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }]} placeholder="Is this a premium cake?" {...register('isPremium')} />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={6} placeholder="Describe the cake in detail..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700/50 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition resize-none" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50 space-y-5">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Media</h3>
            <FileUpload accept="image/*" multiple label="Cake Images" onFilesChange={setImages} maxFiles={8} />
            <FileUpload accept="video/*" multiple label="Cake Videos" icon={({ ...p }) => <video {...p} />} onFilesChange={setVideos} maxFiles={4} />
          </motion.div>
        </div>
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50 sticky top-24">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Publish</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Review your cake details and publish when ready.</p>
            <div className="space-y-3">
              <Button type="submit" loading={loading} className="w-full" size="lg"><Save className="w-4 h-4" /> Create Cake</Button>
              <Button type="button" variant="outline" className="w-full" onClick={() => navigate(-1)}>Cancel</Button>
            </div>
          </motion.div>
        </div>
      </form>
    </div>
  );
}
