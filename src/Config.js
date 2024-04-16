export const liveUrl = "https://intileo-tech.info";
export const UserbaseUrl = `${liveUrl}/api/user`;
export const AdminbaseUrl = `${liveUrl}/api/admin`;

// register url
export const registerUrl = `${liveUrl}/api/register`;
// login url
export const loginUrl = `${liveUrl}/api/login`;
// USER URL
export const configureModal = `${UserbaseUrl}/email-config/new-sender-update`;
export const BuyNowUrl = `${UserbaseUrl}/user-select-plan`;
export const getContactTableData = `${UserbaseUrl}/contact-data-master/get-list`;
export const getFetchQuestionUrl = `${UserbaseUrl}/question/get-user-question`;
export const fetchContactDataUrl = `${UserbaseUrl}/contact-data-master/get-list`;
export const addSenderUrl = `${UserbaseUrl}/email-config/new-sender`;
export const verifyEmailConfig =`${UserbaseUrl}/email-config/verified-email-config`;
export const createContactFields = `${UserbaseUrl}/contact-data-master/contact-fields`;
// ADMIN URL
export const getCompanyTypeUrl = `${AdminbaseUrl}/company_type/index`;
export const getIndustryTypeUrl= `${AdminbaseUrl}/industry/index`;
export const planUrl = `${AdminbaseUrl}/plan/plantype`;
export const questionFormUrl1 = `${AdminbaseUrl}/question/index`;
export const questionFormUrl2 = `${UserbaseUrl}/answer/user-selected-programs`;
export const questionFormUrl3 = `${UserbaseUrl}/question/user-team-contact`;

export const API_HEADER = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token")
    }
}