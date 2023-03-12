class MockUser {
  private users : string[]

  public signUpUser (data) {
    this.users.push(data)
  }
}
