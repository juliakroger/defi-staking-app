const formatAddress = (address) => {
  if (!address) return null;
  const first = address.substring(0, 6);
  const last = address.substring(address.length - 5, address.length);

  return `${first}...${last}`;
};

export default formatAddress;
