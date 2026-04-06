import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground Happy Kids | Rizquna",
  description:
    "Pesan tiket Playground Happy Kids secara online. Area bermain indoor anak yang aman, nyaman, dan edukatif. Harga Rp 25.000/anak termasuk 1 pendamping.",
};

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
