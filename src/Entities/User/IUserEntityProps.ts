export interface IUserEntityProps {
  id: string,
  firstName: string,
  lastName: string,
  birthDate: string,
  city: string,
  country: string,
  email: string,
  password: string,
  role: string,
  passwordChangedAt: Date,
  passwordResetToken: string,
  passwordResetExpires: Date
}
