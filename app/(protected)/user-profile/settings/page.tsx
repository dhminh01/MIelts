import { auth, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
const SettingsPage = async () => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
          revalidatePath("/");
        }}
      >
        <button type="submit">Đăng xuất</button>
      </form>
    </div>
  );
};

export default SettingsPage;
