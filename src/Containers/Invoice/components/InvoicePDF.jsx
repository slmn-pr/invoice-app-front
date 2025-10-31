import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";

// PDF export font
Font.register({
    family: "Vazir",
    src: "/fonts/Vazirmatn-Regular.ttf",
});

// Styles
const styles = StyleSheet.create({
    page: {
        padding: 32,
        fontFamily: "Vazir",
        direction: "rtl",
        fontSize: 11,
        color: "#333",
    },
    header: {
        borderBottom: "2px solid #00c7b7",
        paddingBottom: 8,
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 18,
        color: "#00c7b7",
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 10,
        color: "#777",
    },
    section: {
        marginVertical: 6,
    },
    table: {
        display: "table",
        width: "auto",
        marginTop: 10,
        borderWidth: 1,
        borderColor: "#00c7b7",
        borderRadius: 4,
    },
    row: {
        flexDirection: "row-reverse",
    },
    cellHeader: {
        backgroundColor: "#00c7b7",
        color: "#fff",
        padding: 6,
        textAlign: "center",
        flex: 1,
        fontWeight: "bold",
    },
    cell: {
        padding: 6,
        textAlign: "center",
        flex: 1,
        borderBottom: "1px solid #ccc",
    },
    footer: {
        marginTop: 20,
        textAlign: "left",
        fontSize: 10,
        color: "#777",
    },
    total: {
        textAlign: "right",
        fontSize: 14,
        marginTop: 10,
        color: "#00c7b7",
        fontWeight: "bold",
    },
});

const InvoicePDF = ({ invoice }) => {
    const total = invoice.items.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice * (1 + item.taxRate / 100),
        0
    );

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>فاکتور فروش</Text>
                        <Text style={styles.subtitle}>سیستم مدیریت فاکتور (نسخه تستی)</Text>
                    </View>
                    <View>
                        <Text>شماره فاکتور: {invoice.invoiceNumber}</Text>
                        <Text>تاریخ صدور: {invoice.issueDate}</Text>
                        <Text>تاریخ سررسید: {invoice.dueDate}</Text>
                    </View>
                </View>

                {/* Customer info */}
                <View style={styles.section}>
                    <Text>شناسه مشتری: {invoice.customerId}</Text>
                    <Text>
                        وضعیت فاکتور:{" "}
                        {invoice.status === "پرداخت شده" ? "✅ پرداخت شده" : invoice.status}
                    </Text>
                </View>

                {/* Table */}
                <View style={styles.table}>
                    <View style={styles.row}>
                        <Text style={styles.cellHeader}>شرح</Text>
                        <Text style={styles.cellHeader}>تعداد</Text>
                        <Text style={styles.cellHeader}>قیمت واحد (تومان)</Text>
                        <Text style={styles.cellHeader}>مالیات (%)</Text>
                        <Text style={styles.cellHeader}>جمع (تومان)</Text>
                    </View>

                    {invoice.items.map((item, index) => (
                        <View style={styles.row} key={index}>
                            <Text style={styles.cell}>{item.description}</Text>
                            <Text style={styles.cell}>{item.quantity}</Text>
                            <Text style={styles.cell}>
                                {item.unitPrice.toLocaleString("fa-IR")}
                            </Text>
                            <Text style={styles.cell}>{item.taxRate}</Text>
                            <Text style={styles.cell}>
                                {(
                                    item.quantity * item.unitPrice * (1 + item.taxRate / 100)
                                ).toLocaleString("fa-IR")}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Total */}
                <Text style={styles.total}>
                    جمع کل: {total.toLocaleString("fa-IR")} تومان
                </Text>

                {/* Footer */}
                <Text style={styles.footer}>امضا و مهر فروشنده</Text>
            </Page>
        </Document>
    );
};

export default InvoicePDF;
