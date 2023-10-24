import createRequest from "./api/createRequest";
import { url } from "./url";

export function getList() {
    createRequest(url.allTickets);
};
