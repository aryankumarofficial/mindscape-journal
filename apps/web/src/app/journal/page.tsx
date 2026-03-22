"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupTextarea } from "@/components/ui/input-group";
import { clearError } from "@/features/journal/journalSlice";
import { addJournalThunk, deleteJournalThunk, getJournalThunk } from "@/features/journal/journalThunk";
import { cn } from "@/lib/utils";
import { journalSchema, type Journal } from "@/lib/validators/journal.schema";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Leaf, Loader2, PenLine, RefreshCcw, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function JournalPage() {
  const dispatch = useAppDispatch();
  const { journals, error, loading } = useAppSelector(state => state.journals);
  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(error || `Something went wrong!`);
      dispatch(clearError());
    }
  }, [error, dispatch])


  useEffect(() => {
    return () => {
      dispatch(clearError())
    }
  }, [dispatch])


  const form = useForm<Journal>({
    resolver: zodResolver(journalSchema),
    defaultValues: {
      ambience: "",
      text: "",
    },
    mode: "onSubmit",
    reValidateMode: "onBlur"
  })

  const onSubmit = async (data: Journal) => {
    try {
      const res = await dispatch(addJournalThunk(data));
      if (addJournalThunk.fulfilled.match(res)) {
        toast.success("Journal added successfully!");
      }
    } catch (error) {
      toast.error((error as Error)?.message || `Failed to add journal`);
    } finally {
      form.reset();
    }
  }

  const refreshData = async () => {
    try {
      const res = await dispatch(getJournalThunk({ userId: user?.id ?? "" }));
      if (addJournalThunk.fulfilled.match(res)) {
        toast.success("Journal fetched successfully!");
      }
    } catch (error) {
      toast.error((error as Error)?.message || `Failed to fetch journal`);
    }
  }

  const deleteJournal = async (journalId: string) => {
    try {
      await dispatch(deleteJournalThunk({
        id:journalId
      }))
        .unwrap()
        .catch(() => {
          dispatch(getJournalThunk({ userId: user?.id || "" }))
        })
      toast.success(`Journal Deleted successfully`);
    } catch (error) {
      toast.error((error as Error).message || `Failed to delete Journal`);
    }
  }

  return (
    <section className="max-w-5xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">
          Your journals
        </h1>
        <div className="flex justify-center items-center flex-row gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="cursor-pointer text-3xl p-4 py-6" size={"lg"}>Add Journal</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle>Add new Journal</DialogTitle>
            </DialogHeader>
            <form className="space-y-4 flex justify-around items-center flex-col flex-wrap overflow-y-auto max-h-[60vh] pr-2" onSubmit={form.handleSubmit(onSubmit)}>
              <Controller
                name="ambience"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="ambience">
                      Ambience
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <Leaf className="text-green-700 fill-green-500"/>
                      </InputGroupAddon>
                      <InputGroupInput
                        {...field}
                        id={"ambience"}
                        type={"text"}
                        placeholder="forest"
                        aria-invalid={fieldState.invalid}
                      />
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]}/>
                    )}
                  </Field>
                )}
              />
              <Controller
                name="text"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="text">
                      Content
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <PenLine className="text-amber-500 fill-amber-100"/>
                      </InputGroupAddon>
                      <InputGroupTextarea
                        {...field}
                        id={"text"}
                        aria-invalid={fieldState.invalid}
                        className="max-h-50 min-h-25 resize-none overflow-y-auto"
                        onInput={(e) => {
                          const target = e.target as HTMLTextAreaElement;
                          target.style.height = "auto";
                          target.style.height = `${Math.min(target.scrollHeight,200)}px`;
                        }}
                      />
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]}/>
                    )}
                  </Field>
                )}
                />
                <DialogClose disabled={form.formState.isSubmitting || !form.formState.isValid} type="submit" className={cn(
                  buttonVariants({ variant: "default", size: "default" }),
                  `capitalize font-bold tracking-wide self-end w-full cursor-pointer`
                )}>
                {form.formState.isSubmitting
                  ? <span className="flex flex-row gap-2 items-center justify-center">
                    <Loader2 size={25} className="animate-spin" />
                    logging Journal
                  </span>
                  : <span>
                    Log Journal
                  </span>
                }
                </DialogClose>
            </form>
          </DialogContent>
        </Dialog>
        <Button
          size={"icon"}
          className="cursor-pointer hover:scale-105 transition-all duration-300"
          onClick={refreshData}
        >
          <RefreshCcw
            className={cn(loading && "animate-spin")}
          />
          </Button>
        </div>
      </div>

      {loading
        ? (
          <section className="flex flex-col justify-center items-center">
            <Loader2 size={100} className="animate-spin" />
          </section>
        )
        :journals.length === 0 ? (
          <p>
            No Journals yet. Start by adding one
          </p>
        )
        : (
          <div className="grid md:grid-cols-2 gap-4">
            {journals.map((journal, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-sm text-blue-500">
                    {journal.ambience}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {journal.text}
                  </CardDescription>
                </CardContent>
                <CardFooter className="justify-end">
                  <Button variant={"destructive"} className="cursor-pointer" onClick={async () => await deleteJournal(journal.id)}>
                    <Trash2 />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

    </section>
  )
}
