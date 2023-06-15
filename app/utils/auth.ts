import bcrypt from 'bcrypt';

const saltRounds = 10;

export const getHashString = async (plainText: string) => {
  const hashString = await bcrypt.hash(plainText, saltRounds);
  return hashString
}


export const compareHashString = async (plainText: string, hashString: string) => {
  const result = await bcrypt.compare(plainText, hashString);
  return Boolean(result)
}