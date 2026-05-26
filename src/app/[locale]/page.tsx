import HomePage from "@/components/HomePage/Homepage";
import { getAllBlogs } from "@/utils/blog";

export default function Home() {
  const recentBlogs = getAllBlogs().slice(0, 3);

  return (
    <main className="min-h-dvh w-full bg-[#050505] ">
      <HomePage recentBlogs={recentBlogs} />
    </main>
  );
}
