export function convertDateFormat(dateString) {
    if (!dateString) {
        return '';
    }
    const parts = dateString.split("-");
    const newDate = `${parts[0]}`;
    return newDate;
}