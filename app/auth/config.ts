export const config = {
  runtime: 'edge',
};

export default async function AuthConfig() {
  return Response.json({ message: 'Rota de autenticação' });
}
