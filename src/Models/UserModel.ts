import { Schema, model, Document } from 'mongoose'
import { hash, compare } from 'bcrypt'
import validator from 'validator'
import crypto from 'crypto'
// import crypto from 'crypto'
export interface IUserSchema extends Document {
  firstName: string
  lastName: string
  birthDate: Date
  city: string
  country: string
  email: string
  password: string
  confirmPassword: string
  role: string[]
  passwordChangedAt: Date
  changedPasswordAfter(JWTTimestamp): boolean
  verifyPass(candidatePassword, userPassword): Promise<boolean>
  passwordResetToken: string
  passwordResetExpires: Date,
  createPasswordResetToken(): string
}

const UserSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    birthDate: Date,
    city: String,
    country: String,
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, 'Email is required'],
      validate: [validator.isEmail, 'Provide a valid email.']
    },
    password: {
      type: String,
      selected: false
    },
    confirmPassword: String,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    passwordChangedAt: {
      type: Date,
      default: new Date()
    },
    passwordResetToken: {
      type: String,
      default: ''
    },
    passwordResetExpires: {
      type: Date,
      default: new Date()
    }
  },
  { versionKey: false }
)

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await hash(this.password, 12)

  this.confirmPassword = undefined
  next()
})

UserSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next()

  this.passwordChangedAt = (Date.now() - 1000) as unknown as Date
  next()
})

UserSchema.methods.verifyPass = async function (
  candidatePassword,
  userPassword
) {
  return await compare(candidatePassword, userPassword)
}

UserSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.passwordChangedAt.getTime() / 1000,
      10
    )

    return JWTTimestamp < changedTimestamp
  }

  return false
}

UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex')

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000

  return resetToken
}

export default model<IUserSchema>('User', UserSchema)
