import { auth, signOut } from "@/auth";
const SettingsPage = async () => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button type="submit">Đăng xuất</button>
      </form>
    </div>
  );
};

export default SettingsPage;
