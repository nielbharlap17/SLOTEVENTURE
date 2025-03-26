import Footer from "@/components/shared/Footer"
import Header from "@/components/shared/Header"
import SponsorSlider from "@/components/shared/SponsorSlider"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">{children}</main>
      <SponsorSlider />
      <Footer />
    </div>
  )
}
