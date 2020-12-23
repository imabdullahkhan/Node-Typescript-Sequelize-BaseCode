export const SOCKET_ID_KEY = "sock:";
export const USER_ID_KEY = "user:";
// export const USER_OPERATOR_KEY ="operator:"

export const SocketEvents = {
    CONNECT: "connect",
    DISCONNECT: "disconnect",
    // SENDMESSAGE: "SENDMESSAGE",
    // NEWMESSAGE: "NEWMESSAGE",
    // BATTERYWARNING : "BATTERYWARNING",
    // GETPROFILESETTING : "GETPROFILESETTING",
    // UPDATEPROFILESETTING : "UPDATEPROFILESETTING"



    // GET_BATTERY_REQUEST : "GET_BATTERY_REQUEST",
    // SEND_BATTERY_REQUEST : "SEND_BATTERY_REQUEST",
    // GET_BATTERY : "GET_BATTERY",

    // GET_CONTACT_REQUEST : "GET_CONTACT_REQUEST",
    // GET_CONTACT : "GET_CONTACT"













    //JAB KOI REQUEST KAREGA TO CLIENT SE YEH EVENT FIRE HOGA
    UPDATE_PHONE_SETTING_REQUEST : "UPDATE_PHONE_SETTING_REQUEST",
    //JAB SERVER CLIENT KO BHEJEGA KY UPDATE KRO BHAI
    UPDATE_PHONE_SETTING_PROCESS_REQUEST : "UPDATE_PHONE_SETTING_PROCESS_REQUEST",
    // JAB UPDATE HOJAEGA TO YEH WALA EVENT FIRE HOGA KY BHAI HOGAYA H UPDATE
    UPDATED_PHONE_SETTING_LISTNER : "UPDATED_PHONE_SETTING_LISTNER",
    // JAB SERVER SUB KO BATAEGA KY UPDATE HOGAYA H
    UPDATE_PHONE_SETTING_RECIVER : "UPDATE_PHONE_SETTING_RECIVER",


    // JAB KOI REQUEST KAREGA KY BATTERY INFO CHYE
    GET_PHONE_BATTERY_INFO_REQUEST : "GET_PHONE_BATTERY_INFO_REQUEST",
    // JAB SERVER CLIENT SE BATTERY INFO BANGEGA
    GET_PHONE_BATTERY_INFO_REQUEST_PROCESS : "GET_PHONE_BATTERY_INFO_REQUEST_PROCESS",
    // JAB CLIENT BATTERY INFO SERVER KO BATAEGA
    GET_PHONE_BATTERY_LISTNER : "GET_PHONE_BATTERY_LISTNER",
    // JAB SERVER SUBKO BATTERY INFO BATAEGA
    GET_PHONE_BATTERY_RECIEVER : "GET_PHONE_BATTERY_RECIEVER"
};
