'use client'

import Link from "next/link";

export default function Home() {
  return (
    <main className=" ">
      <h1 className="text-2xl font-bold">Mi nueva página limpia 🚀</h1>
      <br />
      <table className="border-2">
        <thead className="border-2">
          <th>Inicio Seison</th>
        </thead>
        <tr><Link href="/Auth/Login">Link</Link></tr>
      </table>
    </main>
  );
}
