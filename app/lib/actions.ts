'use server';

import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

export async function authenticate(prevState: any, formData: FormData) {
  // Extract data from the FormData payload
  const email = formData.get('email');
  const password = formData.get('password');
  const mode = formData.get('mode'); // 'login' or 'signup'
  
  // Simulate a database/auth delay for demonstration
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  if (!email || !password) {
    return {
      message: 'Please enter both email and password.',
      error: true
    };
  }
  
  // Simulate basic validation
  if (password.toString().length < 6) {
    return {
      message: 'Password must be at least 6 characters long.',
      error: true
    };
  }
  
  // In a real application, you would connect to Firebase or your DB here
  console.log(`Server Action: Successfully processed ${mode} for ${email}`);
  
  // Next.js redirect to home page on success
  redirect('/');
}

export async function forceRefreshMovies() {
  console.log('Force refreshing movies cache...');
  // Invalidate the cache tags using stale-while-revalidate semantics
  // The second argument 'max' gives the longest stale window.
  revalidateTag('movies', 'max');
  revalidateTag('movie-details', 'max');
}
