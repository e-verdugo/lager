import config from "../config/config.json";
import Invoices from "../interfaces/invoices";
import Order from "../interfaces/order";


const invoices = {
    getInvoices: async function getInvoices() {
        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
            headers: {
                'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZDIyMzMyM2U2Mzg2MTNmYTk5MTFmYTk3ZjQxYmQ4NzkiLCJlbWFpbCI6InRlc3RAdGVzdC50ZXN0IiwiaWF0IjoxNjUwMjI4OTE5LCJleHAiOjE2NTAzMTUzMTl9.pSHBggjhcWUq49oaP6rnpP3y0WfKapmrOoPwYcjFQjo"
            },
            method: 'GET'
        });
        const result = await response.json();
        return result.data;
    },
    addInvoice: async function addInvoice(order: Partial<Order>) {
        // make order usable as invoice
        try {
            await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
                body: JSON.stringify(order),
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiZDIyMzMyM2U2Mzg2MTNmYTk5MTFmYTk3ZjQxYmQ4NzkiLCJlbWFpbCI6InRlc3RAdGVzdC50ZXN0IiwiaWF0IjoxNjUwMjI4OTE5LCJleHAiOjE2NTAzMTUzMTl9.pSHBggjhcWUq49oaP6rnpP3y0WfKapmrOoPwYcjFQjo"
                },
                method: 'POST'
            });
        } catch (error) {
            console.log("Could not add invoice");
        }
    },
};

export default invoices;