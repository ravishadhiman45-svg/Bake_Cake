export default function Skeleton({ className = '' }) {
  return <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg ${className}`} />;
}

export function CardSkeleton() {
  return <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm"><Skeleton className="h-4 w-24 mb-3" /><Skeleton className="h-8 w-20 mb-2" /><Skeleton className="h-3 w-32" /></div>;
}
