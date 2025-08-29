export const metadata = {
  title: 'Mi App',
  description: 'Descripción de mi app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
