export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) return 'Email is required';
  if (!emailRegex.test(email)) return 'Invalid email format';
  return null;
};

export const validateSAPhoneNumber = (phone: string): string | null => {
  const phoneRegex = /^(?:\+27|0)[6-8][0-9]{8}$/;
  if (!phone.trim()) return 'Phone number is required';
  if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
    return 'Invalid SA phone number format (e.g., 0821234567 or +27821234567)';
  }
  return null;
};

export const validateCapacity = (capacity: number): string | null => {
  if (isNaN(capacity) || capacity < 0 || !Number.isInteger(capacity)) {
    return 'Capacity must be a positive whole number';
  }
  return null;
}; 