-- CreateTable
CREATE TABLE "public"."Questionario" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Questionario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pergunta" (
    "id" SERIAL NOT NULL,
    "questionarioId" INTEGER NOT NULL,
    "texto" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,
    "opcoes" TEXT,

    CONSTRAINT "Pergunta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Resposta" (
    "id" SERIAL NOT NULL,
    "questionarioId" INTEGER NOT NULL,
    "perguntaId" INTEGER,
    "respostaTexto" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resposta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Pergunta" ADD CONSTRAINT "Pergunta_questionarioId_fkey" FOREIGN KEY ("questionarioId") REFERENCES "public"."Questionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Resposta" ADD CONSTRAINT "Resposta_questionarioId_fkey" FOREIGN KEY ("questionarioId") REFERENCES "public"."Questionario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Resposta" ADD CONSTRAINT "Resposta_perguntaId_fkey" FOREIGN KEY ("perguntaId") REFERENCES "public"."Pergunta"("id") ON DELETE SET NULL ON UPDATE CASCADE;
