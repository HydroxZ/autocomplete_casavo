import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import styles from "./Autocomplete.module.css";
import { useDebounce } from "../../hooks/useDebounce";
import { AutocompleteProps, Item } from "./types";
import SuggestionItem from "./SuggestionItem";

const Autocomplete = ({
  placeholder = "Search...",
  className = "",
  debounceTime = 300,
  options = [],
  loading = false,
  fetchSuggestions,
  onSelect,
  closeOnClickOutside = true,
}: AutocompleteProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const debouncedValue = useDebounce<string>(inputValue, debounceTime);
  // Using ref to keep the input uncontrolled and avoid unnecessary re-renders
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLUListElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleOpen = (): void => {
    if (options.length) setIsOpen(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (!options.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      e.preventDefault();
      onSelect(options[focusedIndex]);
      setFocusedIndex(-1);
      if (inputRef.current) {
        inputRef.current.value = options[focusedIndex].name;
      }
      setIsOpen(false);
    }
  };

  const onSuggestionClick = (selection: Item): void => {
    onSelect(selection);
    if (inputRef.current) {
      inputRef.current.value = selection.name;
    }
    setIsOpen(false);
  };

  const handleClickOutside = (e: MouseEvent): void => {
    const target = e.target as Node;
    const isInputClick = inputRef.current && inputRef.current.contains(target);
    const isSuggestionClick =
      suggestionsRef.current && suggestionsRef.current.contains(target);

    if (!isInputClick && !isSuggestionClick) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (debouncedValue && debouncedValue.length > 1) {
      if (fetchSuggestions) {
        fetchSuggestions(debouncedValue);
        setIsDirty(true);
        setIsOpen(true);
      }
    } else setIsOpen(false);
  }, [debouncedValue, fetchSuggestions]);

  useEffect(() => {
    if (closeOnClickOutside) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeOnClickOutside]);

  const isEmpty = !options.length && inputValue.length > 1 && isDirty;
  
  return (
    <div className={`${styles.container} ${className}`}>
      <div>
        <label htmlFor="autocomplete" className={styles.label}>
          Search users
          <div style={{ position: "relative", display: "flex" }}>
            <input
              id={"autocomplete"}
              ref={inputRef}
              name="autocomplete"
              autoComplete="off"
              type="text"
              onClick={handleOpen}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              aria-activedescendant={"suggestion"}
              aria-autocomplete="list"
              className={styles.input}
            />
            {loading && <div className={styles.loader}></div>}
          </div>
        </label>
        {isOpen && !isEmpty && (
          <ul className={styles.suggestionsList} ref={suggestionsRef}>
            {options.map((suggestion, index) => (
              <SuggestionItem
                key={suggestion.id}
                suggestion={suggestion}
                isFocused={focusedIndex === index}
                onClick={() => onSuggestionClick(suggestion)}
                inputValue={inputValue}
              />
            ))}
          </ul>
        )}
        {isEmpty && <div className={styles.noResults}>No results found</div>}
      </div>
    </div>
  );
};


export default Autocomplete;
