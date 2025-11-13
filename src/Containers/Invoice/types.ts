interface InvoiceItem {
  id: string;
  items: Array<InvoiceItem>;
  dueDate: "2025-11-08";
  issueDate: "2025-11-07";
  status: "پیش‌نویس";
  createdAt: "2025-11-07T07:42:48.549Z";
  owner: {
    id: "0c5d65bb-7923-4601-a1fa-ebe3e0ce6578";
    email: "salman@gmail.com";
    firstName: "Salman";
    lastName: "Soleimanpour";
  };
  customer: {
    id: "ee05ff3b-5563-4ed4-ba10-fc307e632385";
    email: "ahmadi@gmail.com";
    name: "ahmad ahmadi co";
    phone: "+989121234556";
  };
}

interface InvoiceItem {
  taxRate: number;
  quantity: 1;
  unitPrice: 3;
  description: "A";
}
