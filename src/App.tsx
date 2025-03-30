import { useCallback, useState } from "react";
import Autocomplete from "./components/Autocomplete";
import { Item } from "./components/Autocomplete/types";

const API_URL = "https://jsonplaceholder.typicode.com/users/";

type UserListResponse = {
  id: number;
  name: string;
  username: string;
  email: string;
}[];

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<{
    id: string | number;
    name: string;
  } | null>(null);
  const [options, setOptions] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  // With this function i'm fetching from a real API
  // but filtering the results in the client side 
  // because the API doesn't support filtering query params filter
  const fetchUsers = useCallback(async (query: string) => {
    if (!query || query.length <= 1) {
      setOptions([]);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(API_URL);
      const users: UserListResponse = await response.json();
      const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      ).map((user) => ({ id: user.id, name: user.name }));
      setOptions(filteredUsers);
    } catch (error) {
      setOptions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const handleSelect = (item: Item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <main>
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <Autocomplete
          onSelect={handleSelect}
          placeholder="Leanne Graham"
          debounceTime={500}
          options={options}
          open={isOpen}
          fetchSuggestions={fetchUsers}
          loading={isLoading}
        />

        {selectedItem && (
          <div>
            <h2>Selected User:</h2>
            <p>ID: {selectedItem.id}</p>
            <p>Name: {selectedItem.name}</p>
          </div>
        )}
      </div>
    </main>
  );
}
