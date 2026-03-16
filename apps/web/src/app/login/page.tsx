"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { Controller, useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "../../lib/validators/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserThunk } from "@/features/auth/authThunk";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
export default function LoginPage() {
  
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const onSubmit = async (values: LoginSchema) => {
    const res = await dispatch(loginUserThunk(values));
 
    if (loginUserThunk.fulfilled.match(res)) {
      router.push("/dashboard");
    }
  };
  return (
    <div className="max-w-md mx-auto mt-20">
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
           
           <Controller
             name="email"
             control={form.control}
             render={({ field, fieldState }) => (
               <Field data-invalid={fieldState.invalid}>
                 <FieldLabel htmlFor="email">Email</FieldLabel>
   
                 <Input
                   {...field}
                   id="email"
                   type="email"
                   placeholder="email@example.com"
                   aria-invalid={fieldState.invalid}
                 />
   
                 {fieldState.invalid && (
                   <FieldError errors={[fieldState.error]} />
                 )}
               </Field>
             )}
           />
   
           <Controller
             name="password"
             control={form.control}
             render={({ field, fieldState }) => (
               <Field data-invalid={fieldState.invalid}>
                 <FieldLabel htmlFor="password">Password</FieldLabel>
   
                 <Input
                   {...field}
                   id="password"
                   type="password"
                   aria-invalid={fieldState.invalid}
                 />
   
                 {fieldState.invalid && (
                   <FieldError errors={[fieldState.error]} />
                 )}
               </Field>
             )}
           />
   
           <Button className="w-full">Login</Button>
         </form>
       </div>
     )
  
}