import Breadcrumb from '../../../componentes/Breadcrumbs';

export const Heading = () => {
  return (
    <div className="border-b border-gray-300 pb-5 sm:flex items-center justify-between">
      <Breadcrumb items={[{ name: 'Users', path: null }]} />
    </div>
  );
};
