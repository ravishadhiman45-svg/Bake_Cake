export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const CAKE_TYPES = [
  'Occasion Cakes', 'Birthday Cakes', 'Anniversary Cakes', 'Cakes For Her',
  'Cakes For Him', 'Custom Cakes', 'Gourmet Cakes', 'Vintage Cakes', 'Desserts',
];

export const ORDER_STATUSES = ['Pending', 'Confirmed', 'Preparing', 'Out For Delivery', 'Delivered', 'Cancelled'];
export const PAYMENT_STATUSES = ['Paid', 'Unpaid', 'Refunded'];

export const SOCIAL_PLATFORMS = [
  { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/...' },
  { key: 'facebook', label: 'Facebook', placeholder: 'https://facebook.com/...' },
  { key: 'pinterest', label: 'Pinterest', placeholder: 'https://pinterest.com/...' },
  { key: 'youtube', label: 'YouTube', placeholder: 'https://youtube.com/...' },
  { key: 'twitter', label: 'Twitter', placeholder: 'https://twitter.com/...' },
];

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

export const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });

export const formatDateTime = (date) =>
  new Date(date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

export const getInitials = (name) =>
  name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'A';

export const exportCSV = (data, filename) => {
  if (!data.length) return;
  const headers = Object.keys(data[0]);
  const csv = [headers.join(','), ...data.map((row) => headers.map((h) => {
    const val = row[h] ?? '';
    return typeof val === 'string' && val.includes(',') ? `"${val}"` : val;
  }).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};
