import { useRef, useEffect } from "react";

function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.body.addEventListener("click", handleClick, listenCapturing);

      return () => document.body.removeEventListener("click", handleClick);
    },
    [handler, listenCapturing]
  );

  return ref;
}
export default useOutsideClick;
