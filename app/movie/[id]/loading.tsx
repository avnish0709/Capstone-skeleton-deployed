export default function Loading() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto py-8 px-4 animate-pulse">
      <div className="mb-2">
        <div className="h-5 w-32 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row">
        {/* Placeholder Poster Skeleton */}
        <div className="w-full md:w-5/12 aspect-[2/3] md:aspect-auto bg-slate-200 dark:bg-slate-800 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-300 dark:border-slate-700 p-8">
           {/* Empty for shimmer effect */}
        </div>

        {/* Movie Details Skeleton */}
        <div className="w-full md:w-7/12 p-8 md:p-10 flex flex-col justify-center">
          {/* Eyebrow Label */}
          <div className="h-3 w-24 bg-slate-200 dark:bg-slate-800 rounded mb-4"></div>
          
          {/* Title */}
          <div className="h-10 w-4/5 bg-slate-300 dark:bg-slate-700 rounded mb-4"></div>
          <div className="h-10 w-2/5 bg-slate-300 dark:bg-slate-700 rounded mb-6"></div>
          
          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="h-7 w-16 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
            <div className="h-7 w-32 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
            <div className="h-7 w-20 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
          </div>
          
          {/* Paragraph Lines */}
          <div className="space-y-4 mb-8">
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="h-4 w-11/12 bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="h-4 w-4/5 bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded"></div>
            <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
          </div>
          
          {/* Button */}
          <div className="mt-8 flex gap-4">
            <div className="h-12 w-32 bg-slate-300 dark:bg-slate-700 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
