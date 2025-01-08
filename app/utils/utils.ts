
//function to calculate the time difference
export function timeAgo(isoDateString: string): string {
    const now = new Date();
    const inputDate = new Date(isoDateString);
  
    if (isNaN(inputDate.getTime())) {
      throw new Error('Invalid ISO date string');
    }
  
    const diffInMs = now.getTime() - inputDate.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);
  
    if (diffInYears > 0) {
      return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
    }
    if (diffInMonths > 0) {
      return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
    }
    if (diffInDays > 0) {
      return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    }
    if (diffInHours > 0) {
      return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    }
    if (diffInMinutes > 0) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    return 'just now';
  }

  //function to get bedroom display
  export function getBedroomDisplay(bedroom : string | undefined){
    if(!bedroom){
        return null; 
    }
    if(bedroom === "Studio"){
        return "Studio"
    }
    else if(bedroom === "One"){
        return "1"
    }
    else if(bedroom === "Two"){
        return "2"
    }
    else if(bedroom === "Three"){
        return "3"
    }
    else if(bedroom === "Four_Plus"){
        return "4+"
    }
    else{
        return "null"
    }
  }

  //function to get the number of bathrooms
  export function getBathrooms(bathroom : string | undefined){
    if(!bathroom){
        return null ;
    }
    if(bathroom === 'One'){
        return "1"
    }
    else if(bathroom === 'Two'){
        return "2"
    }
    else if(bathroom === 'Three_Plus'){
        return "3+"
    }
    else{
        return "null"
    }
  }

  //function to get initials by inputting the sting
  export const getInitials = (name: string | undefined) => {
    if(!name){
        return null; 
    }
    const nameParts = name.split(' ');
    const initials = nameParts
      .map(part => part.charAt(0).toUpperCase())
      .join('');
    return initials;
  };

  //function to create a title for each listing
  export const createTitleForListing = (looking_for: boolean | undefined, category: string | undefined) => {
    if(!category){
        return null ; 
    }
    const formattedCategory = category.toLowerCase().replace(/_/g, " "); // Convert to lowercase and replace underscores
    if (looking_for === false) {
      return `Selling ${formattedCategory}`;
    } else {
      return `Looking for ${formattedCategory}`;
    }
  };

  //function to format number of months to x years and y months 
  export function formatMonthsToYearsAndMonths(months : number | undefined) {

    if(!months){
        return null; 
    }

    const years = Math.floor(months / 12); // Calculate the number of years
    const remainingMonths = months % 12;  // Calculate the remaining months

    let result = '';
    if (years > 0) {
        result += `${years} year${years > 1 ? 's' : ''}`;
    }
    if (remainingMonths > 0) {
        if (result) result += ' and ';
        result += `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
    }

    return result || '0 months'; // Fallback for 0 months input
}

//replace underscores with blank spaces
export function replaceUnderscoresWithSpaces(inputString:string | undefined) {
    if(!inputString){
      return null; 
    }
    return inputString.replace(/_/g, ' ');
  }