export type UserType = {
  userId: number;
  role: string;
  token: string;
};

export const decodeJWT = (token: string): UserType => {
  const parts = token.split(".");

  if (parts.length !== 3) throw new Error("Invalid JWT format");

  const payload = atob(parts[1]);

  const data = JSON.parse(payload);

  return {
    userId: data.userId,
    role: data.role,
    token,
  };
};
