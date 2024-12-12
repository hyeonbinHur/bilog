import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // 여기서 id를 추가
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
