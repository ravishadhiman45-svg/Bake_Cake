import { useState, useRef, useCallback } from 'react';
import { Upload, X, FileText, Image as ImageIcon, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FileUpload({ accept = 'image/*', multiple = false, label, icon: Icon = ImageIcon, onFilesChange, preview = true, maxFiles = 10 }) {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const addFiles = useCallback((newFiles) => {
    const fileArray = Array.from(newFiles);
    const updated = multiple ? [...files, ...fileArray].slice(0, maxFiles) : fileArray.slice(0, 1);
    setFiles(updated);
    onFilesChange?.(updated);
  }, [files, maxFiles, multiple, onFilesChange]);

  const removeFile = (index) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    onFilesChange?.(updated);
  };

  const isImage = (file) => file.type?.startsWith('image/');
  const isVideo = (file) => file.type?.startsWith('video/');

  return (
    <div className="space-y-2">
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
      <div onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }} onClick={() => inputRef.current?.click()} className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${dragging ? 'border-primary-500 bg-primary-500/5' : 'border-gray-200 dark:border-gray-600 hover:border-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700/30'}`}>
        <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={(e) => addFiles(e.target.files)} className="hidden" />
        <Icon className="w-10 h-10 mx-auto mb-3 text-gray-300 dark:text-gray-500" />
        <p className="text-sm text-gray-500 dark:text-gray-400">Drag & drop or <span className="text-primary-500 font-medium">browse</span></p>
        <p className="text-xs text-gray-400 mt-1">{accept.includes('video') ? 'MP4, MOV, WebM' : 'PNG, JPG, WebP'} up to 10MB{multiple && ` (max ${maxFiles} files)`}</p>
      </div>
      {preview && files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-3">
          <AnimatePresence>
            {files.map((file, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="relative group">
                {isImage(file) ? <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-24 object-cover rounded-xl border border-gray-200 dark:border-gray-600" /> : isVideo(file) ? <video src={URL.createObjectURL(file)} className="w-full h-24 object-cover rounded-xl border border-gray-200 dark:border-gray-600" muted /> : <div className="w-full h-24 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"><FileText className="w-8 h-8 text-gray-400" /></div>}
                <button onClick={(e) => { e.stopPropagation(); removeFile(i); }} className="absolute -top-2 -right-2 w-6 h-6 bg-error-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-3 h-3" /></button>
                <p className="text-xs text-gray-400 mt-1 truncate">{file.name}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
