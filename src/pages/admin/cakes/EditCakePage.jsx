import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import FileUpload from '../../../components/ui/FileUpload';
import { PageLoader } from '../../../components/ui/LoadingSpinner';
import { cakeService } from '../../../services/cakeService';
import { CAKE_TYPES } from '../../../utils/constants';

const MOCK_CAKE = { _id: '1', name: 'Chocolate Truffle', price: 2500, flavour: 'Chocolate', weight: '1kg', type: 'Birthday Cakes', isPremium: true, description: 'A rich chocolate truffle cake with layers of dark chocolate ganache and Belgian chocolate shavings.', images: [], videos: [] };

export default function EditCakePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [description, setDescription] = useState('');
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchCake = async () => {
      try { const res = await cakeService.getById(id); const cake = res.data?.cake || res.data; reset(cake); setDescription(cake.description || ''); }
      catch { reset(MOCK_CAKE); setDescription(MOCK_CAKE.description); }
      finally { setLoading(false); }
    };
    fetchCake();
  }, [id, reset]);

  const typeOptions = CAKE_TYPES.map((t) => ({ value: t, label: t }));

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, val]) => formData.append(key, val));
      formData.append('description', description);
      formData.append('isPremium', data.isPremium === 'true');
      images.forEach((img) => formData.append('images', img));
      videos.forEach((vid) => formData.append('videos', vid));
      await cakeService.update(id, formData);
      toast.success('Cake updated successfully');
      navigate('/admin/cakes');
    } catch (err) { toast.error(err.response?.data?.message || 'Failed to update cake'); }
    finally { setSaving(false); }
  };

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" /></button>
        <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Cake</h1><p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update cake details</p></div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50 space-y-5">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Basic Information</h3>
            <Input label="Cake Name" placeholder="Enter cake name" error={errors.name?.message} {...register('name', { required: 'Name is required' })} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Price (INR)" type="number" placeholder="0" error={errors.price?.message} {...register('price', { required: 'Price is required' })} />
              <Input label="Weight" placeholder="e.g. 1kg" error={errors.weight?.message} {...register('weight', { required: 'Weight is required' })} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Flavour" placeholder="e.g. Chocolate" error={errors.flavour?.message} {...register('flavour', { required: 'Flavour is required' })} />
              <Select label="Type" options={typeOptions} placeholder="Select type" error={errors.type?.message} {...register('type', { required: 'Type is required' })} />
            </div>
            <Select label="Premium" options={[{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }]} placeholder="Is this a premium cake?" {...register('isPremium')} />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={6} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700/50 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition resize-none" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50 space-y-5">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Media</h3>
            <FileUpload accept="image/*" multiple label="Cake Images" onFilesChange={setImages} maxFiles={8} />
            <FileUpload accept="video/*" multiple label="Cake Videos" icon={({ ...p }) => <video {...p} />} onFilesChange={setVideos} maxFiles={4} />
          </div>
        </div>
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50 sticky top-24">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">Save Changes</h3>
            <div className="space-y-3">
              <Button type="submit" loading={saving} className="w-full" size="lg"><Save className="w-4 h-4" /> Update Cake</Button>
              <Button type="button" variant="outline" className="w-full" onClick={() => navigate(-1)}>Cancel</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
