import { Suspense } from 'solid-js';
import Champions from "~/components/League/Champions";

export default function Home() {
  return (
    <main class="text-center mx-auto text-gray-700 p-12">
      <h1 class="max-6-xs text-6xl text-sky-700 uppercase my-16 font-extrabold">League Champions</h1>
      <Champions />
    </main>
  );
}
