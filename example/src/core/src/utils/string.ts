export const dashToCamelCase = function(str: string): string {
    return str.replace(/\-(\w)/g, function(all, letter){
        return letter.toUpperCase();
    });
}
