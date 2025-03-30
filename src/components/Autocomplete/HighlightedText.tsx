const HighlightedText = ({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
}) => {
  const startIndex = text.toLowerCase().indexOf(highlight.toLowerCase());
  if (startIndex < 0) {
    return <span>{text}</span>;
  }

  const wordLength = highlight.length;
  const parts = text.split("");

  return (
    <span>
      {parts.map((part, index) => (
        <span
          key={index}
          style={
            startIndex > -1 &&
            index >= startIndex &&
            index < wordLength + startIndex
              ? { fontWeight: "bold" }
              : {}
          }
        >
          {part}
        </span>
      ))}
    </span>
  );
};

export default HighlightedText;
