export const liveUrl = "https://intileo-tech.info";
export const UserbaseUrl = `${liveUrl}/api/user`;
export const AdminbaseUrl = `${liveUrl}/api/admin`;

// register url
export const registerUrl = `${liveUrl}/api/register`;
// login url
export const loginUrl = `${liveUrl}/api/login`;
// USER URL
export const configureModal = `${UserbaseUrl}/`
export const BuyNowUrl = `${UserbaseUrl}/user-select-plan`;
export const getContactTableData = `${UserbaseUrl}/contact-data-master/get-list`;
export const getFetchQuestionUrl = `${UserbaseUrl}/question/get-user-question`;
export const fetchContactDataUrl = `${UserbaseUrl}/contact-data-master/get-list`;
export const addSenderUrl = `${UserbaseUrl}/email-config/new-sender`;
export const verifyEmailConfig =`${UserbaseUrl}/email-config/verified-email-config`;
// ADMIN URL
export const getCompanyTypeUrl = `${AdminbaseUrl}/company_type/index`;
export const getIndustryTypeUrl= `${AdminbaseUrl}/industry/index`;
export const planUrl = `${AdminbaseUrl}/plan/plantype`;
export const questionFormUrl1 = `${AdminbaseUrl}/question/index`;

export const API_HEADER = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token")
    }
}