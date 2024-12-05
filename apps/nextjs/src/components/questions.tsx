import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@saasfly/ui/accordion";

export function Questions() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>About Execubot</AccordionTrigger>
        <AccordionContent>
          Founded by Ram Francis, former Facebook engineer and Department of
          State cloud modernization expert, Execubot was born from real-world
          experience with the challenges of managing technical teams in
          non-tech-first organizations. Our platform aggregates data across
          multiple developer tools and platforms to provide executives with
          clear insights into team performance and productivity.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Why Execubot?</AccordionTrigger>
        <AccordionContent>
          In today's complex development environments, tracking real
          productivity across multiple platforms is challenging. Execubot
          consolidates data from Jira, GitHub, GitLab, AWS, Azure, and GCP to
          provide executives with clear insights into team performance, helping
          identify both top performers and potential issues.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is Execubot right for you?</AccordionTrigger>
        <AccordionContent>
          If you're managing technical teams, especially in non-tech-first
          organizations, and struggling to get clear visibility into actual
          productivity and performance, Execubot is designed for you. Our
          platform helps executives make data-driven decisions about team
          composition and performance, identifying both high performers and
          potential areas of concern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
