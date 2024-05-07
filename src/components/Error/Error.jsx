import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Error() {
  useEffect(() => {
    toast.error("Something gone wrong, try again", {
      duration: 3000,
      position: "top-right",
    });
  }, []);

  return <Toaster />;
}
