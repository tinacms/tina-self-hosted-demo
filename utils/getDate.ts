export function getDDMMYYYFormateDate(stringDate: string) {
    const date = new Date(stringDate);
    const day = date.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}