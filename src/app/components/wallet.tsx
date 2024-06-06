import React, { useState } from "react";
import { ethers } from "ethers";
import { Button } from "@nextui-org/react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function Wallet() {
  const [isCreating, setIsCreating] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [wallet, setWallet] = useState<null | string>(null);
  const handleWalletCreate = async () => {
    setIsCreating(true);

    let randomWallet = ethers.Wallet.createRandom();
    const { address, mnemonic } = randomWallet;
    await Swal.fire({
      title: "Save this mnemonic",
      html: `<div class="text-center">You won't be able to save it once you close this. Take a screenshot or copy and save the text in a safe place for future use <br><div style="padding: 20px; border: 1px solid gray;margin: 10px; border-radius: 8px"><b>${mnemonic.phrase}</b></div></div>`,
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Yes, I've saved.",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.close();
        setIsCreating(false);
        setWallet(address);
        toast("Wallet created successfully");
      }
    });
  };
  const handleWalletRecover = async () => {
    setIsRecovering(true);
    await Swal.fire({
      input: "textarea",
      inputLabel: "Mnemonic",
      inputPlaceholder: "Paste your mnemonic here...",
      inputAttributes: {
        "aria-label": "Paste your mnemonic here...",
      },
      allowOutsideClick: false,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value) {
            resolve();
          } else {
            resolve("Please paste your mnemonic here");
          }
        });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.close();
        let mnemonic = result.value.trim();
        try {
          const wallet = ethers.Wallet.fromPhrase(mnemonic);
          setWallet(wallet.address);
          toast("Wallet Recovered successfully");
        } catch (error) {
          toast.error("Invalid mnemonic");
        } finally {
          setIsRecovering(false);
        }
      }
    });
  };

  const handleWalletClear = () => {
    setWallet(null);
  };

  return (
    <div className="flex bg-slate-900 items-center justify-center text-lg radius-bottom main-content">
      <div className="flex flex-col gap-5 items-center">
        <div className="text-4xl">What do you want to do today ?</div>
        <Button
          isLoading={isCreating}
          color="primary"
          className="shadow-sm shadow-blue-500/50 max-w-xs w-full"
          onClick={handleWalletCreate}
        >
          Create Wallet
        </Button>
        <Button
          isLoading={isRecovering}
          color="secondary"
          className="shadow-sm shadow-blue-500/50 max-w-xs w-full"
          onClick={handleWalletRecover}
        >
          Recover Wallet
        </Button>
        {wallet && (
          <div className="text-center">
            <div className="text-2xl">Your Wallet Address</div>
            <div className="text-lg">{wallet}</div>
            <Button
              color="danger"
              className="shadow-sm shadow-blue-500/50 min-w-2"
              onClick={handleWalletClear}
            >
              Clear Wallet
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
