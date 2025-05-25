import { PricingTable } from "@clerk/nextjs";
import React from "react";
import Image from "next/image";
import "./subscription.css";

const Subscription = () => {
  return (
    <main>
      <div className="flex flex-col items-center gap-8 w-full">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Upgrade Your Experience</h1>
          <p className="text-lg text-muted-foreground">
            Choose the perfect plan to enhance your learning journey with our AI companions
          </p>
        </div>

        <div className="w-full max-w-6xl rounded-4xl py-5">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="p-2">
                <Image src="/images/logo.svg" alt="logo" width={30} height={30} />
              </div>
              <span className="font-semibold text-xl">Converso Premium</span>
            </div>
            <div className="bg-cta-gold rounded-4xl px-4 py-2 text-black font-medium">
              Unlock All Features
            </div>
          </div>

          <div className="clerk-pricing-table">
            <PricingTable 
              appearance={{
                elements: {
                  card: "rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow",
                  formButtonPrimary: "bg-primary hover:bg-primary/90 text-white",
                  formButtonReset: "text-primary hover:text-primary/90",
                  headerTitle: "text-2xl font-bold",
                  headerSubtitle: "text-muted-foreground",
                  priceAmount: "text-2xl font-bold text-primary",
                  pricePeriod: "text-muted-foreground",
                  featuresTitle: "font-semibold",
                  featuresListItem: "flex items-center gap-2",
                  footerActionText: "text-primary hover:text-primary/90",
                },
                variables: {
                  colorPrimary: "#fe5933",
                  colorText: "#2c2c2c",
                  borderRadius: "0.625rem",
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: {
                    normal: 400,
                    medium: 500,
                    bold: 700,
                  },
                }
              }}
            />
          </div>
        </div>

      </div>
    </main>
  );
};

export default Subscription;
