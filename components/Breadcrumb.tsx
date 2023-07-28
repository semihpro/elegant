import React from 'react';
interface BreadcrumbItem {
  text: string;
  link?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div aria-label="breadcrumb">
      <ol className="breadcrumb">
        {items.map((item, index) => (
          <li key={index} className={`breadcrumb-item${index === items.length - 1 ? ' active' : ''}`}>
            {index === items.length - 1 ? (
              <span>{item.text}</span>
            ) : (
              <a href={item.link}>{item.text}</a>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Breadcrumb;