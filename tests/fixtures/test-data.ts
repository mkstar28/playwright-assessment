export const CREDENTIALS = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
  problem: { username: 'problem_user', password: 'secret_sauce' },
} as const;

export const CHECKOUT_INFO = {
  firstName: 'John',
  lastName: 'Doe',
  postalCode: '12345',
} as const;
