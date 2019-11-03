/**
 * Generates random id from date
 */
export const generateId = () => {
    return new Date().toISOString();
}