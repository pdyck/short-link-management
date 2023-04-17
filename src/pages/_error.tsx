import * as Sentry from "@sentry/nextjs";
import { NextPageContext } from "next";
import NextErrorComponent, { ErrorProps } from "next/error";

export default function Error({ statusCode }: ErrorProps) {
    return <NextErrorComponent statusCode={statusCode} />;
};

export const getInitialProps = async (context: NextPageContext) => {
    await Sentry.captureUnderscoreErrorException(context);
    return NextErrorComponent.getInitialProps(context)
};
