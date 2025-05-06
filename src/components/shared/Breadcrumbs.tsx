import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <div className="py-16 flex items-center gap-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <Link href={item.url} className={`font-medium "}`}>
            {item.label}
          </Link>
          {index !== items.length - 1 && <span className="text-primary">/</span>}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumbs;
