import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Movie Website",
  description: "Next.js Movie Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-950"
       data-gptw="">
          <Navbar />
          {children}
          <Footer />
      </body>
    </html>
  );
}
