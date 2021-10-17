const getCurrentDate = () => {
        //31/02/0001
        const d = new Date();
        return `${d.getUTCDay()}/${d.getUTCMonth()}/${d.getUTCFullYear()}`;
}
const convertDate = (date) => {
        //31/02/0001 => 5 May, 2216
        const monthes = {"01": "January", "02": "February", "03": "March", 
                            "04": "April", "05": "May", "06": "June", "07": "July",
                            "08": "August", "09": "September", "10": "October",
                            "11": "November", "12":"December"}

        const separated = date.split('/')//day,month,year
        return `${separated[0]} ${monthes[separated[1]]}, ${[separated[2]]}`;
}
export { getCurrentDate, convertDate }