export function formatDate(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
}