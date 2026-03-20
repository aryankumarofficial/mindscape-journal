"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Controller, useForm } from "react-hook-form";
import { loginSchema, type LoginSchema } from "../../lib/validators/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserThunk } from "@/features/auth/authThunk";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
export default function LoginPage() {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(error || `Something went wrong!`);
    }
  },[error])


  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginSchema) => {

    try {
    const res = await dispatch(loginUserThunk(values));

      if (!error) toast.success("Logged in Successfully!");
      setTimeout(() => {
        if (loginUserThunk.fulfilled.match(res)) {
          router.push("/profile");
        }
      }, 1000);
    } catch (error) {
      console.log("lg err",error)
      toast.error((error as Error).message || `Failed to log in`);
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

        <Button className="w-full cursor-pointer hover:bg-foreground/80 transition-all">
          {form.formState.isSubmitting
            ? <span className="flex flex-row justify-center items-center gap-2 font-medium">
            <Loader2 size={25} className="animate-spin" />
            Logging In
            </span>
            : <span className="flex flex-row justify-center items-center gap-2 font-medium">
              Login
            </span>
          }
        </Button>
         </form>
       </div>
     )

}
