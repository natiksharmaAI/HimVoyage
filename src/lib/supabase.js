import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fsqqiqkvbquiqietwlje.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzcXFpcWt2YnF1aXFpZXR3bGplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE3MDkyNDAsImV4cCI6MjEwNzI4NTI0MH0.cqfITbr76O39aeheupmVJZxZb5sUKWl4qXdZb1fju4A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Saves a new booking to the Supabase database
 */
export async function createBooking(bookingData) {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select();

    if (error) {
      console.error('Supabase booking error:', error);
      return { success: false, error: error.message };
    }
    return { success: true, data: data[0] };
  } catch (err) {
    console.error('Unexpected booking error:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Saves a new custom trip inquiry to the Supabase database
 */
export async function createInquiry(inquiryData) {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .insert([inquiryData])
      .select();

    if (error) {
      console.error('Supabase inquiry error:', error);
      return { success: false, error: error.message };
    }
    return { success: true, data: data[0] };
  } catch (err) {
    console.error('Unexpected inquiry error:', err);
    return { success: false, error: err.message };
  }
}

/**
 * Saves a newsletter subscriber
 */
export async function subscribeNewsletter(emailOrPhone) {
  try {
    const isEmail = emailOrPhone.includes('@');
    const payload = isEmail ? { email: emailOrPhone } : { phone: emailOrPhone };
    
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([payload])
      .select();

    if (error) {
      console.error('Supabase newsletter error:', error);
      return { success: false, error: error.message };
    }
    return { success: true, data: data[0] };
  } catch (err) {
    console.error('Unexpected newsletter error:', err);
    return { success: false, error: err.message };
  }
}
