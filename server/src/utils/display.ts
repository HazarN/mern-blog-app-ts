// to display a message in the console with a border around it
export default function displayMessage(
  message: string,
  key: string,
  padding: number = 4
): string {
  const lineLength = message.length + padding;
  const border = key.repeat(lineLength);

  return `\n${border}\n  ${message}  \n${border}`;
}
