import { Schema, model, Document } from 'mongoose'
import { hash, compare } from 'bcrypt'
// import crypto from 'crypto'
interface IUserSchema extends Document {
  firstName: string,
  lastName: string,
  birthDate: Date,
  city: string,
  country: string,
  email: string,
  password: string,
  confirmPassword: string
  role: string[],
  passwordChangedAt: Date,
  passwordResetToken: string,
  passwordResetExpires: Date,
  changePasswordAfter(): void
}

const UserSchema = new Schema({
  _id: Schema.Types.Mixed,
  firstName: String,
  lastName: String,
  birthDate: Date,
  city: String,
  country: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  confirmPassword: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  events: [
    {
      type: String,
      ref: 'Event'
    }
  ]
})

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  this.password = await hash(this.password, 12)

  this.confirmPassword = undefined
  next()
})

UserSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next()

  this.passwordChangedAt = Date.now() - 1000 as unknown as Date
  next()
})

UserSchema.methods.verifyPass = async function (candidatePassword, userPassword) {
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

// futuramente pro reset do password
// UserSchema.methods.createPasswordResetToken = function () {
//   const resetToken = crypto.randomBytes(32).toString('hex')

//   this.passwordResetToken = crypto
//     .createHash('sha256')
//     .update(resetToken)
//     .digest('hex')

//   console.log({ resetToken }, this.passwordResetToken)

//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000

//   return resetToken
// }

export default model<IUserSchema>('User', UserSchema)
