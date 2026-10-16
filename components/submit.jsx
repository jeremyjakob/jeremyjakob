import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useFormStatus } from "react-dom";

export default function SubmitBtn() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="group flex items-center justify-center gap-2 h-[3rem] w-[8rem] text-pink-50 bg-zinc-900 text-white rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 transition-all focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105"
      disabled={pending}
    >
      {pending ? (
        <span role="status">Sending…</span>
      ) : (
        <>
          Submit
          <FaPaperPlane className="text-xs opacity-70 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />{" "}
        </>
      )}
    </button>
  );
}
