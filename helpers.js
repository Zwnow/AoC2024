export async function readFile(path) {
    const file = Bun.file(path);
    return await file.text();
}