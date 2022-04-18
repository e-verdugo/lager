import { Button, View, ScrollView, Text } from "react-native";
import { useEffect, useState } from "react";
import invoiceModel from "../models/invoices";
import authModel from '../models/auth';
import { Base, Typography } from "../styles";
import { DataTable } from "react-native-paper";

export default function Invoices({route, navigation}) {
    const [allInvoices, setAllInvoices] = useState([]);
    useEffect(() => {
        (async () => {
            setAllInvoices(await invoiceModel.getInvoices())
        })()
    }, []);
    let { reload } = route.params || false;

    if (reload) {
        reloadInvoices();
    }

    async function reloadInvoices() {
        setAllInvoices(await invoiceModel.getInvoices());
        route.params = false;
    }

    const table = allInvoices.map((invoice, index) => {
        return (
            <DataTable.Row key={index}>
                <DataTable.Cell>{invoice.name}</DataTable.Cell>
                <DataTable.Cell>{invoice.id}</DataTable.Cell>
                <DataTable.Cell>{invoice.order_id}</DataTable.Cell>
            </DataTable.Row>
        );
    });

    return (
        <ScrollView>
            <View style={Base.scroll}>
                <DataTable>
                    <DataTable.Header style={Typography.header2}>
                        <DataTable.Title>Name</DataTable.Title>
                        <DataTable.Title>Id</DataTable.Title>
                        <DataTable.Title>Order</DataTable.Title>
                    </DataTable.Header>
                    {table}
                </DataTable>
                <Button
                    title="Fakturera orders"
                    onPress={() => {
                        navigation.navigate('Fakturera orders', {
                            screen: 'Fakturera orders',
                            params: {reload: true},
                        });
                    }}
                />
                <Button
                    title="Log out"
                    onPress={() => {
                        authModel.logout();
                        navigation.navigate('Lager', {
                            screen: 'Lager',
                            params: {isLoggedIn: false},
                        });
                    }}
                />
            </View>
        </ScrollView>
    );
}
