export default function extractCodeAndLanguage(response) {
  const codeBlocks = response.match(/```([\s\S]*?)```/g);

  if (!codeBlocks) {
    return null; // Якщо блоків коду не знайдено, повертаємо null або можна обробити інакше за потребою.
  }

  const languages = codeBlocks.map((block) => {
    const match = block.match(/```(\w+)/);
    return match ? match[1] : null;
  });

  return { codeBlocks, languages };
}
