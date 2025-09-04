export interface ICreateUser {
  name: string
  email: string
  password: string
}

export interface ICreateUserAdmin {
  name: string
  email: string
  password: string
  auth_code: string
}
