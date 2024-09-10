"use client";

import HomePage from "@/Components/HomePage";
import { Header, Footer } from "hippo-guest-component-library";

export default function Home() {
  return (
    <>
      <Header
        user={{
          accessToken: "",
          notificationsToken: "",
          userInfo: {
            id: 0,
            email: "",
            avatar: "",
            firstName: "",
            lastName: "",
            gender: "",
            country: "",
            userType: "",
            unreadMessagesCount: 0,
            unreadNotificationsCount: 0,
          },
        }}
        handleLogout={function (): void {
          throw new Error("Function not implemented.");
        }}
        handleCurrencyUpdate={function ({
          countryCode,
          exchangeRate,
          currency,
        }: {
          countryCode: string;
          exchangeRate: number;
          currency: string;
        }): void {
          throw new Error("Function not implemented.");
        }}
      />
      <main>
        <HomePage />
      </main>
      <Footer />
    </>
  );
}
