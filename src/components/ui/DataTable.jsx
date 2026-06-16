import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { exportCSV } from '../../utils/constants';

export default function DataTable({ columns, data, loading, emptyMessage = 'No data found', emptyIcon: EmptyIcon, searchPlaceholder = 'Search...', searchKeys = [], onRowClick, pageSize = 10, exportFilename }) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = [...data];
    if (search && searchKeys.length) {
      const q = search.toLowerCase();
      result = result.filter((row) => searchKeys.some((key) => String(row[key] ?? '').toLowerCase().includes(q)));
    }
    if (sortKey) {
      result.sort((a, b) => {
        const av = a[sortKey] ?? '';
        const bv = b[sortKey] ?? '';
        const cmp = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv));
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }
    return result;
  }, [data, search, searchKeys, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50">
      <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-700">
        <div className="relative flex-1 w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder={searchPlaceholder} value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition" />
        </div>
        {exportFilename && <button onClick={() => exportCSV(filtered, exportFilename)} className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition"><Download className="w-3.5 h-3.5" /> Export</button>}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-700">
              {columns.map((col) => (
                <th key={col.key} onClick={col.sortable !== false ? () => handleSort(col.key) : undefined} className={`px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider ${col.sortable !== false ? 'cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-200' : ''}`}>
                  <div className="flex items-center gap-1">{col.label}{sortKey === col.key && (sortDir === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={columns.length} className="py-12 text-center"><div className="flex justify-center"><div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" /></div></td></tr>
            ) : paginated.length === 0 ? (
              <tr><td colSpan={columns.length} className="py-16 text-center">{EmptyIcon && <EmptyIcon className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />}<p className="text-sm text-gray-400">{emptyMessage}</p></td></tr>
            ) : (
              <AnimatePresence>
                {paginated.map((row, i) => (
                  <motion.tr key={row._id || i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => onRowClick?.(row)} className={`border-b border-gray-50 dark:border-gray-700/50 transition-colors ${onRowClick ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/30' : ''}`}>
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3.5 text-sm text-gray-700 dark:text-gray-300">{col.render ? col.render(row[col.key], row) : row[col.key]}</td>
                    ))}
                  </motion.tr>
                ))}
              </AnimatePresence>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="p-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-700">
          <span className="text-xs text-gray-500 dark:text-gray-400">Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, filtered.length)} of {filtered.length}</span>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition"><ChevronLeft className="w-4 h-4" /></button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const start = Math.max(1, Math.min(page - 2, totalPages - 4));
              const num = start + i;
              if (num > totalPages) return null;
              return <button key={num} onClick={() => setPage(num)} className={`w-8 h-8 text-xs rounded-lg transition ${page === num ? 'bg-primary-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>{num}</button>;
            })}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      )}
    </div>
  );
}
