// /app/admin/createListeningTest/page.tsx

import CreateListeningTestForm from "@/components/admin/createListeningTestForm";

export default function CreateListeningTestPage() {
  return (
    <div>
      <h1 className="flex items-center justify-center py-5 text-3xl font-bold text-slate-600">
        Create Listening Test
      </h1>
      <CreateListeningTestForm />
    </div>
  );
}
