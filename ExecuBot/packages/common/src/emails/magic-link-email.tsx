import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

import * as Icons from "@Saasfly/ui/icons";

interface MagicLinkEmailProps {
  actionUrl: string;
  firstName: string;
  mailType: "login" | "register";
  siteName: string;
}

export const MagicLinkEmail = ({
  firstName = "",
  actionUrl,
  mailType,
  siteName,
}: MagicLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>
      {mailType === "login" ? "Access your" : "Welcome to"} Saasfly Executive Dashboard
    </Preview>
    <Tailwind>
      <Body className="bg-white font-sans">
        <Container className="mx-auto py-5 pb-12">
          <Icons.Logo className="m-auto block h-10 w-10" />
          <Text className="text-base">Hello {firstName},</Text>
          <Text className="text-base">
            {mailType === "login" 
              ? "Access your Saasfly executive dashboard to view your latest team performance metrics." 
              : "Welcome to Saasfly! We're excited to help you gain deeper insights into your engineering team's performance."}
          </Text>
          <Section className="my-5 text-center">
            <Button
              className="inline-block rounded-md bg-blue-600 px-4 py-2 text-base text-white no-underline"
              href={actionUrl}
            >
              {mailType === "login" ? "Access Dashboard" : "Activate Account"}
            </Button>
          </Section>
          <Text className="text-base">
            This secure link expires in 24 hours and can only be used once.
          </Text>
          <Hr className="my-4 border-t-2 border-gray-300" />
          <Text className="text-sm text-gray-600">
            Saasfly - AI-Powered Executive Intelligence
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default MagicLinkEmail;
