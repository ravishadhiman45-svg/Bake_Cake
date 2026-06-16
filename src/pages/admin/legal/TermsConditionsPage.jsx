import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Upload, Trash2, Eye, Download, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../../../components/ui/Button';
import FileUpload from '../../../components/ui/FileUpload';
import ConfirmDialog from '../../../components/ui/ConfirmDialog';
import { settingsService } from '../../../services/settingsService';

export default function TermsConditionsPage() {
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try { const res = await settingsService.getPdf('terms-conditions'); setPdf(res.data?.pdf || res.data || null); }
      catch { setPdf(null); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const handleUpload = async (files) => {
    if (!files.length) return;
    setUploading(true);
    try { const formData = new FormData(); formData.append('pdf', files[0]); const res = await settingsService.uploadPdf('terms-conditions', formData); setPdf(res.data?.pdf || res.data); toast.success('Terms & Conditions PDF uploaded'); }
    catch { toast.error('Failed to upload PDF'); }
    finally { setUploading(false); }
  };

  const handleDelete = async () => { setDeleting(true); try { await settingsService.deletePdf('terms-conditions'); setPdf(null); toast.success('PDF deleted'); } catch { toast.error('Failed to delete PDF'); } finally { setDeleting(false); setShowDelete(false); } };

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900 dark:text-white">Terms & Conditions</h1><p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your bakery's terms and conditions document</p></div>
      {pdf ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700/30">
            <div className="w-12 h-12 rounded-xl bg-error-500/10 flex items-center justify-center"><FileText className="w-6 h-6 text-error-500" /></div>
            <div className="flex-1"><p className="text-sm font-medium text-gray-900 dark:text-white">{pdf.name || pdf.filename || 'terms-conditions.pdf'}</p><p className="text-xs text-gray-400 mt-0.5">PDF Document</p></div>
            <div className="flex items-center gap-2">
              {pdf.url && <a href={pdf.url} target="_blank" rel="noopener noreferrer"><Button variant="outline" size="sm" icon={Eye}>Preview</Button></a>}
              {pdf.url && <a href={pdf.url} download><Button variant="outline" size="sm" icon={Download}>Download</Button></a>}
              <Button variant="outline" size="sm" icon={RefreshCw} onClick={() => setPdf(null)}>Replace</Button>
              <Button variant="danger" size="sm" icon={Trash2} onClick={() => setShowDelete(true)}>Delete</Button>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/50">
          <FileUpload accept=".pdf" label="Upload Terms & Conditions PDF" icon={FileText} onFilesChange={handleUpload} maxFiles={1} />
          {uploading && <div className="mt-4 flex items-center gap-2 text-sm text-primary-500"><div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />Uploading...</div>}
        </div>
      )}
      <ConfirmDialog isOpen={showDelete} onClose={() => setShowDelete(false)} onConfirm={handleDelete} loading={deleting} title="Delete PDF" message="Are you sure you want to delete the Terms & Conditions PDF?" />
    </div>
  );
}
