import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import InvoiceSvg from "../../../../../assets/Invoice";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../../../utils/Interceptor";
import { getDateFromUnix } from "../../../../../utils/dateUtils";
import { planLabel } from "../../../../../utils";
import { PaymentHistoryEmpty } from "../../../../../components/common/Images";
import Cross from "../../../../../assets/Cross";

const TABLE_HEAD = ["Date", "Plan", "Billing period", "Amount", "Document"];

const PaymentHistoryTable = () => {
  const [payments, setPayments] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPayments = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/user/payments");
      // console.log(res.data);
      setPayments(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const redirectToStripeInvoice = (url) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    getPayments();
  }, []);

  if (loading) return <>Loading..</>;

  return (
    <Card className="h-full w-full ">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Payments History
            </Typography>
            <Typography color="gray" className="my-1 font-normal">
              See information about all your payments
            </Typography>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-auto p-0 max-h-[500px]">
        {payments && payments?.length > 0 ? (
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead className="sticky top-0 z-10 bg-white">
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="mt-12">
              {payments &&
                payments?.map(({ lines, hosted_invoice_url }, index) => {
                  const isLast = index === payments?.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  if (lines.data.length > 0) {
                    const { price, amount, currency, period } = lines.data[0];
                    const { start, end } = period;
                    const { lookup_key } = price;
                    return (
                      <tr key={index}>
                        <td className={classes}>{getDateFromUnix(start)}</td>
                        <td className={classes}>{planLabel[lookup_key]}</td>
                        <td className={classes}>
                          {getDateFromUnix(start)} -{getDateFromUnix(end)}
                        </td>
                        <td className={classes}>
                          {amount / 100} {currency}
                        </td>
                        {hosted_invoice_url && (
                          <td className={classes}>
                            <Tooltip content="Invoice">
                              <IconButton
                                onClick={() =>
                                  redirectToStripeInvoice(hosted_invoice_url)
                                }
                                variant="text"
                              >
                                <InvoiceSvg width={20} height={20} />
                              </IconButton>
                            </Tooltip>
                          </td>
                        )}
                      </tr>
                    );
                  }
                })}
              {/* {payments &&
                payments?.map(({ lines, hosted_invoice_url }, index) => {
                  const isLast = index === payments?.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  if (lines.data.length > 0) {
                    const { price, amount, currency, period } = lines.data[0];
                    const { start, end } = period;
                    const { lookup_key } = price;
                    return (
                      <tr key={index}>
                        <td className={classes}>{getDateFromUnix(start)}</td>
                        <td className={classes}>{planLabel[lookup_key]}</td>
                        <td className={classes}>
                          {getDateFromUnix(start)} -{getDateFromUnix(end)}
                        </td>
                        <td className={classes}>
                          {amount / 100} {currency}
                        </td>
                        {hosted_invoice_url && (
                          <td className={classes}>
                            <Tooltip content="Invoice">
                              <IconButton
                                onClick={() =>
                                  redirectToStripeInvoice(hosted_invoice_url)
                                }
                                variant="text"
                              >
                                <InvoiceSvg width={20} height={20} />
                              </IconButton>
                            </Tooltip>
                          </td>
                        )}
                      </tr>
                    );
                  }
                })} */}
            </tbody>
          </table>
        ) : payments?.length === 0 ? (
          <div className="p-8 mb-4 flex justify-center">
            <div
              className="flex gap-4 justify-center items-center"
              style={{ maxWidth: 600 }}
            >
              <img alt src={PaymentHistoryEmpty} />
              <div>
                <p className="text-muted mb-1">
                  There is no payment in your history yet.
                </p>
                <p className="text-muted mb-0">
                  You will be able to check your invoices here.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 mb-4 flex justify-center">
            <div
              className="flex gap-4 justify-center items-center"
              style={{ maxWidth: 600 }}
            >
              <Cross width={100} height={100} fill="red" />
              <div>
                <p className="text-muted mb-1">
                  There is some error fetching your payment history.
                </p>
                <p className="text-muted mb-0">We are working on the fix.</p>
              </div>
            </div>
          </div>
        )}
      </CardBody>
      {/* {payments && payments.length > 0 && (
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      )} */}
    </Card>
  );
};

export default PaymentHistoryTable;
