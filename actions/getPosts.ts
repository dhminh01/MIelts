export async function getPosts() {
  const response = await fetch("/api/posts");
  if (!response.ok) throw new Error("Failed to fetch posts");
  return await response.json();
}
