const DateComponent = () => {

    // Get the current date
    const currentDate = new Date();

    // Define arrays for days and months
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Get day of the week, month, and day of the month
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const month = monthsOfYear[currentDate.getMonth()];
    const dayOfMonth = currentDate.getDate();

    // Construct the formatted date string
    const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}`;

    return (
        <p className="hidden lg:block" >{formattedDate}</p>
    )
}

export default DateComponent