import { useState, useEffect } from "react";

export default function useStores(username) {
  const [state, setState] = useState({
    loading: true,
    stores: [],
    error: null,
  });

  useEffect(() => {
    async function fetchStores() {
      const blob = await fetch(`/api/store/get?username=${username}`);
      const response = await blob.json();
      if (blob.ok) {
        setState({ stores: response.data });
      } else {
        setState({ error: response });
      }
    }

    if (!username) {
      setState({ error: "Username needs to be provided" });
    } else {
      fetchStores();
    }
  }, [username]);

  return state;
}
