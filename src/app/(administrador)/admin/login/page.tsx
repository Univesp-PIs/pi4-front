'use client'

import Link from 'next/link'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

import { Button } from '@/components/Button'

import { useLogin } from './useLogin'
// import ReCAPTCHA from 'react-google-recaptcha'

export default function Login() {
  const {
    errors,
    showPassword,
    isSubmitting,
    // recaptchaKey,
    // handleRecaptchaChange,
    register,
    handleSubmit,
    setShowPassword,
    handleLogin,
  } = useLogin()

  return (
    <section className="w-full flex justify-center items-center min-h-[calc(100vh-95.83px)]">
      <div className="w-full max-w-screen-xl px-4 xl:px-0 py-4 lg:py-20 flex justify-center">
        <form
          className="w-full flex flex-col gap-16 items-center"
          onSubmit={handleSubmit(handleLogin)}
        >
          <div className="w-full flex flex-col gap-4 max-w-screen-md">
            <div className="flex flex-col gap-2">
              <label
                className="cursor-pointer font-bold text-xl"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                {...register('email')}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Email de acesso"
              />
              {errors.email && (
                <p className="text-red-500 text-center md:text-left">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label
                className="cursor-pointer font-bold text-xl"
                htmlFor="password"
              >
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  {...register('password')}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Senha de acesso"
                />
                {showPassword ? (
                  <FaRegEyeSlash
                    size={20}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute cursor-pointer right-4 top-0 translate-y-1/2 text-secondary"
                  />
                ) : (
                  <FaRegEye
                    size={20}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute cursor-pointer right-4 bottom-[30%] text-secondary"
                  />
                )}
              </div>
              {errors.password && (
                <p className="text-red-500 text-center md:text-left">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="w-full justify-center flex">
              <Button
                type="submit"
                variant="primary"
                title="Entrar"
                className="md:w-1/3"
                isLoading={isSubmitting}
              />
            </div>
            <Link
              href="/admin/criar-conta"
              className="text-center text-sm font-medium"
            >
              Criar conta
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}
