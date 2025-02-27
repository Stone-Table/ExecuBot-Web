import Link from "next/link";

import { cn } from "@saasfly/ui";

interface BreadcrumbItem {
  title: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={cn("flex items-center text-sm", className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2" itemScope itemType="https://schema.org/BreadcrumbList">
        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <Link 
            href="/" 
            className="text-muted-foreground hover:text-foreground"
            itemProp="item"
          >
            <span itemProp="name">Home</span>
            <meta itemProp="position" content="1" />
          </Link>
        </li>
        {items.map((item, index) => (
          <li 
            key={item.href} 
            className="flex items-center space-x-2"
            itemProp="itemListElement" 
            itemScope 
            itemType="https://schema.org/ListItem"
          >
            <span className="text-muted-foreground">/</span>
            {index === items.length - 1 ? (
              <span className="font-medium text-foreground" itemProp="name">{item.title}</span>
            ) : (
              <Link
                href={item.href}
                className="text-muted-foreground hover:text-foreground"
                itemProp="item"
              >
                <span itemProp="name">{item.title}</span>
              </Link>
            )}
            <meta itemProp="position" content={`${index + 2}`} />
          </li>
        ))}
      </ol>
    </nav>
  );
} 