export interface Item {
  id: string | number;
  name: string;
}

export interface AutocompleteProps {
  /**
   * Placeholder text for the input field.
   * @default "Search..."
   */
  placeholder?: string;

  /**
   * Callback function triggered when an item is selected.
   */
  onSelect: (item: Item) => void;

  /**
   * Additional CSS class for the container.
   */
  className?: string;

  /**
   * Debounce time in milliseconds for input changes.
   * @default 300
   */
  debounceTime?: number;

  /**
   * List of options to display in the suggestions.
   */
  options: Item[];

  /**
   * Function to fetch suggestions based on user input.
   */
  fetchSuggestions?: (userInput: string) => void;

  /**
   * Whether the suggestions dropdown is open.
   * @default false
   */
  open?: boolean;

  /**
   * Whether the component is in a loading state.
   */
  loading?: boolean;

  /**
   * Whether to close the suggestions dropdown when clicking outside.
   * @default true
   */
  closeOnClickOutside?: boolean;
}
