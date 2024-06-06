"use client";
import { useState } from "react";
import { NextUIProvider, Switch } from "@nextui-org/react";
import Wallet from "./components/wallet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [isTraditional, setIsTraditional] = useState(true);

  return (
    <NextUIProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-12">
        <div className="bg-slate-800 w-full rounded-lg main-card">
          <div className="flex h-20 bg-slate-700 rounded-lg radius-top items-center justify-between text-lg">
            <div className="p-2">
              {isTraditional ? "Traditional Blockchain" : "ERC4337"}
            </div>
            <div className="justify-items-end text-center p-2">
              <div>ERC 4337</div>
              <div>
                <Switch
                  color="secondary"
                  isSelected={!isTraditional}
                  onValueChange={() => setIsTraditional(!isTraditional)}
                ></Switch>
              </div>
            </div>
          </div>
          {isTraditional ? <Wallet /> : <div>ERC 4337</div>}
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </main>
    </NextUIProvider>
  );
}
