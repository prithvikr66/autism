export function isLink(message: string) {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-zA-Z0-9%_.~+]*)*" +
      "(\\?[;&a-zA-Z0-9%_.~+=-]*)?" +
      "(\\#[-a-zA-Z0-9_]*)?$",
    "i"
  );
  return urlPattern.test(message);
}
export function isSolanaContractAddress(message: string) {
  const solanaAddressPattern = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
  return solanaAddressPattern.test(message);
}
