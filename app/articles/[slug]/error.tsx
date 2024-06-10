"use client";

export default function ErrorPage() {
  return (
    <div style={{ padding: "var(--size-9)" }}>
      <h1>Could not find this article 😿</h1>
      <p
        style={{
          fontSize: "var(--font-size-5)",
          color: "var(--text-4)",
        }}
      >
        I swear I looked everywhere, but it&apos;s nowhere to be
        found...
      </p>
    </div>
  );
}
