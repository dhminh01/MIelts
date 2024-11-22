"use server";
import { fetchTestsBySkill } from "@/actions/manage-tests";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { skill: string } }
) {
  try {
    const tests = await fetchTestsBySkill(params.skill);
    return NextResponse.json(tests);
  } catch (error) {
    return NextResponse.error();
  }
}
