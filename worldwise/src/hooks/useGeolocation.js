import { useState } from "react";

function useLocation() {
  const [isLoadingPosition, setLoadingPosition] = useState(null);
  const [position, setPosition] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      throw new Error("Your broswer does not support geolocation");
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  async function getLocation() {
    setLoadingPosition(true);
    try {
      const pos = await getPosition();
      setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    } catch (e) {
      alert(e.message);
    } finally {
      setLoadingPosition(false);
    }
  }

  return { isLoadingPosition, position, getLocation };
}

export default useLocation;
