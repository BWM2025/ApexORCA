import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-zinc-950">
          <p className="text-xl text-muted-foreground">Loading your downloads…</p>
        </div>
      }
    >
      <SuccessClient searchParams={params} />
    </Suspense>
  );
}
