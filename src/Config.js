export const liveUrl = "https://intileo-tech.info";
export const UserbaseUrl = `${liveUrl}/api/user`;
export const AdminbaseUrl = `${liveUrl}/api/admin`;
export const configureModal = `${UserbaseUrl}/`
export const getContactTableData = `${UserbaseUrl}/contact-data-master/get-list`


export const API_HEADER = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token")
    }
}