class Validator {
  public validate (EntityValidator, props) {
    const keys = Object.keys(props)
    const propsToValidate = {}

    keys.forEach((key) => {
      propsToValidate[key] = true
    })

    const ChosenProps = EntityValidator.pick(propsToValidate)

    const validation = ChosenProps.safeParse(props)

    if (validation.success === false) {
      const errors = validation.error.errors.map(error => {
        const { code, path, message } = error
        return { code, path, message }
      })

      return errors
    }
  }
}

export const validator = new Validator()
