import { useAuth } from '@/app/providers/auth';
import { Submit } from '@/components/buttons/submit';
import { FormElement } from '@/components/form-item';
import { Form } from '@/components/ui/form';
import { registerSchema } from '@/schemas/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignal } from '@preact/signals-react';
import { useForm } from 'react-hook-form';

import type { z } from 'zod';

const Register = () => {
  const errortext = useSignal('');

  const emailSent = useSignal(false);
  const { register } = useAuth();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      displayName: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      const result = await register({ ...values });

      if (result) {
        emailSent.value = true;
      } else {
        errortext.value = 'User could not be created at this time';
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1 className="text-center text-2xl font-bold">{'Sign in to your account'}</h1>
      {emailSent ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="false" className="space-y-8">
            <FormElement
              control={form.control}
              name="displayName"
              label="Username"
              description="This is your display name"
            />
            <FormElement
              control={form.control}
              name="email"
              label="Email"
              description="Enter your preffered email"
            />
            <FormElement
              control={form.control}
              name="password"
              type="password"
              label="Password"
              description="Enter your password."
            />
            <FormElement
              control={form.control}
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              description="Confirm your password."
            />
            <Submit title="Create Account" disabled={false} />
            <div className="text-center">
              <a className="color-main-primary text-informational" href="/auth/login">
                Back to login
              </a>
            </div>
            <p className="color-error-primary text-informational text-center">{errortext.value}</p>
          </form>
        </Form>
      ) : (
        <div className="text-informational text-main text-center mt-10">
          <p>Account created! Check your email to verify your email</p>
        </div>
      )}
    </>
  );
};

export default Register;
