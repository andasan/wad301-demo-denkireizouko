export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-full relative mx-auto my-auto px-4 sm:max-w-xl md:max-w-full md:px-8 lg:py-32 xl:px-20 flex place-content-center">
      {children}
    </section>
  );
}
