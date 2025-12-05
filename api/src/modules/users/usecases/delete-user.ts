import { NotFoundError } from "../../../http/err/AppError";
import { prisma } from "../../../lib/prisma";

export const deleteUser = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new NotFoundError("User");
  }
  const deletedUser = await prisma.user.delete({
    where: { id },
  });
  // Validação para verificar se o user foi realmente deletado
  // No Prisma, o método delete retorna o registro excluído,
  // então podemos checar se ele existe e se o ID bate.
  if (!deletedUser || deletedUser.id !== id) {
    throw new Error("Falha ao deletar o usuário.");
  }
};
