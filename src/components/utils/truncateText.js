export function trimContent(content, maxLength) {
  console.log("ye rha content",content)
  if (content.length > maxLength) {
    return content.slice(0, maxLength) + "...";
  }
  return content;
}
