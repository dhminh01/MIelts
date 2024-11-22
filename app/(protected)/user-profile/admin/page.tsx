"use client";

import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ROLE } from "@prisma/client";
import { useRouter } from "next/navigation";

export const AdminPage = () => {
  const router = useRouter();

  // const onApiRouteClick = () => {
  //   fetch("/api/admin").then((response) => {
  //     if (response.ok) {
  //       toast.success("Allowed API Route!");
  //     } else {
  //       toast.error("Forbidden API Route!");
  //     }
  //   });
  // };

  return (
    <Card className="w-full ">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={ROLE.ADMIN}>
          <FormSuccess message="You are allow to see this content" />
        </RoleGate>
        {/* <div className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-md">
          <p className="text-sm font-medium">Admin-only API Route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div> */}
        <div className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-md">
          <p className="font-medium">Quản lý tài khoản người dùng</p>
          <Button onClick={() => router.push("/admin/accounts/user-accounts")}>
            Click Here
          </Button>
        </div>
        <div className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-md">
          <p className="font-medium ">Quản lý bài luyện thi</p>
          <Button onClick={() => router.push("/admin/tests/manage-tests")}>
            Click Here
          </Button>
        </div>
        <div className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-md">
          <p className="font-medium ">Tạo bài luyện thi Listening</p>
          <Button
            onClick={() => router.push("/admin/tests/create-listening-test")}
          >
            Click Here
          </Button>
        </div>
        <div className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-md">
          <p className="font-medium ">Tạo bài luyện thi Reading</p>
          <Button
            onClick={() => router.push("/admin/tests/create-reading-test")}
          >
            Click Here
          </Button>
        </div>
        <div className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-md">
          <p className="font-medium ">Tạo bài luyện thi Writing</p>
          <Button
            onClick={() => router.push("/admin/tests/create-writing-test")}
          >
            Click Here
          </Button>
        </div>
        <div className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-md">
          <p className="font-medium ">Tạo bài luyện thi Speaking</p>
          <Button
            onClick={() => router.push("/admin/tests/create-speaking-test")}
          >
            Click Here
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default AdminPage;
