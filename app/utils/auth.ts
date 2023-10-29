import bcrypt from 'bcrypt';


export const getHashedString = async (plainText: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashString = await bcrypt.hash(plainText, salt);
  return hashString
}

export const compareHashString = async (plainText: string, hashString: string) => {
  const result = await bcrypt.compare(plainText, hashString);
  return Boolean(result)
}