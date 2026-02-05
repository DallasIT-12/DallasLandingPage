export const metadata = {
  title: 'Select Language - Dallas Company',
  description: 'Choose your preferred language',
};

export default function SelectLanguageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
