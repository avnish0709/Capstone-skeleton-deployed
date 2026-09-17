"use client";

import { useState, useActionState } from 'react';
import { authenticate } from '../lib/actions';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  
  // useActionState connects the UI to the Server Action
  const [state, formAction, isPending] = useActionState(authenticate, { message: '', error: false });

  return (
    <div className="flex items-center justify-center flex-grow py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl">
        
        {/* Header */}
        <div className="text-center">
          <span className="text-4xl" role="img" aria-label="movies">🎬</span>
          <h2 className="mt-4 text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isLogin ? 'Login' : 'Create Account'}
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {isLogin ? 'Welcome back! Sign in to manage your movie collection.' : 'Join us! Create an account to start managing your movies.'}
          </p>
        </div>

        {/* Server Action Form */}
        <form className="mt-8 space-y-5" action={formAction}>
          {/* Hidden input to pass the mode to the server action */}
          <input type="hidden" name="mode" value={isLogin ? 'login' : 'signup'} />

          <div className="space-y-1">
            <label htmlFor="email-address" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Email Address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isPending}
              className="appearance-none relative block w-full px-4 py-3 border border-slate-300 dark:border-slate-700 placeholder-slate-450 dark:placeholder-slate-500 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 dark:focus:border-indigo-400 bg-transparent transition-all text-base disabled:opacity-50"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={isPending}
              className="appearance-none relative block w-full px-4 py-3 border border-slate-300 dark:border-slate-700 placeholder-slate-450 dark:placeholder-slate-500 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 dark:focus:border-indigo-400 bg-transparent transition-all text-base disabled:opacity-50"
              placeholder="••••••••"
            />
          </div>

          {/* Server Validation Error Display */}
          {state?.error && (
            <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 p-3 rounded-lg text-center font-medium">
              {state.message}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md shadow-indigo-600/15 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Processing...
                </span>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </div>
        </form>

        {/* Footer Mode Switcher */}
        <div className="text-center pt-4 border-t border-slate-100 dark:border-slate-800">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          </span>
          <button 
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            disabled={isPending}
            className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-750 dark:hover:text-indigo-300 transition-colors disabled:opacity-50"
          >
            {isLogin ? 'Create Account' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
}
