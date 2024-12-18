"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";

import { CardWrapper } from "./card-wrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";
import { useRouter } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError(""); // Reset error and success messages before submission
    setSuccess("");

    // Start the login process
    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) {
          setError(data.error); // Set error if login fails
        } else {
          // setSuccess(data.success); // Set success if login is successful
          router.push(DEFAULT_LOGIN_REDIRECT); // Redirect after successful login
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Đăng nhập vào MIelts"
      backButtonLabel="Chưa có tài khoản? Đăng ký ngay"
      backButtonHref="/auth/register"
      showSocial
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="Nhập email..."
                          type="email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="******"
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
            {/* Display error or success message if applicable */}
            {error && <FormError message={error} />}
            {/* {success && <FormSuccess message={success} />} */}
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>
        </Form>
      </div>
    </CardWrapper>
  );
};
