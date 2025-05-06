import { Montserrat } from "next/font/google";
import "./globals.css";
import Nav from "@/components/shared/Nav";
import Footer from "@/components/shared/Footer";
import axiosInstance from "@/axios";
import { IGetData, IGetProducts } from "@/types";
import { Metadata } from "next";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "400", "500", "600", "700", "800", "900"],
});

export const metadata:Metadata = {
  title: {
    default: "Bloom",
    template: "%s - Bloom",
  },
  description: "Добро пожаловать в Bloom",
  keywords: ["косметика Ташкент"],
  applicationName: "Bloom",
  assets: "/assets/",
};

export const revalidate = 600;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const res = await axiosInstance.get("/get-data/");
  const getData: IGetData = res.data;
  const prods = await axiosInstance.get("/get-products/");
  const getProducts: IGetProducts = prods.data;
  return (
    <html lang="en">
      <body
        className={`${montserrat.className}  min-h-screen flex flex-col   antialiased`}
      >
        <Nav groups={getData.groups} getProducts={getProducts} />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
