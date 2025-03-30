import styles from "./Autocomplete.module.css";
import HighlightedText from "./HighlightedText";
import { Item } from "./types";

const SuggestionItem = ({
  suggestion,
  isFocused,
  onClick,
  inputValue,
}: {
  suggestion: Item;
  isFocused: boolean;
  onClick: () => void;
  inputValue: string;
}) => {
  return (
    <li
      className={`${styles.suggestionItem} ${isFocused ? styles.focused : ""}`}
      id="suggestion"
      onClick={onClick}
    >
      <HighlightedText text={suggestion.name} highlight={inputValue} />
    </li>
  );
};

export default SuggestionItem;
